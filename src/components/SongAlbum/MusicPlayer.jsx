import React, { useState, useRef, useEffect } from 'react';

const MusicPlayer = ({ setCurrentSong, currentSong, handleModal, handleBackward, handleForward }) => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [volume, setVolume] = useState(1);

    const audioRef = useRef(null);
    const seekRef = useRef(null);

    useEffect(() => {
        if (currentSong?.willPlay) {
            audioRef.current.play();
            setIsPlaying(true);
            setCurrentSong({ ...currentSong, willPlay: false });
            document.body.style.background = `linear-gradient(to right, ${currentSong.song.accent}, #000000)`;
        }
    }, [currentSong, setCurrentSong]);

    const handlePlayPause = () => {
        if (isPlaying) {
            audioRef.current.pause();
        } else {
            audioRef.current.play();
        }
        setIsPlaying(!isPlaying);
    };

    const handleTimeUpdate = () => {
        setCurrentTime(audioRef.current.currentTime);
        if (audioRef.current.currentTime === duration)
            setIsPlaying(false)
    };

    const handleSeek = (e) => {
        audioRef.current.currentTime = e.target.value;
        setCurrentTime(e.target.value);
    };

    const handleLoadedMetadata = () => {
        setDuration(audioRef.current.duration);
    };

    const handleMuteToggle = () => {
        const newVolume = volume === 0 ? 1 : 0;
        audioRef.current.volume = newVolume;
        setVolume(newVolume);
    };

    const formatTime = (time) => {
        if (isNaN(time)) return '0:00';
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60).toString().padStart(2, '0');
        return `${minutes}:${seconds}`;
    };

    const currentPercentage = (currentTime / duration) * 100;

    return (
        <div className="w-full block md:w-[50%] mt-[2rem] md:mt-[2rem] lg:mt-[3.6rem]  lg:mr-[50px] xl:mr-[80px]">
            <h2 className="text-white text-left font-bold font-inter  text-2xl md:text-[32px] leading-[36px]">
                {currentSong.song?.name}
            </h2>
            <h3 className="font-inter text-left text-sm md:text-base lg:mt-2 leading-[24px] text-[#A29F9A]">
                {currentSong.song?.artist}
            </h3>
            <div className="mt-4 lg:mt-8 w-full">
                <div className="sm:flex-col sm:flex sm:items-center sm:justify-center">
                    <img
                        alt={currentSong.song.cover}
                        className="h-[300px] md:h-[400px] xl:h-[400px] w-full mb-[24px] rounded-[8px]"
                        src={`https://cms.samespace.com/assets/${currentSong.song.cover}`}
                    />
                    <audio
                        ref={audioRef}
                        src={currentSong.song.url}
                        onTimeUpdate={handleTimeUpdate}
                        onLoadedMetadata={handleLoadedMetadata}
                    />

                    <input
                        type="range"
                        ref={seekRef}
                        className="w-full h-2 bg-[rgba(255,255,255,0.08)] rounded-lg cursor-pointer appearance-none mb-4"
                        min={0}
                        max={duration}
                        value={currentTime}
                        onChange={handleSeek}
                        style={{
                            background: `linear-gradient(to right, #fff ${currentPercentage}%, rgba(255, 255, 255 ,0.08) 0%)`,
                        }}
                    />

                    <div className="flex justify-between w-full text-base text-white">
                        <span>{formatTime(currentTime)}</span>
                        <span>{formatTime(duration)}</span>
                    </div>
                </div>
                <div className="mt-6 flex items-center justify-between">
                    <button
                        onClick={() => handleModal(true)}
                        className="h-[48px] w-[48px] active:scale-[0.98] visible md:invisible bg-[rgba(255,255,255,10%)] rounded-full flex justify-center items-center"
                    >
                        <img src="/images/setting.svg" alt="settings" />
                    </button>
                    <div className="flex gap-[32px]">
                        <button onClick={handleBackward} className="active:scale-[0.98]">
                            <img src="/images/backward.svg" alt="backward" />
                        </button>
                        <button onClick={handlePlayPause} className="active:scale-[0.98]">
                            <img src={isPlaying ? '/images/pause.svg' : '/images/play.svg'} alt="play/pause" />
                        </button>
                        <button onClick={handleForward} className="active:scale-[0.98]">
                            <img src="/images/forward.svg" alt="forward" />
                        </button>
                    </div>
                    <div className="flex items-center relative group">
                        <button
                            onClick={handleMuteToggle}
                            className="mr-2 bg-transparent text-white active:scale-[0.98]"
                        >
                            <img
                                src={volume === 0 ? '/images/mute_icon.svg' : '/images/audio.svg'}
                                className="w-[20px] h-[16px]"
                                alt="mute/unmute"
                            />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MusicPlayer;
