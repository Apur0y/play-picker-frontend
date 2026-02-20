
import AboutUs from "@/conponents/home/AboutUs";
import ChooseUs from "@/conponents/home/ChooseUs";
import { FAQSection } from "@/conponents/home/FAQSection";
import { TestimonialsSection } from "@/conponents/home/TestimonialsSection";
import FloatingButtons from "@/conponents/shared/FloatingButtons";
import Footer from "@/conponents/shared/Footer";
import OurWorks from "@/conponents/home/OurWorks";
import Packages from "@/conponents/home/Packages";
import SportsOptions from "@/conponents/shared/SportsOptions";
import ProcessSection from "@/conponents/home/ProcessSection";
import Banner from "@/conponents/home/Banner";
import FootballInfo from "@/conponents/home/Football";
import WhoWeAre from "@/conponents/home/WhoWeAre";
import WhatWeDo from "@/conponents/home/WhatWeDo";


export default function HomePage() {
  return (
    <main>
      
      <Banner />
      <FootballInfo/>
      <WhoWeAre/>
      <WhatWeDo/>
      <OurWorks/>
      <Packages />
     <AboutUs/>
     <ProcessSection/> 
     <FAQSection/>
      <Footer/>
    </main>
  );
}


      {/* <SportsOptions /> */}
      {/* <ChooseUs/> */}
      {/* <FloatingButtons /> */}