import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"
import React from 'react'

export default function CarouselApp() {
    return (
        <Carousel className="px-4">
            <CarouselContent className=" lg:mx-4 rounded-lg">
                <CarouselItem className=" bg-black border border-zinc-400 text-white lg:basis-1/3 basis-1/2 lg:mx-8 mx-2 p-4 text-lg rounded-lg">
                    <div className="p-4 flex flex-col justify-between">
                        <p className="text-lg font-sans">This is first message!!!!!!</p>
                        <button className="p-4 mt-20 rounded border border-zinc-700 text-black font-sans lg:text-lg"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-send"><path d="M14.536 21.686a.5.5 0 0 0 .937-.024l6.5-19a.496.496 0 0 0-.635-.635l-19 6.5a.5.5 0 0 0-.024.937l7.93 3.18a2 2 0 0 1 1.112 1.11z"/><path d="m21.854 2.147-10.94 10.939"/></svg></button>
                    </div>
                </CarouselItem>
                <CarouselItem className=" bg-black border border-zinc-400 text-white lg:basis-1/3 basis-1/2 lg:mx-8 mx-2 p-4 text-lg rounded-lg">
                    <div className="p-4 flex flex-col justify-between">
                        <p className="text-lg font-sans">This is first message!!!!!!</p>
                        <button className="p-4 mt-20 rounded border border-zinc-700 text-black font-sans lg:text-lg"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-send"><path d="M14.536 21.686a.5.5 0 0 0 .937-.024l6.5-19a.496.496 0 0 0-.635-.635l-19 6.5a.5.5 0 0 0-.024.937l7.93 3.18a2 2 0 0 1 1.112 1.11z"/><path d="m21.854 2.147-10.94 10.939"/></svg></button>
                    </div>
                </CarouselItem>
                <CarouselItem className=" bg-black border border-zinc-400 text-white lg:basis-1/3 basis-1/2 lg:mx-8 mx-2 p-4 text-lg rounded-lg">
                    <div className="p-4 flex flex-col justify-between">
                        <p className="text-lg font-sans">This is first message!!!!!!</p>
                        <button className="p-4 mt-20 rounded border border-zinc-700 text-black font-sans lg:text-lg"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-send"><path d="M14.536 21.686a.5.5 0 0 0 .937-.024l6.5-19a.496.496 0 0 0-.635-.635l-19 6.5a.5.5 0 0 0-.024.937l7.93 3.18a2 2 0 0 1 1.112 1.11z"/><path d="m21.854 2.147-10.94 10.939"/></svg></button>
                    </div>
                </CarouselItem>
            </CarouselContent>
            <CarouselPrevious className="bg-white" />
            <CarouselNext className="bg-white" />
        </Carousel>
    )
}
