import Image from "next/image";
import Link from "next/link";
import { BsArrowRight } from "react-icons/bs";
import Container from "../shared/Container";

interface InfoSectionProps {
  imageUrl: string;
  title: string;
  title2: string | React.ReactNode;
  description: string;
  buttonText: string;
  onButtonClick?: () => void;
  className?: string;
  height: number;
  width: number;
}

export default function InfoSection({
  imageUrl,
  className = "",
  title,
  title2,
  description,
  buttonText,
  onButtonClick,
  height,
  width,
}: InfoSectionProps) {
  return (
    <Container>
    <div
      className={`flex flex-col md:flex-row-reverse  text-black items-center  md:px-6 py-12  ${className}`}
    >
      {/* Left - Image */}
      <div className="w-full md:w-2/3 sm:mx-auto  flex justify-start sm:justify-center md:justify-start ">
        <div className="relative">
          <Image
            src={imageUrl}
            alt={title}
            className="w-[200px] md:w-[250px] xl:w-[400px] h-auto rounded-lg  "
            height={height}
            width={width}
          />
          <h1 className="text-5xl font-medium  md:text-7xl xl:text-9xl -z-10 text-primary absolute top-10 xl:top-30 left-42 md:left-55 xl:left-90 -rotate-10">
            Sports <br /> Highlight
          </h1>
          <div className="relative -z-20 perspective-[1000px]">
            <div
              aria-hidden="true"
              className="
    absolute -top-55 -left-5 xl:left- xl:-top-85
      w-80 h-80 xl:w-[500px] xl:h-[500px]
      rounded-full
      border-8 border-red-600
      bg-transparent
      transform
      rotate-x-[70deg]
      rotate-y-[0deg]
    "
            />
          </div>

          <div className="absolute inset-y-0 right-0 w-[45%]  pointer-events-none -z-30 xl:hidden">
            <svg
              className="absolute -right-35 sm:-right-50  top-40 -translate-y-1/2 w-[400px]  xl:w-[900px]"

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

        </div>
      </div>

      {/* Right - Content */}
      <div className="w-full md:w-1/3 space-y-8 md:space-y-12">
        <div className="space-y-4 ">
          <h2 className="text-2xl md:text-3xl xl:text-5xl font-bold leading-tight">
            {title} <span className="text-primary">{title2}</span>
          </h2>

          <p className="text-subtitle md:text-lg text-base ">{description}</p>
        </div>

     
          <Link href="/packages">
            <button
              onClick={onButtonClick}
              className="px-6 py-3 text-white font-semibold rounded bg-secondary flex bg-black cursor-pointer transition-all duration-300 group"
            >
              {buttonText}
              <BsArrowRight className="my-auto ml-2 transition-transform text-xl mt-1 duration-300 group-hover:translate-x-2" />
            </button>
          </Link>
      
      </div>
    </div>
       </Container>
  );
}
