import Router from "next/router";
import { useState } from "react";

import { useRequest } from "../../../helpers/use-request";
import MsgErrors from "../../../helpers/nonValidationErr";


const EditPost = ({ postToEdit }) => {
  const [post, setUpdatedPost] = useState("");

  const { sendRequest, error } = useRequest({
    url: `/api/posts/${postToEdit.id}`,
    method: "put",
    data: {
      post,
    },
    onSuccess: (result) => Router.push("/posts/[postId]", `/posts/${result.id}`),
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
              defaultValue={postToEdit.post}
              onChange={(e) => setUpdatedPost(e.target.value)}
              type="post"
              id="post"
              name="post"
              rows={8}
            />
              <button className="btn btn-primary" type="submit">
                Submit
              </button>
          </div>

          {error?.map((e) => e?.field === "post") && (
            <MsgErrors error={error} field="post" />
          )}
        </form>
      </div>
    </div>
  );
}


EditPost.getInitialProps = async (context, backendClient, loggedInUser) => {
  const { postId } = context.query;
  const {data} = await backendClient.get(`/api/posthub/${postId}`);
  return { postToEdit: data };
}

export default EditPost;

