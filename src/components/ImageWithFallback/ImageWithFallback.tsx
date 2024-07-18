"use client";

import React, { useState } from 'react';
import styles from "./ImageWithFallback.module.scss"
import classNames from 'classnames';

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
  fallbackSrc = "/images/food.webp",
}) => {
  const [imgSrc, setImgSrc] = useState(src);

  return (
    <img
      className={classNames(styles.image, className)}
      src={imgSrc}
      alt={alt}
      onError={() => setImgSrc(fallbackSrc)}
    />
  );
};

export default ImageWithFallback;