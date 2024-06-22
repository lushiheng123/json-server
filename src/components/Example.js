import { useState, useReducer } from "react";
import { postReducer, INITIAL_STATE } from "./postReducer";
export default function Example() {
  const [state, dispatch] = useReducer(postReducer, INITIAL_STATE);
  const handleFetch = () => {
    dispatch({ type: "FETCH_START" });

    fetch("http://localhost:3500/posts/1")
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        dispatch({ type: "FETCH_SUCCESS", payload: data });
        console.log(data);
      })
      .catch((err) => {
        dispatch({ type: "FETCH_ERROR" });
      });
  };

  return (
    <div>
      <button onClick={handleFetch}>
        {state.loading ? "wait...." : "Fetch the post"}
      </button>
      <p>{state.post?.title}</p>
      <div>{state.post?.body}</div>
      <span>{state.error && "Something went wrong!"}</span>
    </div>
  );
}
