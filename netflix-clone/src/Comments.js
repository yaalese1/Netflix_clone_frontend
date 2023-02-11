import React, { useState } from 'react'

function Comments({ categoryComment, mov_id, handleAddComment ,comments}) {
 
    console.log(handleAddComment)
    const [newComment, setNewComment] = useState("")
    console.log(newComment)
    console.log(categoryComment);
    function handleSubmit(e) {
        // debugger;
        e.preventDefault();
        fetch(`http://localhost:9292/${categoryComment}`, {
            method: "post",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify({
                comment: newComment,
                likes: 0,
                mov_id: mov_id
            })
        }).then(resp => resp.json())
            .then(addcomment => {
                handleAddComment(addcomment)
                console.log(addcomment)
                e.target.reset();
            })
        setNewComment(" ");
        
    }
    
       
    
    return (
        <div>
            
            <form onSubmit={handleSubmit}>
                <input type="text" name="comment" onChange={(e) => setNewComment(e.target.value)}></input>
                <button type="submit">click Submit</button>
            </form>
        </div>
    )
}

export default Comments