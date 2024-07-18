"use client";

import SearchBox from "../SearchBox/SearchBox";
import Button from "../Button/Button";
import CartDropdown from "../CartDropdown/CartDropdown";
import Link from "next/link";
import UserDropdown from "../UserDropdown/UserDropdown";
import { useSession } from "next-auth/react";
import styles from "./Header.module.scss"
import classNames from "classnames";
import { useCallback, useEffect, useState } from "react";

const Header = () => {
  const { data, status }  = useSession()
  const [scrolled, setScrolled] = useState(false)

  const handleScroll = useCallback(() => {
    setScrolled(window.scrollY > 0 )
  }, [])
  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener("scroll", handleScroll)
  }, [handleScroll])

  return (
    <nav className={classNames(styles.header, { [styles.scrolled]: scrolled })}>
      <div className={classNames("container", styles.wrapper)}>
        <Link href="/" className={styles["logo-text"]}>
          Foody
        </Link>
        <SearchBox />
        <CartDropdown />
        {status === "authenticated" ? (
          <UserDropdown user={data.user} />
        ) : (
          <Button url="/login" size="small">
            Sign in
          </Button>
        )}
      </div>
    </nav>
  );
}

export default Header