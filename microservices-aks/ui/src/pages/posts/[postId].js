import Router from "next/router";
import { useState } from "react";
import Link from "next/link";
import axios from "axios";

import styles from "../../styles/Home.module.css";
import { useRequest } from "../../helpers/use-request";
import MsgErrors from "../../helpers/nonValidationErr";

const GetPost = ({ post }) => {
  const [comment, setComment] = useState("");

  const { sendRequest, error } = useRequest({
    url: `/api/comments/${post.id}`,
    method: "post",
    data: {
      comment,
    },
    onSuccess: (comment) => {
      Router.push("/posts/[postId]", `/posts/${comment.post.id}`),
        setComment("");
    },
  });

  const deleteComment = async (commentId) => {
    const postId = post.id;
    axios
      .delete(`/api/comments/id/${commentId}`, {
        data: {
          postId,
        },
      })
      .then((res) => {
        Router.push("/posts/[postId]", `/posts/${postId}`);
      })
      .catch((err) => {
        alert("An error occurred. Click ok to refresh page");
        window.location.reload(true);
      });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    await sendRequest();
  };

  const comments = post.comment;
  const commentsArray = comments.map((eachComment) => {
    return (
      <div key={eachComment.id}>
        <p>
          {eachComment.comment}
          <br />

          <button
            onClick={() => deleteComment(eachComment.id)}
            type="button"
            className={styles.custom_button}
          >
            Delete Comment
          </button>
        </p>
      </div>
    );
  });

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <p className={styles.description}>{post.post} </p>

        <Link
          href="/posts/edit-post/[postId]"
          as={`/posts/edit-post/${post.id}`}
        >
          <a className={styles.button}>Edit Post</a>
        </Link>
      </div>

      <div style={{ margin: "2rem 0rem 0rem 0rem" }}>
        <form className="form-inline" onSubmit={handleSubmit}>
          <div className="input-group mb-3">
            <input
              className="form-control"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              type="comment"
              id="comment"
              name="comment"
              placeholder="Share your thoughts here..."
            />
            <div className="input-group-append">
              <button className="btn btn-primary" type="submit">
                Submit
              </button>
            </div>
          </div>

          {error?.map((e) => e?.field === "comment") && (
            <MsgErrors error={error} field="comment" />
          )}
        </form>
        {comments?.length < 1 ? (
          <div className={styles.comment}>No comments yet...</div>
        ) : (
          <div className={styles.comment}>{commentsArray}</div>
        )}
      </div>
    </div>
  );
};

GetPost.getInitialProps = async (context, backendClient, loggedInUser) => {
  const { postId } = context.query;
  const { data } = await backendClient.get(`/api/posthub/${postId}`);
  return { post: data };
};

export default GetPost;
