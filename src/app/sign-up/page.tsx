"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";
import Button from "src/components/Button/Button";
import styles from "../login/login.module.scss";

export default function LoginPage() {
  const [message, setMessage] = useState("");

  async function handleSignUp(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    const credentials = Object.fromEntries(formData);
    console.log("Credentials", credentials);

    const res = await fetch("/api/auth/register", {
      method: "POST",
      body: JSON.stringify(credentials)
    });
    console.log("RES", res);

    if (!res.ok) {
      setMessage("Some thing went wrong");
      return
    }
    const data = await res.json()
    setMessage(data.message)
    signIn("credentials", {
      redirect: false,
      email: credentials.email,
      password: credentials.password
    })
  }

  return (
    <main>
      <div className="container">
        <form onSubmit={handleSignUp} className={styles["login-form"]}>
          <input type="email" name="email" placeholder="Your email" required />
          <input
            type="password"
            name="password"
            placeholder="Your password"
            required
          />
          <Button type="submit">Sign Up</Button>
          {message && <p>{message}</p>}
        </form>
      </div>
    </main>
  );
}
