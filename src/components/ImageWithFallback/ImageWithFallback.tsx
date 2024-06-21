import React, { useState } from 'react';

interface ImageWithFallbackProps {
  className: string;
  src: string;
  fallbackSrc: string;
  alt: string;
}

const ImageWithFallback: React.FC<ImageWithFallbackProps> = ({ className, src, fallbackSrc, alt }) => {
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