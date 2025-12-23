"use client";

import React, { useState, useRef } from "react";
import { motion } from "framer-motion";
import { useMutation } from "@tanstack/react-query";
import { sendMessage } from "@/lib/api";
import Image from "next/image";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Send,
  Sparkles,
  MessageCircle,
  ArrowRight,
  Linkedin,
  Twitter,
  Instagram,
} from "lucide-react";
import smit from "../../../public/smit.jpeg";

// 3D Lanyard-style Card Component
function LanyardCard() {
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

    const rotateXValue = (mouseY / (rect.height / 2)) * -15;
    const rotateYValue = (mouseX / (rect.width / 2)) * 15;

    setRotateX(rotateXValue);
    setRotateY(rotateYValue);
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
    setIsHovered(false);
  };

  return (
    <div className="relative perspective-1000">
      {/* Lanyard String */}
      <motion.div
        className="absolute left-1/2 -translate-x-1/2 -top-32 w-1 h-32 z-10"
        style={{
          background: "linear-gradient(to bottom, #6366f1, #8b5cf6)",
          transformOrigin: "top center",
        }}
        animate={{
          rotateZ: rotateY * 0.3,
        }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
      />

      {/* Lanyard Clip */}
      <motion.div
        className="absolute left-1/2 -translate-x-1/2 -top-4 w-8 h-6 bg-gradient-to-b from-gray-300 to-gray-400 rounded-t-lg z-20"
        animate={{
          rotateZ: rotateY * 0.3,
        }}
      />

      {/* Card */}
      <motion.div
        ref={cardRef}
        className="relative w-72 cursor-pointer"
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
          scale: isHovered ? 1.05 : 1,
        }}
        transition={{
          type: "spring",
          stiffness: 300,
          damping: 30,
        }}
      >
        {/* Card Content */}
        <div className="relative bg-gradient-to-br from-violet-600 via-purple-600 to-fuchsia-600 rounded-2xl p-6 shadow-2xl overflow-hidden">
          {/* Shine effect */}
          <motion.div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: `linear-gradient(
                ${105 + rotateY * 2}deg,
                transparent 40%,
                rgba(255,255,255,0.15) 45%,
                rgba(255,255,255,0.25) 50%,
                rgba(255,255,255,0.15) 55%,
                transparent 60%
              )`,
            }}
          />

          {/* Pattern overlay */}
          <div
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 1px)`,
              backgroundSize: "20px 20px",
            }}
          />

          {/* Profile Image */}
          <div className="relative w-28 h-28 mx-auto mb-4">
            <div className="absolute inset-0 bg-gradient-to-r from-white/30 to-white/10 rounded-full blur-xl" />
            <Image
              src={smit}
              alt="Smit Shah"
              fill
              className="rounded-full object-cover border-4 border-white/30"
            />
            {/* Online indicator */}
            <div className="absolute bottom-1 right-1 w-5 h-5 bg-green-400 rounded-full border-2 border-white flex items-center justify-center">
              <div className="w-2 h-2 bg-green-600 rounded-full animate-pulse" />
            </div>
          </div>

          {/* Name & Title */}
          <div className="text-center relative z-10">
            <h3 className="text-2xl font-bold text-white mb-1">Smit Shah</h3>
            <p className="text-violet-200 text-sm font-medium mb-4">
              CEO & Founder
            </p>

            {/* Divider */}
            <div className="w-16 h-0.5 bg-white/30 mx-auto mb-4" />

            {/* Contact Info */}
            <div className="space-y-2 text-sm">
              <p className="text-white/80 flex items-center justify-center gap-2">
                <Mail className="w-4 h-4" />
                hello@kpitotal.com
              </p>
              <p className="text-white/80 flex items-center justify-center gap-2">
                <Phone className="w-4 h-4" />
                +91 76780 04443
              </p>
            </div>

            {/* Social Links */}
            <div className="flex justify-center gap-3 mt-4">
              {[
                { icon: Linkedin, href: "#" },
                { icon: Twitter, href: "#" },
                { icon: Instagram, href: "#" },
              ].map((social, idx) => (
                <motion.a
                  key={idx}
                  href={social.href}
                  className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center hover:bg-white/30 transition-colors"
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <social.icon className="w-4 h-4 text-white" />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Badge */}
          <motion.div
            className="absolute -bottom-2 -right-2 w-16 h-16 bg-gradient-to-br from-amber-400 to-orange-500 rounded-full flex items-center justify-center shadow-lg"
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

// Contact Info Card Component
function ContactInfoCard({
  icon: Icon,
  title,
  lines,
  color,
  delay,
}: {
  icon: React.ElementType;
  title: string;
  lines: string[];
  color: string;
  delay: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay }}
      whileHover={{ y: -5, scale: 1.02 }}
      className="group relative bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all border border-gray-100"
    >
      <div
        className={`w-14 h-14 rounded-xl ${color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}
      >
        <Icon className="w-6 h-6 text-white" />
      </div>
      <h3 className="text-lg font-bold text-gray-900 mb-2">{title}</h3>
      {lines.map((line, idx) => (
        <p key={idx} className="text-gray-600 text-sm">
          {line}
        </p>
      ))}

      {/* Hover gradient */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-violet-50 to-fuchsia-50 opacity-0 group-hover:opacity-100 transition-opacity -z-10" />
    </motion.div>
  );
}

export default function ContactPage() {
  const [formData, setFormData] = useState({
    title: "",
    email: "",
    message: "",
  });

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const mutation = useMutation({
    mutationFn: sendMessage,
    onSuccess: () => {
      alert("We will reach out to you soon!");
      setFormData({ title: "", email: "", message: "" });
    },
    onError: (error: Error) => {
      alert("Something went wrong: " + error.message);
    },
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      alert("Please enter a valid email address");
      return;
    }
    if (
      !formData.title.trim() ||
      !formData.email.trim() ||
      !formData.message.trim()
    ) {
      alert("Please fill in all fields");
      return;
    }
    mutation.mutate({
      title: formData.title,
      description: formData.message,
      email: formData.email,
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 via-white to-gray-50 pt-24">
      {/* Hero Section */}
      <section className="relative py-20 px-6 md:px-12 lg:px-20 overflow-hidden">
        {/* Background decoration */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-to-br from-violet-200/30 to-fuchsia-200/30 rounded-full blur-3xl -z-10" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-gradient-to-br from-blue-200/30 to-cyan-200/30 rounded-full blur-3xl -z-10" />

        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left: Content */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <motion.div
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-violet-100 to-fuchsia-100 border border-violet-200 mb-6"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 }}
              >
                <MessageCircle className="w-4 h-4 text-violet-600" />
                <span className="text-sm font-medium text-violet-700">
                  Let&apos;s Connect
                </span>
              </motion.div>

              <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                Get in{" "}
                <span className="bg-gradient-to-r from-violet-600 to-fuchsia-600 bg-clip-text text-transparent">
                  Touch
                </span>
              </h1>

              <p className="text-lg text-gray-600 mb-8 max-w-lg">
                Have a project in mind? We&apos;d love to hear from you. Send us
                a message and we&apos;ll respond as soon as possible.
              </p>

              {/* Quick Stats */}
              <div className="flex gap-8">
                {[
                  { value: "24h", label: "Response Time" },
                  { value: "260+", label: "Projects Done" },
                  { value: "99%", label: "Client Satisfaction" },
                ].map((stat, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 + idx * 0.1 }}
                  >
                    <p className="text-3xl font-bold bg-gradient-to-r from-violet-600 to-fuchsia-600 bg-clip-text text-transparent">
                      {stat.value}
                    </p>
                    <p className="text-sm text-gray-500">{stat.label}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Right: Lanyard Card */}
            <motion.div
              className="flex justify-center pt-32"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <LanyardCard />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="py-16 px-6 md:px-12 lg:px-20">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <ContactInfoCard
              icon={MapPin}
              title="Our Office"
              lines={["1230 Maecenas Street", "New York, NY 10001"]}
              color="bg-gradient-to-br from-violet-500 to-purple-600"
              delay={0}
            />
            <ContactInfoCard
              icon={Phone}
              title="Phone"
              lines={["+91 76780 04443", "+1 (123) 456-7890"]}
              color="bg-gradient-to-br from-blue-500 to-cyan-600"
              delay={0.1}
            />
            <ContactInfoCard
              icon={Mail}
              title="Email"
              lines={["hello@kpitotal.com", "support@kpitotal.com"]}
              color="bg-gradient-to-br from-fuchsia-500 to-pink-600"
              delay={0.2}
            />
            <ContactInfoCard
              icon={Clock}
              title="Working Hours"
              lines={["Mon - Fri: 9:00 - 18:00", "Sat: 10:00 - 14:00"]}
              color="bg-gradient-to-br from-amber-500 to-orange-600"
              delay={0.3}
            />
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="py-20 px-6 md:px-12 lg:px-20">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16">
            {/* Left: Form */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-white rounded-3xl p-8 md:p-12 shadow-xl border border-gray-100"
            >
              <h2 className="text-3xl font-bold text-gray-900 mb-2">
                Send us a Message
              </h2>
              <p className="text-gray-600 mb-8">
                Fill out the form below and we&apos;ll get back to you shortly.
              </p>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Your Name
                  </label>
                  <input
                    name="title"
                    type="text"
                    value={formData.title}
                    onChange={handleInputChange}
                    placeholder="John Doe"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-violet-500 focus:ring-2 focus:ring-violet-200 outline-none transition-all"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address
                  </label>
                  <input
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="john@example.com"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-violet-500 focus:ring-2 focus:ring-violet-200 outline-none transition-all"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Your Message
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    rows={5}
                    placeholder="Tell us about your project..."
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-violet-500 focus:ring-2 focus:ring-violet-200 outline-none transition-all resize-none"
                  />
                </div>

                <motion.button
                  type="submit"
                  disabled={mutation.isPending}
                  className="w-full bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white font-semibold py-4 px-8 rounded-xl hover:shadow-lg hover:shadow-violet-200 transition-all disabled:opacity-50 flex items-center justify-center gap-2"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {mutation.isPending ? (
                    "Sending..."
                  ) : (
                    <>
                      Send Message
                      <Send className="w-5 h-5" />
                    </>
                  )}
                </motion.button>
              </form>
            </motion.div>

            {/* Right: Map & CTA */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              {/* Map placeholder */}
              <div className="relative h-80 rounded-3xl overflow-hidden bg-gray-100">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d387193.30596698663!2d-74.25986652089844!3d40.69714941680757!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c24fa5d33f083b%3A0xc80b8f06e177fe62!2sNew%20York%2C%20NY%2C%20USA!5e0!3m2!1sen!2sin!4v1640000000000!5m2!1sen!2sin"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="grayscale hover:grayscale-0 transition-all duration-500"
                />
              </div>

              {/* CTA Card */}
              <div className="relative overflow-hidden rounded-3xl p-8 bg-gradient-to-br from-violet-600 via-purple-600 to-fuchsia-600">
                <div
                  className="absolute inset-0 opacity-10"
                  style={{
                    backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 1px)`,
                    backgroundSize: "20px 20px",
                  }}
                />

                <div className="relative z-10">
                  <Sparkles className="w-10 h-10 text-white/80 mb-4" />
                  <h3 className="text-2xl font-bold text-white mb-3">
                    Ready to start your project?
                  </h3>
                  <p className="text-white/80 mb-6">
                    Schedule a free consultation with our team and let&apos;s
                    discuss how we can help grow your business.
                  </p>
                  <motion.a
                    href="https://wa.me/917678004443"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-white text-violet-600 font-semibold py-3 px-6 rounded-full hover:shadow-lg transition-all"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Schedule a Call
                    <ArrowRight className="w-5 h-5" />
                  </motion.a>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
