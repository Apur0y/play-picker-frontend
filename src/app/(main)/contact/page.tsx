"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Mail, Calendar, MessageCircle, Star } from "lucide-react";
import { TbBrandFiverr } from "react-icons/tb";

export default function ContactPage() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

const contactMethods = [
  {
    icon: <TbBrandFiverr className="w-6 h-6" />,
    platform: "Fiverr",
    value: "Visit Profile",
    href: "https://www.fiverr.com/s/zWpdplo",
    color: "text-white",
    bgColor: "bg-[#1DBF73]", // Official Fiverr green
    description: "Professional services",
  },
  {
    icon: <Mail className="w-6 h-6" />,
    platform: "Email",
    value: "game0play24@gmail.com",
    href: "mailto:game0play24@gmail.com",
    color: "text-[#EA4335]", // Gmail red
    bgColor: "bg-[#EA4335]/10",
    description: "Detailed inquiries",
  },
  {
    icon: <MessageCircle className="w-6 h-6" />,
    platform: "WhatsApp",
    value: "+8801786209895",
    href: "https://wa.me/8801786209895",
    color: "text-[#25D366]", // WhatsApp green
    bgColor: "bg-[#25D366]/10",
    description: "Quick responses",
  },
  {
    icon: <MessageCircle className="w-6 h-6" />,
    platform: "Instagram",
    value: "@playpicker",
    href: "https://www.instagram.com/playpicker/",
    color: "text-white", // Instagram pink
  bgColor: "bg-gradient-to-tr from-[#F58529] via-[#DD2A7B] via-[#8134AF] to-[#515BD4]",

    description: "Creative work",
  },
  
];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
      },
    },
  };

  const cardVariants = {
    hidden: { scale: 0.9, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        duration: 0.5,
      },
    },
    hover: {
      scale: 1.05,
      y: -5,
      transition: {
        duration: 0.2,
      },
    },
  };

  return (
    <section className="min-h-screen bg-white text-gray-900 p-6 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-green-500/5 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div
          ref={ref}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={containerVariants}
          className="flex flex-col lg:flex-row items-center justify-between gap-12 py-20"
        >
          {/* Left Content */}
          <motion.div
            variants={itemVariants}
            className="flex-1 text-center lg:text-left"
          >
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-5xl lg:text-7xl font-bold mb-6  bg-clip-text ">
                Let&lsquo;s Talk
              </h1>
              <p className="text-xl lg:text-2xl text-gray-600 mb-8 leading-relaxed">
                Ready to bring your ideas to life? Let&apos;s create something
                amazing together. Choose your preferred way to connect.
              </p>

              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-block"
              >
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href="https://calendly.com/game0play24/30min"
                  className="
      group relative inline-flex items-center gap-3
      px-8 py-4 rounded-2xl font-semibold text-lg
      bg-primary text-white backdrop-blur-xl
      border border-primary
      shadow-lg shadow-black/20
      hover:bg-white/20 hover:text-primary 
      hover:shadow-blue-500/30
      transition-all duration-300
    "
                >
                  {/* Glass highlight */}
                  <span className="absolute inset-0 rounded-2xl bg-linear-to-br from-white/20 to-transparent opacity-50 pointer-events-none" />

                  <Calendar className="w-5 h-5  " />
                  <span className="relative z-10">Book a Meeting</span>

                  <div className="relative z-10 w-0 group-hover:w-5 transition-all duration-300 overflow-hidden">
                    ↗
                  </div>
                </a>
              </motion.div>

            </motion.div>
          </motion.div>

          {/* Right Content - Contact Methods */}
          <motion.div
            variants={containerVariants}
            className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-2xl"
          >
            {contactMethods.map((method, index) => (
              <motion.a
                key={method.platform}
                href={method.href}
                target="_blank"
                rel="noopener noreferrer"
                variants={cardVariants}
                initial="hidden"
                animate="visible"
                whileHover="hover"
                custom={index}
                className={`${method.bgColor} backdrop-blur-sm border border-gray-200 rounded-2xl p-6 group cursor-pointer hover:border-gray-600 transition-all `}
              >
                <div className="flex items-start justify-between mb-3">
                  <div
                    className={`p-3 rounded-xl ${method.bgColor} border border-gray-700`}
                  >
                    <div className={method.color}>{method.icon}</div>
                  </div>
                  <div className="text-2xl opacity-0 group-hover:opacity-100 transform translate-x-2 group-hover:translate-x-0 ">
                    ↗
                  </div>
                </div>

                <h3 className={`text-lg font-semibold mb-1 ${method.color}`}>
                  {method.platform}
                </h3>
                <p className=" font-medium text-sm mb-2">
                  {method.value}
                </p>
                <p className="text-gray-900 text-xs">{method.description}</p>
              </motion.a>
            ))}
          </motion.div>
        </motion.div>

        {/* Additional Info Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-20 text-center"
        >
          <div className="bg-black/30 backdrop-blur-sm border border-gray-800 rounded-3xl p-8 max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold mb-4">Why Work With Us?</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
              <div className="text-center">
                <div className="w-12 h-12 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-2xl">⚡</span>
                </div>
                <h4 className="font-semibold mb-2">Fast Response</h4>
                <p className="text-gray-400">
                  Typically reply within 1-2 hours
                </p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-2xl">🎯</span>
                </div>
                <h4 className="font-semibold mb-2">Expert Solutions</h4>
                <p className="text-gray-400">Tailored to your specific needs</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-purple-500/20 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-2xl">💎</span>
                </div>
                <h4 className="font-semibold mb-2">Quality Guaranteed</h4>
                <p className="text-gray-400">Professional grade work</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

