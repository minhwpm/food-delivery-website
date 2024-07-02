"use client";

import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import SearchBox from "../SearchBox/SearchBox";
import Button from "../Button/Button";
import CartDropdown from "../CartDropdown/CartDropdown";
import styles from "./Header.module.scss"
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";

const Header = () => {
  const [cartOpen, setCartOpen] = useState(false)
  const { data, status }  = useSession()

  return (
    <nav className={styles.header}>
      <Link href="/" className={styles["logo-text"]}>
        Foodie
      </Link>
      <SearchBox />
      <div className={styles["cart-container"]}>
        <FontAwesomeIcon
          className={styles["cart-icon"]}
          icon={faCartShopping}
          onClick={() => setCartOpen(!cartOpen)}
        />
        {cartOpen && <CartDropdown />}
      </div>
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