import Link from "next/link";
import styles from "../../styles/Home.module.css";
import { useRequest } from "../../helpers/use-request";
import ConErrors from "../../helpers/conditionalErr";

import Router from "next/router";
import { useState } from "react";

export default function SignUpFunction() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { sendRequest, error } = useRequest({
    url: "/api/users/signup",
    method: "post",
    data: {
      email,
      password,
    },
    onSuccess: () => Router.push("/"),
  });

  const handleSubmit = async (event) => {
    event.preventDefault();
    await sendRequest();
  };
  return (
    <div className="container">
      <h1 className={styles.title}>
        Join{" "}
        <Link href="/">
          <a>Posthub</a>
        </Link>{" "}
        Here.
      </h1>

      <p className={styles.description}>
        Get started by signing up <code className={styles.code}>with us</code>
      </p>

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="email">Email Address</label>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            id="email"
            name="email"
          />
        </div>

        {error?.map((e) => e?.field === "email") && (
          <ConErrors error={error} field="email" />
        )}

        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            id="password"
            name="password"
            required
          />
        </div>

        {error?.length > 0 && <ConErrors error={error} field="password" />}

        <p className={styles.grid}>
          <button className="btn btn-primary" type="submit">
            Sign Up
          </button>
        </p>
      </form>
    </div>
  );
}