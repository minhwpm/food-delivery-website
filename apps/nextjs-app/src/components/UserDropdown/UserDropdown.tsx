"use client";

import Link from "next/link";
import Button from '@/components/Button/Button';
import { FaUserAlt } from "react-icons/fa";
import { signOut } from "next-auth/react";
import { useToggleDropdown } from "@/lib/hooks";
import styles from "./UserDropdown.module.scss"

const UserDropdown: React.FC<{user}> = ({user}) => {
  const { dropdownRef, dropdownOpen, toggleDropdown } = useToggleDropdown()

  return (
    <div ref={dropdownRef} className={styles["user-container"]} >
      <FaUserAlt
        className={styles["user-icon"]}
        onClick={toggleDropdown}
      />
      {dropdownOpen && (
        <div className={styles["user-dropdown"]}>
          <div className={styles.wrapper}>
            {user.name && <div>Hello, {user.name}!</div> }
            <Link href="/account">My Account</Link>
            <Link href={"/checkout"}>My Order</Link>
            <Link href={"/wishlist"}>Wish list</Link>
            <Button onClick={async () => await signOut()}>Sign out</Button>
          </div>
        </div>
      )}
    </div>
  );
}

export default UserDropdown;