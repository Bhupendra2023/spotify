import React, { useState, useEffect, useCallback, useMemo } from 'react';
import MusicPlayer from './MusicPlayer';
import Modal from '../Modal';
import SongFilter from './SongFilter';
import SongList from './SongList';

const SongAlbum = () => {
    const [songs, setSongs] = useState([]);
    const [isTopTrack, setIsTopTrack] = useState(false);
    const [currentSong, setCurrentSong] = useState({ song: {}, index: 0, willPlay: false });
    const [searchValue, setSearchValue] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);

    const getSongDuration = useCallback((songUrl) => {
        return new Promise((resolve, reject) => {
            const audio = new Audio(songUrl);

            audio.addEventListener('loadedmetadata', () => {
                const minutes = Math.floor(audio.duration / 60);
                const seconds = Math.floor(audio.duration % 60).toString().padStart(2, '0');
                resolve(`${minutes}:${seconds}`);
            });

            audio.addEventListener('error', () => {
                reject('Error loading audio file');
            });
        });
    }, []);

    useEffect(() => {
        const fetchSongs = async () => {
            try {
                const response = await fetch('https://cms.samespace.com/items/songs');
                if (!response.ok) {
                    throw new Error('Network response was not ok ' + response.statusText);
                }
                const data = await response.json();

                const songsWithDuration = await Promise.all(
                    data?.data?.map(async (song) => {
                        const duration = await getSongDuration(song.url);
                        return { ...song, duration };
                    })
                );

                setSongs(songsWithDuration);
                setCurrentSong({ song: songsWithDuration[0], index: 0 });
            } catch (error) {
                console.error('Error fetching songs:', error);
            }
        };

        fetchSongs();
    }, [getSongDuration]);

    const filteredSongs = useMemo(() => {
        return songs.filter((song) =>
            (!isTopTrack || song.top_track) &&
            (song.name.toLowerCase().includes(searchValue) || song.artist.toLowerCase().includes(searchValue))
        );
    }, [isTopTrack, searchValue, songs]);

    const handleSearchChange = useCallback((e) => {
        setSearchValue(e.target.value.toLowerCase());
    }, []);

    const handleMusicSelection = useCallback((song, index) => {
        document.body.style.background = `linear-gradient(to right, ${song.accent}, #000000)`;
        setCurrentSong({ song, index, willPlay: true });
        setIsModalOpen(false);
    }, []);

    const handleBackward = useCallback(() => {
        const newIndex = currentSong.index > 0 ? currentSong.index - 1 : 0;
        setCurrentSong({ song: filteredSongs[newIndex], index: newIndex, willPlay: true });
    }, [currentSong, filteredSongs]);

    const handleForward = useCallback(() => {
        const newIndex = currentSong.index < filteredSongs.length - 1 ? currentSong.index + 1 : currentSong.index;
        setCurrentSong({ song: filteredSongs[newIndex], index: newIndex, willPlay: true });
    }, [currentSong, filteredSongs]);

    const handleModalToggle = useCallback((isOpen) => {
        setIsModalOpen(isOpen);
    }, []);


    return (
        <div className='w-full lg:w-[90%]'>
            <div className='flex  flex-row gap-[30px] lg:gap-[60px]'>
                <div className={` flex-col flex-[30px] hidden md:flex w-full md:w-[50%]`}>
                    <SongFilter isTopTrack={isTopTrack} setIsTopTrack={setIsTopTrack} searchValue={searchValue} onSearchChange={handleSearchChange} />
                    <SongList songs={filteredSongs} currentSong={currentSong} onSongSelect={handleMusicSelection} />
                </div>
                {currentSong.song?.name &&
                    <MusicPlayer
                        handleForward={handleForward}
                        handleBackward={handleBackward}
                        currentSong={currentSong}
                        setCurrentSong={setCurrentSong}
                        handleModal={handleModalToggle}
                    />}
            </div>

            {isModalOpen && (
                <Modal open={isModalOpen} close={() => handleModalToggle(false)} bgColor={currentSong.song.accent}>
                    <SongList songs={filteredSongs} currentSong={currentSong} onSongSelect={handleMusicSelection} isModalView={true} />
                </Modal>
            )}
        </div>
    );
};

export default SongAlbum;
