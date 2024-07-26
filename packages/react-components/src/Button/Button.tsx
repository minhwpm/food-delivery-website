import React, { cloneElement, forwardRef, LegacyRef } from "react";
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

export const Button: React.FC<ButtonProps> = forwardRef(({
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
  if (asChild) {
    return (
      <>
        {cloneElement(<>{children}</>, {
          className: classes,
          ref
        })}
      </>
    )
  }
  return (
    <button
      ref={ref as LegacyRef<HTMLButtonElement>}
      type={type}
      className={classes}
      onClick={onClick}
    >
      {children}
    </button>
  );
});