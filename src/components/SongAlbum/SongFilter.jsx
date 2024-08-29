import React from 'react';

const SongFilter = ({ isTopTrack, setIsTopTrack, searchValue, onSearchChange }) => (
    <div className='relative'>
        <div className='flex gap-[40px] mb-[32px]'>
            <h2
                onClick={() => setIsTopTrack(false)}
                className={`font-inter font-bold cursor-pointer text-2xl leading-[24px] ${!isTopTrack ? 'text-white' : 'text-[#A29F9A]'}`}
            >
                For You
            </h2>
            <h2
                onClick={() => setIsTopTrack(true)}
                className={`font-inter font-bold cursor-pointer text-2xl leading-[24px] ${isTopTrack ? 'text-white' : 'text-[#A29F9A]'}`}
            >
                Top Tracks
            </h2>
        </div>
        <div className='relative'>
            <input
                type='text'
                value={searchValue}
                onChange={onSearchChange}
                placeholder='Search Song, Artist'
                className='placeholder:text-[#A29F9A] w-full rounded-lg h-[48px] p-[8px_16px] bg-[rgba(255,255,255,0.08)] text-white font-inter text-lg leading-[24px] outline-none'
            />
            <img src="images/search.svg" className='min-h-[19px] min-w-[19px] absolute top-[7px] right-[1rem]' alt='search icon' />
        </div>
    </div>
);

export default SongFilter;
