"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  FiTarget,
  FiVideo,
  FiUsers,
  FiAward,
  FiPlay,
  FiCheck,
} from "react-icons/fi";
import { FaPlayCircle, FaArrowRight } from "react-icons/fa";
import Image from "next/image";
import Container from "@/conponents/shared/Container";
import Link from "next/link";

export default function AboutSection() {
  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 },
  };

  const staggerContainer = {
    animate: {
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const features = [
    {
      icon: FiTarget,
      title: "Recruitment Focused",
      description:
        "We edit with college recruiters in mind, highlighting key skills and moments that coaches look for.",
    },
    {
      icon: FiVideo,
      title: "Professional Editing",
      description:
        "Cinematic storytelling combined with sports analysis to create compelling athlete profiles.",
    },
    {
      icon: FiUsers,
      title: "Athlete First",
      description:
        "We work closely with each athlete to ensure their personality and strengths shine through.",
    },
    {
      icon: FiAward,
      title: "Proven Results",
      description:
        "Our edited reels have helped athletes secure scholarships at top-tier programs nationwide.",
    },
  ];

  const teamMembers = [
    {
      name: "Alex Morgan",
      role: "Lead Editor",
      expertise: "Former D1 Athlete & Video Specialist",
    },
    {
      name: "Jordan Lee",
      role: "Recruitment Strategist",
      expertise: "10+ Years Coaching Experience",
    },
    {
      name: "Taylor Smith",
      role: "Creative Director",
      expertise: "Sports Cinematography",
    },
  ];

  const processSteps = [
    "Submit your game footage",
    "Strategic review & planning session",
    "Professional editing & enhancement",
    "Recruiter-ready final cut",
    "Distribution strategy consultation",
  ];

  interface Owner {
    name: string;
    title: string;
    message: string;
    imageUrl: string;
  }
  const owners: Owner[] = [
    {
      name: "Apu Roy",
      title: "Founder",
      message:
        "Our goal is to help athletes turn their hard work into opportunities. Through professional sports videos and recruiting highlights, we make it easier for talent to be noticed and succeed.",
      imageUrl: "/apu-roy.png",
    },
    {
      name: "Nayan",
      title: "Founder",
      message:
        "This is the place where athletes get the best chance to shine. We create sports highlight videos and recruiting reels that open doors and showcase talent to coaches everywhere.",
      imageUrl: "/noyan.png",
    },
  ];

  return (
    <Container className="mx-auto">
      <section className="relative py-20 overflow-hidden bg-white text-gray-900">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-[0.03]">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `radial-gradient(circle at 25% 25%, rgba(249, 115, 22, 0.2) 1px, transparent 1px)`,
              backgroundSize: "40px 40px",
            }}
          />
        </div>

        {/* Decorative Elements */}
        <div className="absolute top-0 left-0 w-64 h-64 bg-orange-50 rounded-full -translate-x-32 -translate-y-32" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-orange-50 rounded-full translate-x-48 translate-y-48" />

        <div className="container mx-auto px-4 relative z-10">
          {/* Header Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-100 text-orange-700 border border-orange-200 mb-6">
              <FaPlayCircle className="text-orange-600" />
              <span className="text-orange-700 text-sm font-semibold">
                SPORTS VIDEO EDITING
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">
              Elevating <span className="text-orange-600">Athletes</span>{" "}
              Through
              <br />
              Professional Video Editing
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We transform raw game footage into compelling recruitment reels
              that get athletes noticed by top programs.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12 items-center mb-20">
            {/* Left Column - Main Content */}
            <motion.div
              variants={staggerContainer}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
            >
              <motion.div variants={fadeInUp} className="mb-8">
                <h2 className="text-3xl font-bold mb-6 text-gray-900">
                  Who <span className="text-orange-600">We Are</span>
                </h2>
                <p className="text-gray-700 text-lg leading-relaxed mb-6">
                  We are a team of former athletes, video editors, and
                  recruitment specialists dedicated to helping student-athletes
                  reach their full potential. With years of experience in both
                  sports and video production, we understand what it takes to
                  stand out in today&apos;s competitive recruitment landscape.
                </p>

                {/* Process Steps */}
                <div className="space-y-3 mt-8">
                  {processSteps.map((step, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <div className="w-6 h-6 rounded-full bg-orange-100 flex items-center justify-center flex-shrink-0">
                        <FiCheck className="text-orange-600 text-sm" />
                      </div>
                      <span className="text-gray-700">{step}</span>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Stats */}
              <motion.div
                variants={fadeInUp}
                className="grid grid-cols-3 gap-6 mt-12 p-6 bg-gradient-to-r from-orange-50 to-amber-50 rounded-2xl border border-orange-100"
              >
                <div className="text-center">
                  <div className="text-3xl font-bold text-orange-700">500+</div>
                  <div className="text-gray-600 text-sm font-medium">
                    Athletes Helped
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-orange-700">95%</div>
                  <div className="text-gray-600 text-sm font-medium">
                    Recruitment Success
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-orange-700">48h</div>
                  <div className="text-gray-600 text-sm font-medium">
                    Avg Turnaround
                  </div>
                </div>
              </motion.div>
            </motion.div>

            {/* Right Column - Video Placeholder */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="relative rounded-2xl overflow-hidden shadow-2xl shadow-orange-100 border border-gray-200">
                <div className="aspect-video bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
                  <iframe
                    className="w-full h-full"
                    src="https://www.youtube.com/embed/K3h0xczPvN8?si=oUXeA_0itLROhpkU"
                  ></iframe>
                </div>
                {/* Decorative corners */}
                <div className="absolute top-0 left- w-8 h-8 border-t-2 border-l-2 border-orange-600 rounded-tl-2xl" />
                <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-orange-600 rounded-tr-2xl" />
                <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-orange-600 rounded-bl-2xl" />
                <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-orange-600 rounded-br-2xl" />
              </div>

              {/* Floating Elements */}
              {/* <div className="absolute -top-4 -right-4 w-24 h-24 bg-orange-100 rounded-2xl rotate-12 opacity-80" />
              <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-amber-100 rounded-full opacity-80" /> */}
            </motion.div>
          </div>

          {/* What We Do Section */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="mb-20"
          >
            <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">
              What <span className="text-orange-600">We Do</span>
            </h2>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{
                    y: -8,
                    boxShadow: "0 20px 40px rgba(249, 115, 22, 0.1)",
                  }}
                  className="bg-white rounded-2xl p-6 border border-gray-200 hover:border-orange-300 transition-all group shadow-lg shadow-gray-100"
                >
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-orange-50 to-amber-50 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 border border-orange-100">
                    <feature.icon className="text-orange-600 text-2xl" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3 text-gray-900">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600">{feature.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Team Section */}
          <motion.section
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="relative mb-20"
          >
            {/* Background */}
            <div
              className="bg-fixed bg-center bg-cover bg-no-repeat relative"
              style={{ backgroundImage: "url('/multisports.png')" }}
            >
              {/* Overlay */}
              <div className="absolute inset-0 bg-black/60"></div>

              <div className="relative max-w-6xl mx-auto px-4 py-24 md:py-32 text-white">
                <h2 className="text-3xl md:text-5xl font-bold text-center mb-16">
                  What Our Owners Say
                </h2>

                <div className="grid gap-12 md:grid-cols-2">
                  {owners.map((owner, index) => (
                    <div
                      key={index}
                      className="bg-white bg-opacity-10 backdrop-blur-md p-6 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300"
                    >
                      {/* Message */}
                      <p className="text-black text-base leading-relaxed mb-6">
                        {owner.message}
                      </p>

                      {/* Owner Info */}
                      <div className="flex items-center gap-4">
                        <div className="w-20 h-20 md:w-24 md:h-24 rounded-full overflow-hidden border-2 border-white p-1">
                          <Image
                            src={owner.imageUrl}
                            alt={owner.name}
                            width={96}
                            height={96}
                            className="object-cover rounded-full"
                          />
                        </div>

                        <div>
                          <h3 className="text-lg md:text-xl font-semibold text-black">
                            {owner.name}
                          </h3>
                          <p className="text-sm md:text-base italic text-black/70">
                            {owner.title}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.section>

          {/* CTA Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <div className="bg-linear-to-r from-orange-50 to-amber-50 rounded-3xl p-8 md:p-12 border border-orange-100 max-w-4xl mx-auto relative overflow-hidden">
              {/* Decorative elements */}
              <div className="absolute top-0 right-0 w-40 h-40 bg-linear-to-br from-orange-200 to-transparent rounded-full -translate-y-20 translate-x-20 opacity-40" />
              <div className="absolute bottom-0 left-0 w-40 h-40 bg-linear-to-tr from-amber-200 to-transparent rounded-full translate-y-20 -translate-x-20 opacity-40" />

              <div className="relative z-10">
                <h2 className="text-3xl font-bold mb-4 text-gray-900">
                  Ready to Transform Your Game Footage?
                </h2>
                <p className="text-gray-700 mb-8 max-w-2xl mx-auto text-lg">
                  Let us help you create a highlight reel that showcases your
                  talent and gets you noticed by recruiters.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link href={"/contact"} className="bg-linear-to-r from-orange-600 to-amber-600 hover:from-orange-700 hover:to-amber-700 text-white px-10 py-4 rounded-xl font-semibold text-lg flex items-center gap-2 justify-center transition-all transform hover:scale-105 shadow-lg shadow-orange-200">
                    Start Your Free Consultation <FaArrowRight />
                  </Link>
                  <button
                    onClick={() =>
                      window.open(
                        "https://calendly.com/game0play24/30min",
                        "_blank",
                      )
                    }
                    className="bg-white hover:bg-gray-50 border-2 border-gray-300 hover:border-orange-300 text-gray-800 px-10 py-4 rounded-xl font-semibold text-lg transition-all"
                  >
                    Schedule a Demo
                  </button>
                </div>
                <p className="text-gray-500 text-sm mt-6">
                  Free consultation includes 2-minute highlight reel sample
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </Container>
  );
}
