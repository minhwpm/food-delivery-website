"use client";

import { useState } from "react";
import Button from "../Button/Button";
import styles from "./ChangePasswordForm.module.scss";

const ChangePasswordForm: React.FC = () => {
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    const credentials = Object.fromEntries(formData);
    console.log("credentials", credentials);

    const result = await fetch("/api/auth/change-password", {
      method: "POST",
      body: JSON.stringify(credentials)
    });

  }
  return (
    <form onSubmit={handleSubmit} className={styles["change-password-form"]}>
      <h2 className="">Update your password</h2>
      <input
        type="password"
        name="password"
        placeholder="Current password"
        required
      />
      <input
        type="password"
        name="password"
        placeholder="New password"
        required
      />
      <input
        type="password"
        name="password"
        placeholder="Confirm new password"
        required
      />
      <Button type="submit" variant="black">Update Password</Button>
      {errorMessage && <p>{errorMessage}</p>}
    </form>
  );
}

export default ChangePasswordForm