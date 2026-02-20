"use client";
import React from "react";
import { motion } from "framer-motion";
import ComponentHeader from "../Reuseable/Header";
import Link from "next/link";
import WorksCard from "../shared/WorksCard";
import Container from "../shared/Container";

type Video = {
  id: number;
  sport: string;
  title: string;
  thumbnail: string;
  videoUrl: string;
};

const videos: Video[] = [
  {
    id: 1,
    sport: "Football",
    title: "High School Football Highlights",
    thumbnail: "/videos/thumb1.jpg",
    videoUrl: "https://www.youtube.com/embed/O__cpWn2mPY",
  },
  {
    id: 2,
    sport: "Basketball",
    title: "College Basketball Highlights",
    thumbnail: "/videos/thumb2.jpg",
    videoUrl: "https://www.youtube.com/embed/4OcFQBwh1N8",
  },
  {
    id: 3,
    sport: "Baseball",
    title: "Lacrosse Highlight Video",
    thumbnail: "/videos/thumb4.jpg",
    videoUrl: "https://www.youtube.com/embed/I9c9Qu4sCtE",
  },
  {
    id: 4,
    sport: "Soccer",
    title: "Elite Soccer Recruiting Tape",
    thumbnail: "/videos/thumb1.jpg",
    videoUrl: "https://www.youtube.com/embed/O__cpWn2mPY",
  },
  {
    id: 5,
    sport: "Tennis",
    title: "Top Tennis Match Highlights",
    thumbnail: "/videos/thumb2.jpg",
    videoUrl: "https://www.youtube.com/embed/4OcFQBwh1N8",
  },
  {
    id: 6,
    sport: "Cricket",
    title: "Cricket Performance Compilation",
    thumbnail: "/videos/thumb4.jpg",
    videoUrl: "https://www.youtube.com/embed/I9c9Qu4sCtE",
  },
  {
    id: 7,
    sport: "Featured",
    title: "Ultimate Sports Recruiting Showreel",
    thumbnail: "/videos/thumb1.jpg",
    videoUrl: "https://www.youtube.com/embed/O__cpWn2mPY",
  },
];

export default function OurWorks() {
  const featured = videos[videos.length - 1];
  const smallVideos = videos.slice(0, 6);

  return (
    <Container className="mx-auto my-20">
      <section className="w-full text-white">
        <ComponentHeader title="Works Gallery" />

        <div className="grid lg:grid-cols-5 gap-10 mt-14">
          
          {/* LEFT SIDE - 2/3 WIDTH */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={{
              hidden: {},
              visible: {
                transition: {
                  staggerChildren: 0.1,
                },
              },
            }}
            className="lg:col-span-3  space-y-3"
          >
            {smallVideos.slice(0, 3).map((video) => (
              <motion.div
                key={video.id}
                variants={{
                  hidden: { opacity: 0, y: 40 },
                  visible: { opacity: 1, y: 0 },
                }}
                transition={{ duration: 0.5 }}
                className="rounded-xl overflow-hidden hover:bg-primary/10 transition-all duration-300 hover:scale-101"
              >
                <WorksCard video={video}  />
              </motion.div>
            ))}
          </motion.div>

          {/* RIGHT SIDE - FEATURED CARD */}
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="flex flex-col col-span-2 justify-between"
          >
            <div className="rounded-2xl overflow-hidden shadow-2xl hover:scale-[1.02] transition duration-500">
              <WorksCard video={featured} large/>
            </div>

            {/* View All Button */}
            <div className="mt-8 flex justify-center">
              <Link
                target="_blank"
                href="https://www.youtube.com/@PlayPickerltd/playlists"
                className="px-8 py-3 border border-black text-black cursor-pointer hover:text-white hover:border-primary transition font-medium hover:bg-primary rounded-full"
              >
                View All Works
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </Container>
  );
}