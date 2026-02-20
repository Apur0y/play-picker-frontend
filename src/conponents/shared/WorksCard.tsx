import React, { useState } from 'react';
import intro from "../../../public/Intro2.jpg"
import Image from 'next/image';

type Video = {
  id: number;
  sport: string;
  title: string;
  thumbnail: string; // Your custom thumbnail URL
  videoUrl: string;
};

interface MainVideo {
  video: Video;
  large?:boolean;
}


export default function WorksCard({ video,large }: MainVideo) {
  const [play, setPlay] = useState(true);


  return (
    <div className={`${large?"":"flex"} text-neutral-600 border border-neutral-200 hover:shadow-lg transition overflow-hidden h-full cursor-pointer duration-300`}>
      
      {/* Video / Thumbnail */}
      <div className="aspect-video relative" onClick={() => setPlay(true)}>
        {!play ? (
          <Image
            src={intro}
            alt={video.title}
            height={500}
            width={500}
            className="w-full h-full object-cover"
          />
        ) : (
          <iframe
            src={video.videoUrl}
            title={video.title}
            allowFullScreen
            className="w-full h-full object-cover"
          />
        )}

        {/* Optional: Play button overlay */}
        {!play && (
          <div className="absolute inset-0 flex items-end justify-start ">
            <div className="text-red-500 p-4 m- rounded-full text-2xl font-bold  ">
              ▶
            </div>
          </div>
        )}
      </div>

      {/* Video info */}
      <div className="p-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-semibold text-md">{video.title}</h3>
            <p className="text-sm">{video.sport}</p>
          </div>
        </div>

        <p className="py-5 text-sm">
          This is the sports if you are looking for, check out the sample and reach out to us to contact. Match this quality and get your stand out video.
        </p>

       
      </div>
    </div>
  );
}
