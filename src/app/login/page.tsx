"use client";

import Link from "next/link";
import Button from "src/components/Button/Button";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import styles from "./login.module.scss";

export default function LoginPage() {
  const [errorMessage, setErrorMessage] = useState("");
  const router = useRouter();

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    const credentials = Object.fromEntries(formData);
    console.log("credentials", credentials);

    const result = await signIn("credentials", {
      redirect: false,
      email: credentials.email,
      password: credentials.password,
    });

    if (result?.error) {
      setErrorMessage(result.error);
    } else {
      router.push("/")
    }
  }

  return (
    <main>
      <div className="container">
        <form onSubmit={handleSubmit} className={styles["login-form"]}>
          <input type="email" name="email" placeholder="Your email" required />
          <input
            type="password"
            name="password"
            placeholder="Your password"
            required
          />
          <Button type="submit">Login</Button>
          <div>
            Don't have an account yet? <Link href="/sign-up">Sign up</Link> now
          </div>
          {errorMessage && <p>{errorMessage}</p>}
        </form>
      </div>
    </main>
  );
}
