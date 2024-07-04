"use client";

import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import SearchBox from "../SearchBox/SearchBox";
import Button from "../Button/Button";
import CartDropdown from "../CartDropdown/CartDropdown";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import styles from "./Header.module.scss"

const Header = () => {
  const { data, status }  = useSession()

  return (
    <nav className={styles.header}>
      <Link href="/" className={styles["logo-text"]}>
        Foodie
      </Link>
      <SearchBox />
      <CartDropdown />
      {status === "authenticated" && (
        <>
          {data?.user.email}
          <Button onClick={async () => await signOut()}>Sign out</Button>
        </>
      )}
      {status === "unauthenticated" && (
        <Button url="/login">Sign in</Button>
      )}
    </nav>
  );
}

export default Header