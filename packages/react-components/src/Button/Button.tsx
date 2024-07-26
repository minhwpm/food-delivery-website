import React, { Attributes, cloneElement, forwardRef, isValidElement, LegacyRef } from "react";
import styles from "./Button.module.scss";
import classNames from "classnames";

interface ButtonProps {
  asChild?: boolean;
  children: React.ReactNode;
  onClick?: () => void;
  variant?: "standard" | "primary" | "black";
  type?: "button" | "submit" | "reset";
  size?: "small" | "base"
}

export const Button: React.FC<ButtonProps> = forwardRef<HTMLButtonElement, ButtonProps>(({
  asChild,
  children,
  onClick,
  variant = "standard",
  type = "button",
  size = "base"
}, ref) => {
  const classes = classNames(styles.button, {
    [styles.standard]: variant === "standard",
    [styles.primary]: variant === "primary",
    [styles.black]: variant === "black",
    [styles.small]: size === "small",
    [styles.base]: size === "base",
  })
  if (asChild && isValidElement(children)) {
    return cloneElement(children, {
      className: classes,
      ref
    } as any)
  }
  return (
    <button
      ref={ref}
      type={type}
      className={classes}
      onClick={onClick}
    >
      {children}
    </button>
  );
});