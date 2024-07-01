"use client";

import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import SearchBox from "../SearchBox/SearchBox";
import Button from "../Button/Button";
import CartDropdown from "../CartDropdown/CartDropdown";
import styles from "./Header.module.scss"
import Link from "next/link";

const Header = () => {
  const [cartOpen, setCartOpen] = useState(false)

  return (
    <nav className={styles.header}>
      <Link href="/" className={styles["logo-text"]}>
        Foodie
      </Link>
      {/* <div className={styles["logo-text"]}>
        Foodie
      </div> */}
      <SearchBox />
      <div className={styles["cart-container"]}>
        <FontAwesomeIcon
          className={styles["cart-icon"]}
          icon={faCartShopping}
          onClick={() => setCartOpen(!cartOpen)}
        />
        {cartOpen && <CartDropdown />}
      </div>
      <Button url="/login">
        Sign in
      </Button>
    </nav>
  );
}

export default Header