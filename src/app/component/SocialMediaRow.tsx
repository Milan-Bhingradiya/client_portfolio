import React from 'react';
import {
  FaInstagram,
  FaLinkedin,
  FaFacebook,
  FaYoutube,
} from 'react-icons/fa';
import { SiX } from 'react-icons/si';

const socials = [
  {
    name: 'Instagram',
    icon: FaInstagram,
    href: 'https://instagram.com/kpitotal',
  },
  {
    name: 'LinkedIn',
    icon: FaLinkedin,
    href: 'https://linkedin.com/company/kpitotal',
  },
  {
    name: 'Facebook',
    icon: FaFacebook,
    href: 'https://facebook.com/kpitotal',
  },
  {
    name: 'X',
    icon: SiX,
    href: 'https://x.com/kpitotal',
  },
  {
    name: 'YouTube',
    icon: FaYoutube,
    href: 'https://youtube.com/@kpitotal',
  },
];

export default function SocialMediaRow() {
  return (
    <div className="flex flex-col items-center gap-4 py-6">
      
      <div className="flex flex-row gap-4 justify-center items-center">
        {socials.map((s) => {
          const Icon = s.icon;
          return (
            <a
              key={s.name}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center justify-center w-10 h-10 rounded-full bg-white border border-gray-300 shadow-sm hover:scale-110 hover:bg-gray-900 transition-all duration-300"
            >
              <Icon className="text-gray-900 group-hover:text-white text-lg transition-colors duration-300" />
            </a>
          );
        })}
      </div>
    
    </div>
  );
}