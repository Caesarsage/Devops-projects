import "../styles/globals.css";
import axiosSrv from "../helpers/axios-client";
import styles from "../styles/Home.module.css";
import Header from "../components/Header";

import "bootstrap/dist/css/bootstrap.css";
import Head from "next/head";

const uiURL = process.env.NEXT_PUBLIC_SITE_URL;


const MyApp = ({ Component, pageProps, loggedInUser }) => {
  return (
    <div>
      <Head>
        <title>Posthub, Enabing Borderless Conversations</title>
        <meta
          name="description"
          content="Discuss and share thoughts or ideas"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header loggedInUser={loggedInUser} />
      <Component loggedInUser={loggedInUser} {...pageProps} />

      <footer className={styles.footer}>
        <a
          href={uiURL}
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by Posthub{" "}
          <span className={styles.logo}>
          </span>
        </a>
      </footer>
    </div>
  );
};

MyApp.getInitialProps = async (myAppContext) => {
  const backendClient = axiosSrv(myAppContext.ctx);
  const { data } = await backendClient.get("/api/users/activeuser");

  const pageProps = myAppContext.Component.getInitialProps
    ? await myAppContext.Component.getInitialProps(
        myAppContext.ctx,
        backendClient,
        data.loggedInUser
      )
    : {};

  return {
    pageProps,
    ...data,
  };
};

export default MyApp;
