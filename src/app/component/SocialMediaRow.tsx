import React from 'react';
import {
  FaInstagram,
  FaLinkedin,
  FaFacebook,
  FaTwitter,
  FaYoutube,
} from 'react-icons/fa';

const socials = [
  {
    name: 'Instagram',
    icon: FaInstagram,
    href: 'https://instagram.com/kpitotal',
    color: 'from-[#E94772] to-[#5A87C5]',
  },
  {
    name: 'LinkedIn',
    icon: FaLinkedin,
    href: 'https://linkedin.com/company/kpitotal',
    color: 'from-[#5A87C5] to-[#219F89]',
  },
  {
    name: 'Facebook',
    icon: FaFacebook,
    href: 'https://facebook.com/kpitotal',
    color: 'from-[#219F89] to-[#E94772]',
  },
  {
    name: 'Twitter',
    icon: FaTwitter,
    href: 'https://twitter.com/kpitotal',
    color: 'from-[#5A87C5] to-[#E94772]',
  },
  {
    name: 'YouTube',
    icon: FaYoutube,
    href: 'https://youtube.com/@kpitotal',
    color: 'from-[#E94772] to-[#219F89]',
  },
];

export default function SocialMediaRow() {
  return (
    <div className="flex flex-col items-center gap-4 py-6">
      <h3 className="text-xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#E94772] via-[#5A87C5] to-[#219F89] mb-2 tracking-tight">
        Connect with Kpitotal
      </h3>
      <div className="flex flex-row gap-4 justify-center items-center">
        {socials.map((s) => {
          const Icon = s.icon;
          return (
            <a
              key={s.name}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              className={`group flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-br ${s.color} shadow-md hover:scale-110 hover:shadow-lg transition-all duration-300 border-2 border-white/40`}
            >
              <Icon className="text-white text-lg group-hover:animate-bounce" />
            </a>
          );
        })}
      </div>
      <div className="mt-2 text-base font-bold text-[#5A87C5] tracking-wide">
        @kpitotal
      </div>
    </div>
  );
}