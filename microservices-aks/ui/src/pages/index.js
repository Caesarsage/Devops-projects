import Link from "next/link";
import styles from "../styles/Home.module.css";
import { uiURL } from "../helpers/use-request";

const Home = ({ loggedInUser, postList }) => {
  const postHub =
    postList?.length < 0
      ? []
      : postList.map((post) => {
          return (
            <Link key={post.id} href="/posts/[postId]" as={`/posts/${post.id}`}>
              <a className={styles.card}>
                <p>{post.post} &rarr;</p>
                <p>
                  {post.comment.length}{" "}
                  {post.comment.length > 0 ? "comments" : "comment"}
                </p>
              </a>
            </Link>
          );
        });

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        {loggedInUser ? (
          <h1 className={styles.title}>
            Welcome to <a href={uiURL}>Posthub!</a>
          </h1>
        ) : (
          <h1 className={styles.title}>
            Yet to join <a href={uiURL + "/users/signup"}>the conversation?</a>
          </h1>
        )}

        {loggedInUser ? (
          <p className={styles.description}>
            Get started by checking{" "}
            <code className={styles.code}>some threads</code>
          </p>
        ) : (
          <p className={styles.description}>
            Or want to sign in{" "}
            <a href={uiURL + "/users/signin"}>
              <code className={styles.code}>here</code>
            </a>
          </p>
        )}

        <div style={{ margin: "2rem 0rem 0rem 0rem" }}>
          <div className={styles.grid}>{postHub}</div>
        </div>
      </main>
    </div>
  );
};

Home.getInitialProps = async (context, backendClient, loggedInUser) => {
  const { data } = await backendClient.get("/api/posthub");
  return { postList: data };
};

export default Home;
