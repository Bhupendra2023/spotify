import React from 'react';
import SongItem from './SongItem';

const SongList = ({ songs, currentSong, onSongSelect, isModalView = false }) => (
    <div className={` ${isModalView ? 'block' : 'hidden md:block'} w-full`}>
        <ul className='p-0 mt-[2rem] flex flex-col gap-2'>
            {songs.map((song, index) => (
                <SongItem
                    key={song.id}
                    song={song}
                    isSelected={song.accent === currentSong.song.accent}
                    onClick={() => onSongSelect(song, index)}
                />
            ))}
        </ul>
    </div>
);

export default SongList;
