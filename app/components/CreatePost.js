import Axios from "axios";
import React, { useEffect, useState, useContext } from "react";
import Page from "./Page";
import { withRouter } from "react-router-dom";
import DispatchContext from "../DispatchContext";
import StateContext from "../StateContext";

function CreatePost(props) {
  const [title, setTitle] = useState();
  const [body, setBody] = useState();
  const appDispatch = useContext(DispatchContext);
  const appState = useContext(StateContext);

  async function handleSubmit(e) {
    e.preventDefault();
    try {
        console.log("in create post method");
      const response = await Axios.post("/create-post", { title, body, token: appState.user.token });
      // redirect to new post created url
      appDispatch({ type: "flashMessage", value: "post created" });
      props.history.push(`/post/${response.data}`);
      console.log("new post created");
    } catch (e) {
      console.log("problem occured");
    }
  }
  return (
    <Page title="create new post">
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="post-title" className="text-muted mb-1">
            <small>Title</small>
          </label>
          <input onChange={(e) => setTitle(e.target.value)} autoFocus name="title" id="post-title" className="form-control form-control-lg form-control-title" type="text" placeholder="" autoComplete="off" />
        </div>

        <div className="form-group">
          <label htmlFor="post-body" className="text-muted mb-1 d-block">
            <small>Body Content</small>
          </label>
          <textarea onChange={(e) => setBody(e.target.value)} name="body" id="post-body" className="body-content tall-textarea form-control" type="text"></textarea>
        </div>

        <button className="btn btn-primary">Save New Post</button>
      </form>
    </Page>
  );
}

export default withRouter(CreatePost);
