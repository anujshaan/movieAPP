import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import { IMovie } from '../typescript';
import { baseUrl } from './../constants/movie';
import { FaPlay } from 'react-icons/fa'
import { InformationCircleIcon } from '@heroicons/react/solid';

interface Props {
    netflixOriginals: IMovie[]
}

const Banner = ({ netflixOriginals }: Props) => {
    const [randomMovies, setRandomMovies] = useState<IMovie | null>(null);

    useEffect(() => {
        setRandomMovies(
            netflixOriginals[Math.floor(Math.random() * netflixOriginals.length)]
        )
    }, [netflixOriginals])

    return (
        <div className='flex flex-col space-y-2 py-16 md:space-y-4 lg:h-[65vh] lg:justify-end 
            lg:pb-12'>
            <div className='absolute top-0 left-0 w-screen h-[95vh] -z-10'>
                <Image
                    src={`${baseUrl}${randomMovies?.backdrop_path || randomMovies?.poster_path}`}
                    layout='fill'
                    objectFit='cover'
                />
            </div>
            <h1 className='text-2xl lg:text-7xl md:text-4xl  font-bold'>
                {randomMovies?.title || randomMovies?.name || randomMovies?.original_name}</h1>
            <p className='max-w-xs text-xs md:max-w-lg md:text-lg lg:max-w-2xl lg:text-2xl
                text-shadow-md'>
                {randomMovies?.overview}
            </p>

            <div className='flex space-x-4'>
                <button className='banner-button bg-white text-black'>
                    <FaPlay className='h-4 w-4 text-black md:h-6 md:w-6' />
                    Play
                </button>
                <button className='banner-button bg-[gray]/70'>
                    More Info
                    <InformationCircleIcon className='h-5 w-5 md:h-8 md:w-8' />
                </button>
            </div>
        </div>
    )
}

export default Banner