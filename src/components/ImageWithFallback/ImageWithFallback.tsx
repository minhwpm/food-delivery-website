"use client";

import React, { useState } from 'react';

interface ImageWithFallbackProps {
  className: string;
  src: string;
  alt: string;
  fallbackSrc?: string;
}

const ImageWithFallback: React.FC<ImageWithFallbackProps> = ({
  className,
  src,
  alt,
  fallbackSrc = "https://via.placeholder.com/400?text=No+Image",
}) => {
  const [imgSrc, setImgSrc] = useState(src);

  return (
    <img
      className={className}
      src={imgSrc}
      alt={alt}
      onError={() => setImgSrc(fallbackSrc)}
    />
  );
};

export default ImageWithFallback;