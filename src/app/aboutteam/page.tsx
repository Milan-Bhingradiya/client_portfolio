"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Linkedin,
  Twitter,
  Instagram,
  Mail,
  Sparkles,
  ArrowRight,
  Quote,
  Users,
} from "lucide-react";
import smit from "../../../public/smit.jpeg";

// 3D Lanyard Card Component
function LanyardTeamCard({
  name,
  role,
  image,
  email,
  bio,
  socials,
  color = "from-violet-600 via-purple-600 to-fuchsia-600",
}: {
  name: string;
  role: string;
  image: any;
  email: string;
  bio: string;
  socials: { linkedin?: string; twitter?: string; instagram?: string };
  color?: string;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;

    const rect = cardRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const mouseX = e.clientX - centerX;
    const mouseY = e.clientY - centerY;

    const rotateXValue = (mouseY / (rect.height / 2)) * -12;
    const rotateYValue = (mouseX / (rect.width / 2)) * 12;

    setRotateX(rotateXValue);
    setRotateY(rotateYValue);
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
    setIsHovered(false);
  };

  return (
    <div className="relative perspective-1000 pt-24">
      {/* Lanyard String */}
      <motion.div
        className="absolute left-1/2 -translate-x-1/2 -top-8 w-1 h-32 z-10"
        style={{
          background: `linear-gradient(to bottom, #6366f1, #8b5cf6)`,
          transformOrigin: "top center",
        }}
        animate={{
          rotateZ: rotateY * 0.3,
        }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
      />

      {/* Lanyard Clip */}
      <motion.div
        className="absolute left-1/2 -translate-x-1/2 top-20 w-8 h-6 bg-gradient-to-b from-gray-300 to-gray-400 rounded-t-lg z-20 shadow-md"
        animate={{
          rotateZ: rotateY * 0.3,
        }}
      >
        {/* Clip hole */}
        <div className="absolute top-1 left-1/2 -translate-x-1/2 w-4 h-2 bg-gray-500 rounded-sm" />
      </motion.div>

      {/* Card */}
      <motion.div
        ref={cardRef}
        className="relative w-80 cursor-pointer mx-auto"
        style={{
          perspective: "1000px",
          transformStyle: "preserve-3d",
        }}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={handleMouseLeave}
        animate={{
          rotateX,
          rotateY,
          scale: isHovered ? 1.03 : 1,
        }}
        transition={{
          type: "spring",
          stiffness: 300,
          damping: 30,
        }}
      >
        {/* Card Content */}
        <div
          className={`relative bg-gradient-to-br ${color} rounded-2xl p-8 shadow-2xl overflow-hidden`}
        >
          {/* Shine effect */}
          <motion.div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: `linear-gradient(
                ${105 + rotateY * 2}deg,
                transparent 40%,
                rgba(255,255,255,0.12) 45%,
                rgba(255,255,255,0.2) 50%,
                rgba(255,255,255,0.12) 55%,
                transparent 60%
              )`,
            }}
          />

          {/* Pattern overlay */}
          <div
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 1px)`,
              backgroundSize: "16px 16px",
            }}
          />

          {/* Profile Image */}
          <div className="relative w-32 h-32 mx-auto mb-6">
            <div className="absolute inset-0 bg-gradient-to-r from-white/30 to-white/10 rounded-full blur-xl" />
            <Image
              src={image}
              alt={name}
              fill
              className="rounded-full object-cover border-4 border-white/30 shadow-lg"
            />
            {/* Online indicator */}
            <motion.div
              className="absolute bottom-2 right-2 w-5 h-5 bg-green-400 rounded-full border-2 border-white flex items-center justify-center"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <div className="w-2 h-2 bg-green-600 rounded-full" />
            </motion.div>
          </div>

          {/* Name & Title */}
          <div className="text-center relative z-10">
            <h3 className="text-2xl font-bold text-white mb-1">{name}</h3>
            <p className="text-white/70 text-sm font-medium mb-4 uppercase tracking-wider">
              {role}
            </p>

            {/* Bio */}
            <p className="text-white/80 text-sm mb-6 leading-relaxed">{bio}</p>

            {/* Divider */}
            <div className="w-20 h-0.5 bg-white/30 mx-auto mb-5" />

            {/* Email */}
            <p className="text-white/80 text-sm flex items-center justify-center gap-2 mb-5">
              <Mail className="w-4 h-4" />
              {email}
            </p>

            {/* Social Links */}
            <div className="flex justify-center gap-3">
              {socials.linkedin && (
                <motion.a
                  href={socials.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center hover:bg-white/30 transition-colors"
                  whileHover={{ scale: 1.15, y: -3 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Linkedin className="w-5 h-5 text-white" />
                </motion.a>
              )}
              {socials.twitter && (
                <motion.a
                  href={socials.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center hover:bg-white/30 transition-colors"
                  whileHover={{ scale: 1.15, y: -3 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Twitter className="w-5 h-5 text-white" />
                </motion.a>
              )}
              {socials.instagram && (
                <motion.a
                  href={socials.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center hover:bg-white/30 transition-colors"
                  whileHover={{ scale: 1.15, y: -3 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Instagram className="w-5 h-5 text-white" />
                </motion.a>
              )}
            </div>
          </div>

          {/* Badge */}
          <motion.div
            className="absolute -bottom-3 -right-3 w-16 h-16 bg-gradient-to-br from-amber-400 to-orange-500 rounded-full flex items-center justify-center shadow-lg"
            style={{ transform: "translateZ(30px)" }}
            animate={{
              rotate: isHovered ? 15 : 0,
            }}
          >
            <Sparkles className="w-7 h-7 text-white" />
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}

export default function AboutTeamPage() {
  const teamMembers = [
    {
      name: "Smit Shah",
      role: "CEO & Founder",
      image: smit,
      email: "smit@kpitotal.com",
      bio: "Visionary leader with 8+ years of experience in digital marketing and brand building. Passionate about helping businesses grow.",
      socials: {
        linkedin: "https://linkedin.com/in/smitshah",
        twitter: "https://twitter.com/smitshah",
        instagram: "https://instagram.com/smitshah",
      },
      color: "from-violet-600 via-purple-600 to-fuchsia-600",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 via-white to-gray-50 pt-24">
      {/* Hero Section */}
      <section className="relative py-16 px-6 md:px-12 lg:px-20 overflow-hidden">
        {/* Background decoration */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-gradient-to-r from-violet-100/50 via-fuchsia-100/50 to-pink-100/50 rounded-full blur-3xl -z-10" />

        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-violet-100 to-fuchsia-100 border border-violet-200 mb-6"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <Users className="w-4 h-4 text-violet-600" />
            <span className="text-sm font-medium text-violet-700">Our Team</span>
          </motion.div>

          <motion.h1
            className="text-5xl md:text-6xl font-bold text-gray-900 mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            Meet the{" "}
            <span className="bg-gradient-to-r from-violet-600 to-fuchsia-600 bg-clip-text text-transparent">
              Visionaries
            </span>
          </motion.h1>

          <motion.p
            className="text-lg text-gray-600 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            Behind every successful project is a dedicated team of creative minds
            and strategic thinkers. Get to know the people who make it happen.
          </motion.p>
        </div>
      </section>

      {/* Team Cards Section */}
      <section className="py-16 px-6 md:px-12 lg:px-20">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-wrap justify-center gap-12">
            {teamMembers.map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + index * 0.1 }}
              >
                <LanyardTeamCard {...member} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Quote Section */}
      <section className="py-20 px-6 md:px-12 lg:px-20">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative bg-gradient-to-br from-violet-600 via-purple-600 to-fuchsia-600 rounded-3xl p-10 md:p-16 text-center overflow-hidden"
          >
            {/* Pattern */}
            <div
              className="absolute inset-0 opacity-10"
              style={{
                backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 1px)`,
                backgroundSize: "20px 20px",
              }}
            />

            <div className="relative z-10">
              <Quote className="w-12 h-12 text-white/50 mx-auto mb-6" />
              <p className="text-2xl md:text-3xl font-medium text-white mb-8 leading-relaxed">
                &ldquo;Our goal is not just to deliver projects, but to build
                lasting partnerships that drive growth and success for our
                clients.&rdquo;
              </p>
              <div className="flex items-center justify-center gap-4">
                <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-white/30">
                  <Image
                    src={smit}
                    alt="Smit Shah"
                    width={56}
                    height={56}
                    className="object-cover"
                  />
                </div>
                <div className="text-left">
                  <p className="font-semibold text-white">Smit Shah</p>
                  <p className="text-white/70 text-sm">CEO & Founder</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 px-6 md:px-12 lg:px-20 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              What Drives Us
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Our core values shape everything we do and how we work with our
              clients.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Innovation",
                description:
                  "We constantly explore new ideas and technologies to deliver cutting-edge solutions.",
                icon: "💡",
              },
              {
                title: "Excellence",
                description:
                  "We hold ourselves to the highest standards in everything we create.",
                icon: "⭐",
              },
              {
                title: "Integrity",
                description:
                  "We believe in transparent communication and honest partnerships.",
                icon: "🤝",
              },
            ].map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all border border-gray-100 text-center"
              >
                <span className="text-5xl mb-6 block">{value.icon}</span>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {value.title}
                </h3>
                <p className="text-gray-600">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 md:px-12 lg:px-20">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              Want to Join Our Team?
            </h2>
            <p className="text-lg text-gray-600 mb-10">
              We&apos;re always looking for talented individuals who share our
              passion for excellence.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link
                  href="/career"
                  className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white font-semibold rounded-full hover:shadow-lg hover:shadow-violet-200 transition-all"
                >
                  View Open Positions
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link
                  href="/contactus"
                  className="inline-flex items-center gap-2 px-8 py-4 bg-white text-gray-900 font-semibold rounded-full border border-gray-200 hover:border-violet-300 hover:shadow-lg transition-all"
                >
                  Contact Us
                </Link>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
