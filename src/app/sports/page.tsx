"use client";
import { useGetAllSportsQuery } from "@/redux/api/sports/sportsApis";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState, useMemo, Suspense } from "react";

type Video = {
  id: number;
  type: string;
  title: string;
  thumbnail: string;
  videoUrl: string;
};

type Sport = {
  _id: string;
  type: string;
  title: string;
  thumbnail: string;
  src: string;
};

function SportsPageContent() {
  const [currentVideo, setCurrentVideo] = useState<Video | null>(null);
  const searchParams = useSearchParams();
  const sportParam = searchParams.get("sport");
  const [selectedSport, setSelectedSport] = useState(sportParam || "All");

  const { data: allsports } = useGetAllSportsQuery({});
  console.log(allsports);



  const videos: Video[] = useMemo(
    () =>
      allsports?.data?.map((item: Sport, index: number) => ({
        id: index + 1, // or use item._id if you want string
        type: item.type, // "basketball", "lacrosse"
        title: item.title,
        thumbnail: item.thumbnail,
        videoUrl: item.src, // mp4 or embed url
      })) ?? [],
    [allsports],
  );

  // Extra static types you want to always show
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const staticTypes = ["Highlight", "Recruiting"];

  // Build the dropdown options
  const sports = useMemo(() => {
    const uniqueTypes = Array.from(new Set(videos.map((v) => v.type)));

    const capitalize = (str: string) =>
      str.charAt(0).toUpperCase() + str.slice(1);

    return [
      "All",
      ...uniqueTypes.map(capitalize),
      ...staticTypes.filter((t) => !uniqueTypes.includes(t)).map(capitalize),
    ];
  }, [staticTypes, videos]);

 const filteredVideos =
  !sportParam || sportParam.toLowerCase() === "all"
    ? videos
    : videos.filter(v => v.type.toLowerCase() === sportParam.toLowerCase());

  useEffect(() => {
    if (videos.length && !currentVideo) {
      setCurrentVideo(videos[0]);
    }
    if (sportParam) {
      const capitalizedSport = sportParam.charAt(0).toUpperCase() + sportParam.slice(1);
      setSelectedSport(capitalizedSport);
    }
  }, [videos, currentVideo, sportParam]);

  return (
    <div className="w-full min-h-screen text-black">
      {/* Main Video Section */}
      <div className="max-w-7xl mx-auto px-4 py-10 flex flex-col lg:flex-row gap-8">
        {/* Left Side - Playing Video */}
        <div className="flex-1">
          <div className="aspect-video rounded-xl overflow-hidden shadow-lg">
            <iframe
              src={currentVideo?.videoUrl}
              title={currentVideo?.title}
              allowFullScreen
              className="w-full h-full object-cover"
            />
          </div>
          <h2 className="text-2xl font-semibold  mt-4">
            {currentVideo?.title}
          </h2>
          <p className=" mt-1">{currentVideo?.type}</p>
        </div>

        {/* Right Side - Suggested Videos */}
        <div className="w-full lg:w-80 flex flex-col bg-gray-100 p-2 rounded-lg">
          {/* Filter Dropdown */}
          <div className="mb-4">
            <select
              value={selectedSport}
              onChange={(e) => setSelectedSport(e.target.value)}
              className="w-full border border-gray-300 rounded-lg p-2  focus:ring-2 focus:ring-blue-500"
            >
              {sports.map((sport) => (
                <option key={sport} value={sport}>
                  {sport}
                </option>
              ))}
            </select>
          </div>

          {/* Suggested Video List */}
          {filteredVideos.length>0 ?<div className="space-y-3 overflow-y-auto max-h-[70vh]">
            {filteredVideos.map((video) => (
              <div
                key={video.id}
                onClick={() => setCurrentVideo(video)}
                className={`flex gap-3 items-center p-2 rounded-lg cursor-pointer transition ${
                  currentVideo?.id === video.id
                    ? "bg-blue-100"
                    : "hover:bg-gray-100"
                }`}
              >
                <Image
                  src={"https://images.pexels.com/photos/1618200/pexels-photo-1618200.jpeg?w-200" }
                  // || video.thumbnail
                  alt={video.title}
                  height={700}
                  width={700}
                  className="w-24 h-16 rounded-lg object-cover"
                />

                <div className="flex-1">
                  <h4 className="text-sm font-medium  line-clamp-2">
                    {video.title}
                  </h4>
                  <p className="text-xs ">{video.type}</p>
                </div>
              </div>
            ))}
          </div>:
          <div className="text-center my- bg-white p-4">
            No video found
          </div> }
          
        </div>
      </div>

      {/* Bottom Section - Similar Works */}
      <div className="mt-12 border-t border-gray-200">
        <section className="max-w-7xl mx-auto px-4 py-10">
          <h3 className="text-3xl font-bold  mb-8">
            Similar Works You May Like
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {videos.slice(0, 3).map((video) => (
              <div
                key={video.id}
                onClick={() => setCurrentVideo(video)}
                className="bg-white rounded-2xl shadow hover:shadow-lg transition overflow-hidden cursor-pointer"
              >
                <div className="aspect-video">
                  <iframe
                    src={video.videoUrl}
                    title={video.title}
                    allowFullScreen
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-4">
                  <h4 className="text-lg font-semibold ">{video.title}</h4>
                  <p className="text-sm  mt-1">{video.type}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SportsPageContent />
    </Suspense>
  );
}
