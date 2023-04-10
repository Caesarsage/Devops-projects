import styles from "../../styles/Home.module.css";
import { useRequest } from "../../helpers/use-request";

import Router from "next/router";
import { useEffect } from "react";

export default function Signout() {
  const { sendRequest } = useRequest({
    url: "/api/users/signout",
    method: "post",
    data: {},
    onSuccess: () => Router.push("/"),
  });

  useEffect(() => {
    sendRequest();
  }, []);

  return (
    <div className="container">
      <h1 className={styles.title}>
        We hope to see you again!{" "}
      </h1>
    </div>
  );
}
