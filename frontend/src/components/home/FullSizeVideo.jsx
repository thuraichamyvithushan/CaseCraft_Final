import React from 'react';
import vendingvideo from "../../assets/vending-video.mp4"

const FullSizeVideo = ({
  src,                  // Video source URL (mp4, webm, etc.)
  poster = null,        // Optional poster image
  autoplay = true,
  loop = true,
  muted = true,
  playsInline = true,
  controls = false,     // Set to true if you want visible controls
  overlay = false,      // Optional dark overlay for text readability
  children = null       // Optional content (text, buttons) on top of video
}) => {
  return (
    <div className="relative w-full h-screen overflow-hidden">
      {/* Video Element */}
      <video
        className="absolute inset-0 w-full h-full object-cover"
        src={vendingvideo}
        poster={poster}
        autoPlay={autoplay}
        loop={loop}
        muted={muted}
        playsInline={playsInline}
        controls={controls}
      />

      {/* Optional Dark Overlay */}
      {overlay && (
        <div className="absolute inset-0 bg-black/40" />
      )}

      {/* Optional Centered Content (e.g., heading, CTA) */}
      {children && (
        <div className="absolute inset-0 flex items-center justify-center z-10">
          <div className="text-center text-white px-6">
            {children}
          </div>
        </div>
      )}
    </div>
  );
};

export default FullSizeVideo;