"use client";

import Link from "next/link";
import Button from '@/components/Button/Button';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { signOut } from "next-auth/react";
import { useToggleDropdown } from "@/lib/hooks";
import styles from "./UserDropdown.module.scss"

const UserDropdown: React.FC<{user}> = ({user}) => {
  const { dropdownRef, dropdownOpen, toggleDropdown } = useToggleDropdown()

  return (
    <div ref={dropdownRef} className={styles["user-container"]} >
      <FontAwesomeIcon
        className={styles["user-icon"]}
        icon={faUser}
        onClick={toggleDropdown}
      />
      {dropdownOpen && (
        <div className={styles["user-dropdown"]}>
          <div className={styles.wrapper}>
            {user.name && <div>{user.name}</div> }
            <Link href={"/account"}>My Account</Link>
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