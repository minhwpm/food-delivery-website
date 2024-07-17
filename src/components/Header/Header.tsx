"use client";

import SearchBox from "../SearchBox/SearchBox";
import Button from "../Button/Button";
import CartDropdown from "../CartDropdown/CartDropdown";
import Link from "next/link";
import UserDropdown from "../UserDropdown/UserDropdown";
import { useSession } from "next-auth/react";
import styles from "./Header.module.scss"
import classNames from "classnames";

const Header = () => {
  const { data, status }  = useSession()

  return (
    <nav className={styles.header}>
      <div className={classNames("container", styles.wrapper)}>
        <Link href="/" className={styles["logo-text"]}>
          Foody
        </Link>
        <SearchBox />
        <CartDropdown />
        {status === "authenticated" && (
          <UserDropdown user={data.user} />
        )}
        {status === "unauthenticated" && (
          <Button url="/login" size="small">Sign in</Button>
        )}
      </div>
    </nav>
  );
}

export default Header