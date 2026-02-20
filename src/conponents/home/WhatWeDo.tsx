"use client"
import { motion } from "framer-motion";
import { FiAward, FiTarget, FiUsers, FiVideo } from "react-icons/fi";
import Container from "../shared/Container";

export default function WhatWeDo() {

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

  return (
    <Container className="mx-auto">
    <div>
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
                  <div className="w-14 h-14 rounded-xl bg-linear-to-br from-orange-50 to-amber-50 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 border border-orange-100">
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
    </div>
      </Container>
  )
}
