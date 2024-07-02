"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";
import Button from "src/components/Button/Button";
import styles from "./login.module.scss";

export default function LoginPage() {
  const [errorMessage, setErrorMessage] = useState("")

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget
    const formData = new FormData(form);
    const credentials = Object.fromEntries(formData)
    console.log("credentials", credentials)

    const result = await signIn("credentials", {
      redirect: false,
      email: credentials.email,
      password: credentials.password
    })
    console.log("RESULT", result)

    if (result?.error) {
      setErrorMessage(result.error)
    } else {
      window.location.href="/"
    }
  }

  return (
    <main>
      <div className="container">
        <form onSubmit={handleSubmit} className={styles["login-form"]}>
          <input type="email" name="email" placeholder="Your email" required />
          <input type="password" name="password" placeholder="Your password" required />
          <Button type="submit">Login</Button>
          {errorMessage && <p>{errorMessage}</p>}
        </form>
      </div>
    </main>
  )
}