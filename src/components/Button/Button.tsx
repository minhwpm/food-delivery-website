import React from "react";
import Link from "next/link";
import styles from "./Button.module.scss"

interface ButtonProps {
  children: React.ReactNode;
  url?: string;
  onClick?: () => void;
  type?: "button" | "submit" | "reset"
}

const Button: React.FC<ButtonProps> = ({ children, url, onClick, type = "button"}) => {
  if (url) {
    return <Link href={url} className={styles.button}>{children}</Link>;
  }
  return (
    <button type={type} className={styles.button} onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;
