import React from 'react';

const SongItem = ({ song, onClick, isSelected, delay }) => (
    <li
        className={`cursor-pointer  p-0 rounded-lg opacity-0 transition-all 
        duration-200 ease-in-out hover:bg-[rgba(255,255,255,0.04)] ${isSelected ? 'bg-[rgba(255,255,255,0.08)]' : ''} animate-staggered-slide-in`}
        onClick={onClick}
        style={{ animationDelay: `${delay}ms` }}  
    >
        <div className='p-[16px] gap-[16px] flex items-center justify-between'>
            <div className='gap-[16px] flex items-center'>
                <img alt={song.cover} className='h-[48px] w-[48px] rounded-full' src={`https://cms.samespace.com/assets/${song.cover}`} />
                <div>
                    <h3 className='font-inter text-lg leading-[24px] text-white'>{song?.name}</h3>
                    <h4 className='font-inter text-sm leading-[24px] text-[#A29F9A]'>{song.artist}</h4>
                </div>
            </div>
            <p className='font-inter text-lg leading-[24px] text-[#A29F9A]'>{song.duration}</p>
        </div>
    </li>
);

export default SongItem;
