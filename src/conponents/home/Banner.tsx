"use client";
import Container from "../shared/Container";
import Button from "../Reuseable/Button";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import Link from "next/link";

const data = [
  { name: "Jan", videos: 12 },
  { name: "Feb", videos: 18 },
  { name: "Mar", videos: 25 },
  { name: "Apr", videos: 20 },
  { name: "May", videos: 30 },
];

export default function Banner() {
  return (
    <section
      className="relative w-full min-h-[calc(100vh-50vh)] md:min-h-[calc(100vh-100px)] bg-cover bg-center flex flex-col justify-between"
      style={{
        backgroundImage:
          "url('https://cdn.pixabay.com/photo/2021/10/07/08/59/basketball-6687953_1280.jpg')",
      }}
      // style={{
      //   backgroundImage:
      //     "url('/banner1.png')",
      //https://static.wixstatic.com/media/ed3c46_ea68a5d166eb4c1abb4ab49ea28252ce~mv2.png
      // }}
    >
      <div className="absolute inset-0  bg-linear-to-r  from-gray-700/80 via-gray-700/20 to-transparent"></div>
      {/* Top Content */}
      <Container className="flex flex-1 justify-start w-full mx-auto z-10 relative">
        <div className=" flex-1 flex justify-start items-center">
          <div className="  px-6 text-white ">
            <h1 className="text-2xl md:text-5xl font-bold mb-4">
              Edit Sports Videos Like a Pro
            </h1>

            <p className="text-sm md:text-lg text-gray-200 mb-6">
              Create stunning sports edits with professional effects, smooth
              transitions, and cinematic visuals.
            </p>

            <div className="flex gap-4">
              <Button size="md">
                <Link href="/packages"> Get Started</Link>
               </Button>
              {/* <Button variant="secondary" size="md">
                Learn More
              </Button> */}
            </div>
          </div>
        </div>

        {/* <div className="border-2 border-gray-100/10 rounded-2xl shadow-2xl backdrop-blur-xs m-6 w-1/3 hidden md:flex p-4">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data}>
          
              <defs>
                <linearGradient id="glassGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="rgba(255,255,255,0.9)" />
                  <stop offset="50%" stopColor="rgba(255,255,255,0.5)" />
                  <stop offset="100%" stopColor="rgba(255,255,255,0.25)" />
                </linearGradient>
              </defs>

              <CartesianGrid stroke="rgba(255,255,255,0.06)" vertical={false} />

              <XAxis
                dataKey="name"
                tick={{ fill: "#e5e7eb", fontSize: 12 }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                tick={{ fill: "#e5e7eb", fontSize: 12 }}
                axisLine={false}
                tickLine={false}
              />

              <Tooltip
                cursor={{ fill: "rgba(255,255,255,0.04)" }}
                contentStyle={{
                  backgroundColor: "rgba(255,255,255,0.15)",
                  backdropFilter: "blur(8px)",
                  border: "1px solid rgba(255,255,255,0.2)",
                  borderRadius: "12px",
                  color: "#fff",
                }}
              />

              <Bar
                dataKey="videos"
                fill="url(#glassGradient)"
                radius={[10, 10, 4, 4]}
                activeBar={{
                  fill: "rgba(255,255,255,0.9)",
                }}
              />
            </BarChart>
          </ResponsiveContainer>
        </div> */}
      </Container>

      {/* Bottom Auto-Scroll Stats */}
      <div className=" overflow-hidden pb-8">
        <div
          className={`flex w-max whitespace-nowrap text-white text-sm md:text-xl font-semibold cursor-pointer animate-marquee`}
        >
          {/* First set */}
          <span className="mx-8"> 500+ Projects Completed</span>
          <span className="mx-8"> 120+ Happy Clients</span>
          <span className="mx-8"> $250K+ Revenue Generated</span>
          <span className="mx-8"> 5+ Years Experience</span>

          {/* Duplicate set (ONLY once) */}
          <span className="mx-8"> 500+ Projects Completed</span>
          <span className="mx-8"> 120+ Happy Clients</span>
          <span className="mx-8"> $250K+ Revenue Generated</span>
          <span className="mx-8"> 5+ Years Experience</span>
          <span className="mx-8"> 500+ Projects Completed</span>
          <span className="mx-8"> 120+ Happy Clients</span>
          <span className="mx-8"> $250K+ Revenue Generated</span>
          <span className="mx-8"> 5+ Years Experience</span>
          <span className="mx-8"> 500+ Projects Completed</span>
          <span className="mx-8"> 120+ Happy Clients</span>
          <span className="mx-8"> $250K+ Revenue Generated</span>
          <span className="mx-8"> 5+ Years Experience</span>
        </div>
      </div>
    </section>
  );
}
