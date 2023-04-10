import { useRequest } from "../../helpers/use-request";
import ConErrors from "../../helpers/conditionalErr";

import Router from "next/router";
import { useState } from "react";

export default function CreatePost() {
  const [post, setPost] = useState("");

  const { sendRequest, error } = useRequest({
    url: "/api/posts",
    method: "post",
    data: {
      post,
    },
    onSuccess: () => Router.push("/"),
  });

  const handleSubmit = async (event) => {
    event.preventDefault();
    await sendRequest();
  };

  return (
    <div className="container">

      <div style={{ margin: "2rem 0rem 0rem 0rem" }}>
        <form className="form-inline" onSubmit={handleSubmit}>
          <div className="input-group mb-3">
            <textarea
              className="form-control"
              value={post}
              onChange={(e) => setPost(e.target.value)}
              type="post"
              id="post"
              name="post"
              placeholder="Start a discussion here..."
            />
              <button className="btn btn-primary" type="submit">
                Submit
              </button>
          </div>

          {error?.map((e) => e?.field === "post") && (
            <ConErrors error={error} field="post" />
          )}
        </form>
      </div>
    </div>
  );
}
