"use client";

import { useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Player } from "@lottiefiles/react-lottie-player";
import Link from "next/link";

// Components
import Section1 from "./work/component/Section1";
import ServiceSection from "./component/ServiceSection";
import WhyWorkWithUs from "./component/WhyWorkWithUs";
import TestimonialSection from "./component/TestimonialSection";
import SocialMediaRow from "./component/SocialMediaRow";
import ClientsSection from "./component/ClientsSection";
import AboutSection from "./component/AboutSection";
import IndustriesSection from "./component/IndustriesSection";
import StatsSection from "./component/StatsSection";
import CTASection from "./component/CTASection";
import ContactSection from "./component/ContactUs";

// Assets
import peoples from "../../public/peoples.json";
import one from "../../public/1.png";
import two from "../../public/2.png";
import three from "../../public/3.png";
import four from "../../public/4.png";
import five from "../../public/5.png";

import six from "../../public/6.png";
import seven from "../../public/7.png";
import eight from "../../public/8.png";
import nine from "../../public/9.png";
import ImageVideoSlider from "./component/imageVideoSlider";

function Page() {
  const [stats, setStats] = useState({
    projects: 0,
    clients: 0,
    years: 0,
    awards: 0,
  });

  // Scroll progress
  const { scrollYProgress } = useScroll();
  const scaleX = useTransform(scrollYProgress, [0, 1], [0, 1]);

  // Animate stats
  useEffect(() => {
    const timer = setTimeout(() => {
      setStats({ projects: 25, clients: 15, years: 8, awards: 5 });
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  const topRow = ["Food & Beverages", "FMCG", "Healthcare", "Real Estate"];
  const bottomRow = ["Technology", "Engineering", "Finance", "& More.."];
  const clientLogos = [one, two, three, four, five, six];
  const logos = [one, two, three, four, five, six, seven, eight, nine];

  return (
    <div className="min-h-screen overflow-x-hidden">
      {/* Progress bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-600 to-purple-600 z-50 origin-left"
        style={{ scaleX }}
      />

      {/* Hero Section */}
      <Section1 />

      {/* Clients Section */}
      <ClientsSection logos={clientLogos} />

      {/* About Section */}
      <AboutSection />

      {/* Main Services */}
      <ServiceSection />
      <ImageVideoSlider />
      <StatsSection stats={stats} />

      <WhyWorkWithUs />

      {/* CTA Section */}
      {/* Stats Section */}
      <IndustriesSection topRow={topRow} bottomRow={bottomRow} />

      {/* Industries Section */}
      {/* <CTASection /> */}

      {/* Testimonials */}
      <TestimonialSection />

      {/* Contact Section */}


      <ContactSection logos={logos} />
      {/* Animation */}
      <div className="flex justify-center items-end mt-10 h-full">
        <div className="w-4/5 sm:w-1/2 h-auto">
          <Player src={peoples} className="w-full h-full" loop autoplay />
        </div>
      </div>
      {/* Social Media */}
      <SocialMediaRow />

      {/* Footer */}
      <footer className="bg-black text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="text-2xl font-bold mb-4">KPI Total</h3>
              <p className="text-gray-400 mb-4">
                Elevate your digital presence with KPI Agency: SEO mastery,
                targeted marketing, and seamless development for unparalleled
                results.
              </p>
              <div className="flex gap-4">
                {/* Social media icons would go here */}
              </div>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Services</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Web Design
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Development
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Branding
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Strategy
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    About
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Team
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Careers
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Contact</h4>
              <div className="space-y-2 text-gray-400">
                <div>info@kpitotal.com</div>
                <div>+ 91 7678004443</div>
                <div>Ahmedabad</div>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 text-center text-gray-400">
            <span>&copy; KPI Total. All rights reserved 2025</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Page;
