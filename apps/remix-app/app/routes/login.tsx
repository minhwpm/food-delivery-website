import { Link, useNavigate } from "@remix-run/react";
import { Button } from "@open-foody/react-components";
import { useState } from "react";
import { signIn } from "next-auth/react";
import styles from "../styles/login.module.scss";

export default function LoginPage() {
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

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
      navigate("/")
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
          <Link to="/forgot-password">Forgot password?</Link>

          <Button type="submit" variant="black">Login</Button>
          <div>
            Don&apos;t have an account yet? <Link to="/sign-up">Sign up</Link> now
          </div>
          {errorMessage && <p>{errorMessage}</p>}
        </form>
      </div>
    </main>
  );
}
