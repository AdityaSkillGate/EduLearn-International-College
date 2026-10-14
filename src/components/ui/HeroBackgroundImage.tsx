import React from 'react';

interface HeroBackgroundImageProps {
  src: string;
  alt?: string;
  opacity?: string;
  className?: string;
}

export const HeroBackgroundImage: React.FC<HeroBackgroundImageProps> = ({
  src,
  alt = '',
  opacity = 'opacity-25',
  className = '',
}) => {
  return (
    <div
      className={`absolute inset-0 pointer-events-none overflow-hidden ${className}`}
      aria-hidden="true"
    >
      <img
        src={src}
        alt={alt}
        className={`w-full h-full object-cover ${opacity} mix-blend-luminosity scale-105 transform motion-safe:transition-transform motion-safe:duration-1000`}
      />
      {/* Luminous royal purple gradient overlays for contrast, vibrancy, and brightness */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#1F0A47]/85 via-[#2E0E68]/75 to-[#1A073F]/65" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#1F0A47]/90 via-transparent to-[#1F0A47]/30" />
      {/* Subtle fine grid overlay for institutional texture */}
      <div className="absolute inset-0 bg-[radial-gradient(#ffffff0a_1px,transparent_1px)] [background-size:24px_24px] opacity-40" />
    </div>
  );
};
