import React from "react";

export const CinematicOverlay: React.FC = () => {
  return (
    <div className="absolute inset-0 pointer-events-none z-10 overflow-hidden">
      {/* Top subtle shadow gradient for navbar readability */}
      <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-[#08090d]/80 to-transparent" />

      {/* Bottom shadow gradient for hero transition */}
      <div className="absolute bottom-0 left-0 w-full h-48 bg-gradient-to-t from-[#08090d] via-[#08090d]/60 to-transparent" />

      {/* Vignette effect */}
      <div className="absolute inset-0 shadow-[inset_0_0_120px_rgba(0,0,0,0.8)]" />
    </div>
  );
};
