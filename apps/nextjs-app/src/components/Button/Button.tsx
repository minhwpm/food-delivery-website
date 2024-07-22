import React from "react";
import Link from "next/link";
import styles from "./Button.module.scss";
import classNames from "classnames";

interface ButtonProps {
  children: React.ReactNode;
  url?: string;
  onClick?: () => void;
  variant?: "standard" | "primary" | "black";
  type?: "button" | "submit" | "reset";
  size?: "small" | "base"
}

const Button: React.FC<ButtonProps> = ({
  children,
  url,
  onClick,
  variant = "standard",
  type = "button",
  size = "base"
}) => {
  if (url) {
    return (
      <Link
        href={url}
        className={classNames(styles.button, {
          [styles.standard]: variant === "standard",
          [styles.primary]: variant === "primary",
          [styles.black]: variant === "black",
          [styles.small]: size === "small",
          [styles.base]: size === "base",
        })}
      >
        {children}
      </Link>
    );
  }
  return (
    <button
      type={type}
      className={classNames(styles.button, {
        [styles.standard]: variant === "standard",
        [styles.primary]: variant === "primary",
        [styles.black]: variant === "black",
        [styles.small]: size === "small",
        [styles.base]: size === "base",
      })}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
