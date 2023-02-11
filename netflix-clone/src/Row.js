import React, { useState, useEffect } from "react";
import movieTrailer from "movie-trailer";
import { Link } from "react-router-dom";
import Comments from "./Comments";
import ReviewLikes from "./ReviewLikes";
import YouTube from "react-youtube";
import "./Row.css";

function Row({ title, fetchUrl, isLargeRow, categoryLink, categoryComment }) {
  const [movies, setMovies] = useState([]);
  const [movieClick, setMovieClick] = useState(false);
  const [movieId, setMovieId] = useState(0);
  const [displayComments, setDisplayComments] = useState(false);
  const [trailerUrl, setTrailerUrl] = useState("");
  const [comments, setComments] = useState([]);
  const [displayMovieDetails, setDisplayMovieDetails] = useState(false);

  useEffect(() => {
    fetch(`${fetchUrl}`)
      .then((resp) => resp.json())
      .then((data) => setMovies(data));
  }, [fetchUrl]);

  const opts = {
    height: "390",
    width: "100%",
    playerVars: {
      autoplay: 1,
    },
  };

  function handleAddComment(comment) {
    // debugger;
    setComments([...comments, comment]);
  }
  const baseImageUrl = "https://image.tmdb.org/t/p/original/";

  function handleClick(moviename) {
    if (trailerUrl) {
      setTrailerUrl("");
    } else {
      movieTrailer(moviename || "")
        .then((url) => {
          const urlParams = new URLSearchParams(new URL(url).search);
          setTrailerUrl(urlParams.get("v"));
        })
        .catch(() => alert(" Sorry, No trailer found for this movie"));
    }
    setDisplayComments(false);
  }

  function handleReview(id) {
    movieId === id && setDisplayComments(!displayComments);
  }
  function handleImageClick(movie_id) {
    setMovieId(movie_id);
    setMovieClick(!movieClick);
  }

  function viewComments() {
    fetch(`http://localhost:9292/${categoryComment}`)
      .then((resp) => resp.json())
      .then((data) => {
        setComments(data);
        console.log(data);
      });
    setDisplayMovieDetails(!displayMovieDetails);
  }

 

  // console.log(getMovie)
  return (
    <div>
      <div className="row">
        <h2>{title}</h2>

        <div className="row__posters">
          {movies.map((movie) => (
            <>
              <img
                key={movie.id}
                className={`row__poster ${isLargeRow && "row__posterLarge"}`}
                src={`${baseImageUrl}${
                  isLargeRow ? movie.poster_path : movie.backdrop_path
                }`}
                alt={movie.name}
                onClick={() => handleImageClick(movie.id)}
              />
              {movieId === movie.id && movieClick && (
                <>
                  <button
                    className="mov__button"
                    onClick={() =>
                      handleClick(
                        movie?.original_name || movie?.title || movie?.name
                      )
                    }
                  >{`Play ${
                    movie?.original_name || movie?.title || movie?.name
                  } Trailer`}</button>
                  <button
                    className="mov__button"
                    onClick={() => handleReview(movie.id)}
                  >
                    Leave Review
                  </button>
                  {displayComments && movie.id === movieId && (
                    <Comments
                      comments={comments}
                      handleAddComment={handleAddComment}
                      categoryComment={categoryComment}
                      style={{ marginTop: "10rem" }}
                      mov_id={movieId}
                    />
                  )}
                  <Link
                    to={`${categoryLink}/${movie.id}`}
                    href={`${categoryLink}/${movie.id}`}
                    className="mov__button"
                    style={{ textDecoration: "none", paddingTop: "1rem" }}
                    onClick={viewComments}
                  >
                    View movie Details and Reviews
                  </Link>{" "}
                </>
              )}
            </>
          ))}
        </div>
        {trailerUrl && <YouTube videoId={trailerUrl} opts={opts} />}
      </div>
    
      //massive error whe review likes is un commented back in .
    </div>
  );
}

export default Row;