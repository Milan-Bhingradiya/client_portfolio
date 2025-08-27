"use client";

import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

interface ContactUsProps {
  logos: any[];
}

export default function ContactUs({ logos }: ContactUsProps) {
  const inputBase =
    "w-full h-12 rounded-full bg-white/5 border border-white/10 px-5 text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-emerald-400/70 focus:border-transparent transition";
  const tileBase =
    "flex items-center justify-center h-20 rounded-2xl bg-white/5 border border-white/10";

  return (
    <section className="w-full bg-black py-8 sm:py-12 text-white">
      <div className="mx-auto max-w-7xl px-4">
        <div className="relative overflow-hidden rounded-[28px] border border-white/10 bg-neutral-900">
          {/* subtle green glow background */}
          <div className="pointer-events-none absolute inset-0 [background:radial-gradient(1200px_400px_at_left_80%,rgba(34,197,94,0.18),transparent_60%)] [mask-image:radial-gradient(800px_300px_at_left,black,transparent)]" />
          <div className="pointer-events-none absolute inset-0 [background:radial-gradient(900px_300px_at_right_80%,rgba(34,197,94,0.12),transparent_60%)] [mask-image:radial-gradient(700px_260px_at_right,black,transparent)]" />

          <div className="relative grid gap-10 p-6 md:p-10 lg:grid-cols-[1.2fr_1fr]">
            {/* Left: Form */}
            <div>
              <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight">
                Discuss Your Project With Us
              </h2>

              <form className="mt-6 grid gap-4 md:grid-cols-2">
                {/* Full Name */}
                <div className="md:col-span-1">
                  <label htmlFor="fullName" className="sr-only">
                    Full Name
                  </label>
                  <input
                    id="fullName"
                    name="fullName"
                    type="text"
                    placeholder="Full Name *"
                    className={inputBase}
                    aria-required="true"
                  />
                </div>

                {/* Company Name */}
                <div className="md:col-span-1">
                  <label htmlFor="companyName" className="sr-only">
                    Company Name
                  </label>
                  <input
                    id="companyName"
                    name="companyName"
                    type="text"
                    placeholder="Company Name *"
                    className={inputBase}
                    aria-required="true"
                  />
                </div>

                {/* Phone */}
                <div className="relative md:col-span-1">
                  <label htmlFor="phone" className="sr-only">
                    Phone
                  </label>
                  <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-white/80 text-sm">
                    <span className="mr-1" aria-hidden="true">
                      {"🇮🇳"}
                    </span>
                    {"+91"}
                  </span>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    placeholder=" "
                    className={`${inputBase} pl-16`}
                  />
                </div>

                {/* Email */}
                <div className="md:col-span-1">
                  <label htmlFor="email" className="sr-only">
                    Email
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="Email *"
                    className={inputBase}
                    aria-required="true"
                  />
                </div>

                {/* About Project */}
                <div className="md:col-span-2">
                  <label htmlFor="about" className="sr-only">
                    About Your Project
                  </label>
                  <textarea
                    id="about"
                    name="about"
                    placeholder="About Your Project *"
                    className={`${inputBase} min-h-[52px] py-3 resize-none`}
                    aria-required="true"
                  />
                </div>

                {/* Consent + Button */}
                <div className="md:col-span-2 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <p className="text-xs leading-relaxed text-white/70">
                    By sending this form, I confirm that I have read & accept
                    the{" "}
                    <a href="#" className="underline hover:text-emerald-300">
                      privacy policy
                    </a>
                    .
                  </p>

                  <button
                    type="submit"
                    className="inline-flex items-center gap-2 rounded-full bg-white text-neutral-900 px-5 py-3 font-medium hover:bg-emerald-400 hover:text-neutral-900 transition"
                  >
                    <span>Start Your Project</span>
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </div>
              </form>
            </div>

            {/* Right: Logos */}
            <div>
              <h3 className="text-xl sm:text-2xl font-semibold">
                Driven by Trust, Backed by Results
              </h3>
              <p className="mt-2 text-sm text-white/70">
                Our work speaks through the trust placed in us by top names
                across the globe.
              </p>

              <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 gap-4 md:gap-5">
                {logos.map((logo, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 1, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ scale: 1.1 }}
                    className="flex items-center justify-center"
                  >
                    <Image
                      className="grayscale hover:grayscale-0 transition-all duration-300"
                      src={logo || "/placeholder.svg"}
                      alt="Client logo"
                      width={80}
                      height={80}
                    />
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          {/* Rounded corners flare */}
          <div
            className="pointer-events-none absolute inset-0 rounded-[28px] ring-1 ring-white/10"
            aria-hidden="true"
          />
        </div>
      </div>
    </section>
  );
}
