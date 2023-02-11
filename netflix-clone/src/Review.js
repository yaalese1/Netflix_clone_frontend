import React from "react";
import { useEffect, useState } from "react";
import ReviewLikes from "./ReviewLikes";
import moment from "moment";
import "./Review.css";

function Reviews({ movieId, category }) {
  const [comment, setComment] = useState([]);
  const [showComments, setShowComments] = useState(false);
  const [likes, setLikes] = useState(0);

  console.log(movieId);

  const getName = category.split("/").pop().slice(0, -9) + "_id";
  // debugger;
  console.log(getName);
  useEffect(() => {
    fetch(`http://localhost:9292${category}`)
      .then((resp) => resp.json())
      .then((data) => setComment(data));
    setShowComments(!showComments);
  }, []);

  console.log(comment);
  let commentFilter;
  if (getName === "netflix_original_id") {
    commentFilter = comment.filter((x) => x.netflix_original_id === movieId);
  } else if (getName === "trending_id") {
    commentFilter = comment.filter((x) => x.trending_id === movieId);
  }



  function handleUpdate(updatedComment) {
    const updated = comment.filter((x) =>
      x.id === updatedComment.id ? updatedComment : x
    );
    setComment(updated);
  }

  return (
    <div className="shadow" style={{ backgroundColor: "white" }}>
      {/* <button onClick={handleReviews}>see more</button> */}
      <h2 className="centerText">Comments</h2>
      <hr
        style={{
          height: "5px",
          color: "black",
          backgroundColor: "black",
          width: "50%",
          marginLeft: "25%",
          marginRight: "25% !important",
        }}
      ></hr>
      <br />

      {commentFilter.length == 0 ? (
        <h4 className="centerText">No comments on this yet!! </h4>
      ) : (
        commentFilter.map((x) => {
          return (
            <div className="shadow">
              <p className="centerText" key={x.id}>
                <h5>Anonymous-</h5> <i>{x.comment}</i>
              </p>
              <h5 className="centerText">
                {moment(x.created_at).format("MMMM Do YYYY")}{" "}
              </h5>
              <ReviewLikes
                comment={x}
                onUpdate={handleUpdate}
                category={category}
                handleDeleteComment={""}
              />
            </div>
          );
        })
      )}
    </div>
  );
}

export default Reviews;