'use client'
import Image from "next/image";
import Container from "../shared/Container";
import { motion, useMotionValue, useTransform } from "framer-motion";
import InfoSection from "../Reuseable/InfoSection";

export default function FootballInfo() {
  const x = useMotionValue(-40);

  // Blur increases when text moves
  const blur = useTransform(x, [-40, 0, 40], ["6px", "1px", "6px"]);


  return (
    <Container className="mx-auto">


      <div className="relative">
        <div className="absolute hidden xl:flex inset-y-0 right-0 w-[45%]  pointer-events-none">
          <svg
            className="absolute right-0  top-1/2 -translate-y-1/2 w-[500px] xl:w-[900px]"
            
            height="800"
            viewBox="0 0 900 700"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {[...Array(12)].map((_, i) => (
              <line
                key={i}
                x1="100%"
                y1={i * 70}
                x2="0"
                y2={i * 70 + 120}
                stroke="#F97316"        
                strokeWidth="3"
                strokeOpacity="0.25"
              />
            ))}
          </svg>


        </div>

        <Container>
          <div className="relative z-20">
            <InfoSection
              imageUrl="/football-3.png"
              title="Ready to"
              title2={
                <>
                  Find Your <br /> Perfect Video?
                </>
              }
              description="With tools, we help you find the right video faster and easier. Get matched with top position based on your skills and goals. Take control of your career path today."
              buttonText="Create Your Highlight"
            //  onButtonClick={() => window.location.href = "/packages"}

             
              height={689}
              width={562}
            ></InfoSection>
          </div>
        </Container>
      </div>
    </Container>
  );
}