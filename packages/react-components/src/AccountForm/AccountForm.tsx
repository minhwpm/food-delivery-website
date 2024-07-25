"use client";

import { Button } from "../Button/Button";
import styles from "./AccountForm.module.scss"

export const AccountForm =({session}) => (
  <form className={styles["account-form"]}>
    <div className={styles.field}>
      <input type="text" name="full-name" defaultValue={session?.user.name ?? ""} placeholder="Full name" />
    </div>
    <div className={styles["field-group"]}>
      <div className={styles.field}>
        <input type="phone" name="phone" defaultValue={session?.user.phone ?? ""} placeholder="Phone" />
      </div>
      <div className={styles.field}>
        <input type="email" name="email" defaultValue={session?.user.email ?? ""} placeholder="Email" />
      </div>
    </div>
    <div className={styles.field}>
      <input
        type="text"
        name="address"
        defaultValue={session?.user.address}
        placeholder="Your address" />
    </div>
    <div className={styles.field}>
      <input
        type="date"
        name="birthday"
        defaultValue={session?.user.birthday}
        placeholder="Your birthday" />
    </div>
    <div>
      <Button type="submit" variant="black">
        Update Account
      </Button>
    </div>
  </form>
)