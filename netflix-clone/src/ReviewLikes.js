import React, { useState } from 'react'
import './Review.css'

function ReviewLikes({ comment, onUpdate, category }) {
    const [likes, setLikes] = useState(comment.likes)

    function handleLikes(comment) {
        fetch(`http://localhost:9292${category}/${comment.id}`, {
            method: "PATCH",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify({
                likes: comment.likes + 1
            })
        }).then(resp => resp.json())
            .then(updatedObj => onUpdate(updatedObj))
        setLikes(() => comment.likes + 1)
    }

      function handleDeleteComment(){
        fetch(`http://localhost:9292${category}/${comment.id}`, {
            method: "delete"})
            
           
          
      }
    return (
        <div className="centerText">
            <h5 className="centerText" style={{ color: "#E50914" }}>{likes} Popcorn Rating</h5>
            <button style={{ borderRadius: "90%", backgroundColor: "#E50914", color: "white" }} onClick={() => handleLikes(comment)}>🍿</button>
            <hr style={{ height: "5px", color: "black", backgroundColor: "black", width: "50%", marginLeft: "25%", marginRight: "25% !important" }}></hr>
            <br />
            <button onClick={handleDeleteComment}>❌</button>
        
        </div>
    )
}

export default ReviewLikes