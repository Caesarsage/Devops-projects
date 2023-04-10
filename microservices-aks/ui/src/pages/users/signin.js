import styles from "../../styles/Home.module.css";
import {useRequest, uiURL} from "../../helpers/use-request";
import ConErrors from "../../helpers/conditionalErr";

import Router from "next/router";
import { useState } from "react";

export default function SigninForm() {
  // Handle the submit event on form submit.
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { sendRequest, error } = useRequest({
    url: "/api/users/signin",
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
        Welcome back!{" "}
      </h1>

      <p className={styles.description}>
        You do not have a profile yet? <a href={uiURL + "/users/signup"}>
          <code className={styles.code}>Sign up here</code>
        </a>
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

        {error?.length > 0 && <ConErrors error={error} field="" />}

        <p className={styles.grid}>
          <button className="btn btn-primary" type="submit">
            Sign In
          </button>
        </p>
      </form>
    </div>
  );
}