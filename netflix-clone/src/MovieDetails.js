import React, { useState, useEffect } from 'react'
import Reviews from './Reviews';
import './Review.css'

function MovieDetails({ category }) {
    console.log(category)

    const getPath = window.location.pathname
    const getPathId = parseInt(getPath.split("/").pop())


    // debugger
    console.log(getPath)
    const [getMovie, setGetMovie] = useState([])
    // console.log(window.location.pathname)
    useEffect(() => {
        fetch(`http://localhost:9292${getPath}`)
            .then(resp => resp.json())
            .then(data => setGetMovie(data))
    }, [])


    // const { id } = useParams()
    // console.log(id);
    // console.log(props.location)
    const baseImageUrl = "https://image.tmdb.org/t/p/original/"
    return (
        <div style={{ backgroundColor: "black" }}>
            <div className="shadow" style={{ marginTop: "3rem", backgroundColor: "white", position: "relative" }}>
                <h1 className="centerText">{getMovie?.name || getMovie?.title || getMovie?.original_name}</h1>
                <img className="center" src={`${baseImageUrl}${getMovie.poster_path}`} alt="poster" ></img>

                <br />
                <p className="centerText"> <h3>About {getMovie?.name || getMovie?.title || getMovie?.original_name}</h3>{getMovie.overview}</p>
                <br />
                <img className="center" src={`${baseImageUrl}${getMovie.backdrop_path}`} alt="poster" ></img>
            </div>
            <div>
                <Reviews movieId={getPathId} category={category} />
            </div>
        </div>
    )
}

export default MovieDetails