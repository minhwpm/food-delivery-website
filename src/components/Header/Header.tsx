"use client";

import SearchBox from "../SearchBox/SearchBox";
import Button from "../Button/Button";
import CartDropdown from "../CartDropdown/CartDropdown";
import Link from "next/link";
import UserDropdown from "../UserDropdown/UserDropdown";
import { useSession } from "next-auth/react";
import styles from "./Header.module.scss"

const Header = () => {
  const { data, status }  = useSession()

  return (
    <nav className={styles.header}>
      <Link href="/" className={styles["logo-text"]}>
        Foody
      </Link>
      <SearchBox />
      <CartDropdown />
      {status === "authenticated" && (
        <UserDropdown user={data.user} />
      )}
      {status === "unauthenticated" && (
        <Button url="/login">Sign in</Button>
      )}
    </nav>
  );
}

export default Header