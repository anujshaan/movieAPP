import React, { useState, useRef } from 'react'
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/outline'
import { IMovie } from '../typescript'
import Thumbnail from './Thumbnail'

interface Props {
    title: string
    movies: IMovie[]
}

const Row = ({ title, movies }: Props) => {

    const rowRef = useRef<HTMLDivElement>(null);
    const [isMoved, setIsMoved] = useState(false);

    const handleClick = (direction: string) => {
        setIsMoved(true);
        console.log(rowRef.current)
        if (rowRef.current) {
            const { scrollLeft, clientWidth } = rowRef.current;

            const scrollTo = direction === 'left'
                ? scrollLeft - clientWidth
                : scrollLeft + 270

            rowRef.current.scrollTo({ left: scrollTo, behavior: 'smooth' })
        }
        if (rowRef.current?.scrollLeft === 0)
            setIsMoved(false)
    }

    return (
        <div className='h-40 space-y-0.5 md:space-y-2'>
            <h2 className='w-56 cursor-pointer text-sm font-semibold text-[#e5e5e5] 
                transition duration-200 hover:text-white md:text-2xl'>{title}</h2>
            <div className='group relative md:-ml-2 '>
                <ChevronLeftIcon className={`row-navigation left-2 ${!isMoved && "hidden"} `}
                    onClick={() => handleClick('left')} />

                <div ref={rowRef} className='flex items-center space-x-0.5 overflow-x-scroll
                    md:space-x-2.5 md:p-2 scrollbar-hide'>
                    {movies.map((movie) => (
                        <Thumbnail key={movie.id} movie={movie} />
                    ))}
                </div>

                <ChevronRightIcon className='row-navigation right-2'
                    onClick={() => handleClick('right')} />
            </div>
        </div>
    )
}

export default Row