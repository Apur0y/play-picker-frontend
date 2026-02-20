"use client";
import { motion } from "framer-motion";
import { FiCheck } from "react-icons/fi";
import Container from "../shared/Container";

export default function WhoWeAre() {
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

  const processSteps = [
    "Submit your game footage",
    "Strategic review & planning session",
    "Professional editing & enhancement",
    "Recruiter-ready final cut",
    "Distribution strategy consultation",
  ];

  return (
    <Container className="mx-auto">
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
              We are a team of former athletes, video editors, and recruitment
              specialists dedicated to helping student-athletes reach their full
              potential. With years of experience in both sports and video
              production, we understand what it takes to stand out in
              today&apos;s competitive recruitment landscape.
            </p>

            {/* Process Steps */}
            <div className="space-y-3 mt-8">
              {processSteps.map((step, index) => (
                <div key={index} className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-orange-100 flex items-center justify-center shrink-0">
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
            className="grid grid-cols-3 gap-6 mt-12 p-6 bg-linear-to-r from-orange-50 to-amber-50 rounded-2xl border border-orange-100"
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
            <div className="aspect-video bg-linear-to-br from-gray-50 to-gray-100 flex items-center justify-center">
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
    </Container>
  );
}
