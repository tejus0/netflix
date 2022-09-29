import axios from "./axios";
import React, { useState, useEffect } from "react";
import "./Row.css";
import Youtube from "react-youtube";
import movieTrailer from "movie-trailer";

const baseURL = "https://image.tmdb.org/t/p/original"; //not the base url in axios.js

function Row({ title, fetchUrl, isLargeRow }) {
  const [movies, setmovies] = useState([]);
  const [trailerUrl, setTrailerUrl] = useState("");

  // A snippet of code which runs based on a specific condition/variable
  useEffect(() => {
    //if [] , run once when the row loads , and don't run again
    async function fetchData() {
      const request = await axios.get(fetchUrl);
      // console.log(request);
      setmovies(request.data.results);
      return request;
    }
    fetchData();
  }, [fetchUrl]);
  // console.table = makes table form of array data .
  // console.log(movies);
  const opts = {
    height: "390",
    width: "100%",
    playerVars: {
      autoplay: 1,
    },
  };

  const handleClick = (movie) => {
    if (trailerUrl) {
      setTrailerUrl("");
    } else {
      movieTrailer(movie?.name || "")
        .then((url) => {
          const urlParams = new URLSearchParams(new URL(url).search);
          setTrailerUrl(urlParams.get("v"));
        })
        .catch((error) => console.log(error));
    }
  };

  return (
    <div className="row">
      <div>{title}</div>

      <div className="row_posters">
        {movies.map(
          (
            movie // doubt
          ) => (
            <img
              key={movie.id}
              onClick={() => handleClick(movie)}
              className={`row_poster ${isLargeRow && "row_posterLarge"}`} // doubt
              src={`${baseURL}${
                isLargeRow ? movie.poster_path : movie.backdrop_path
              }`}
              alt={movie.name}
            />
          )
        )}
      </div>
      {trailerUrl && <Youtube videoId={trailerUrl} opts={opts} />}
    </div>
  );
}

export default Row;
