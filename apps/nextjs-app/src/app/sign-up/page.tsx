"use client";

import { Button } from "@open-foody/react-components";
import { signIn } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import styles from "../login/login.module.scss";
import Link from "next/link";

export default function SignUpPage() {
  const [message, setMessage] = useState("");
  const router = useRouter();

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
    if (!res.ok) {
      setMessage("Some thing went wrong");
      return
    }
    const data = await res.json()
    setMessage(data.message)
    const result = await signIn("credentials", {
      redirect: false,
      email: credentials.email,
      password: credentials.password
    })

    if (result?.error) {
      setMessage(result.error);
    } else {
      router.push("/")
    }
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
          <div>
            Already have an account? <Link href="/login">Login</Link> now
          </div>
          {message && <p>{message}</p>}
        </form>
      </div>
    </main>
  );
}
