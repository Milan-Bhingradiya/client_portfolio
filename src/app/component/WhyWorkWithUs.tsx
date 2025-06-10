"use client";
import { motion } from "framer-motion";

const items = [
  {
    emoji: "🧠",
    title: "Strategic Mindset",
    desc: "We don't just execute — we guide.",
  },
  {
    emoji: "🚀",
    title: "Growth-Obsessed",
    desc: "Your next 100 crores is our focus.",
  },
  {
    emoji: "🔄",
    title: "Efficiency Experts",
    desc: "Automation and optimization are baked into our DNA.",
  },
  {
    emoji: "🤝",
    title: "Trusted Partners",
    desc: "We work like an extension of your internal team.",
  },
];

export default function WhyWorkWithUs() {
  return (
    <section className="bg-black text-white py-16 px-6">
      <div className="max-w-4xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-3xl md:text-4xl font-bold mb-12 text-center"
        >
          Why Work With Us?
        </motion.h2>

        <div className="grid gap-8 md:grid-cols-2">
          {items.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.2, duration: 0.5 }}
              className="border border-white/20 rounded-2xl p-6 hover:bg-white/5 transition"
            >
              <div className="text-4xl mb-2">{item.emoji}</div>
              <h3 className="text-xl font-semibold mb-1">{item.title}</h3>
              <p className="text-white/70">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
