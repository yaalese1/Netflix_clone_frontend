import React, { useState, useEffect } from 'react'
import "./Banner.css"
function Banner({ fetchUrl }) {
    const [movie, setMovie] = useState([])
    // const baseURL = "https://api.themoviedb.org/3"
    useEffect(() => {
        fetch(`${fetchUrl}`)
            .then(resp => resp.json())
            .then(data => setMovie(() => {
                return data[Math.floor(Math.random() * data.length - 1)]
            }))
    }, [fetchUrl])
    // console.log(movie)
    function truncateString(str, num) {
        if (str?.length > num) {
            let subStr = str.substring(0, num);
            return subStr + "...";
        } else {
            return str;
        }
    }
    return (
        <header className="banner"
            style={{
                backgroundSize: "cover",
                backgroundImage: `url("https://image.tmdb.org/t/p/original/${movie?.backdrop_path}")`,
                backgroundPosition: "center center",
            }}>
            <div className="banner__contents">
                <h1 className="banner__title">{movie?.title || movie?.name || movie?.original_name}</h1>
                {/* <div className="banner__buttons">
                    <button className="banner__button">Play</button>
                    <button className="banner__button">My List</button>
                </div> */}
                <h1 className="banner__description">{truncateString(movie?.overview, 150)}</h1>
            </div>
            <div className="banner--fadeBottom"></div>
        </header>
    )
}

export default Banner;