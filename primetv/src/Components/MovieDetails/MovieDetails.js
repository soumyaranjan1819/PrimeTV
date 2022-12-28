import React, { useEffect, useState } from "react";
import { GrYoutube } from "react-icons/gr";
import { useParams } from "react-router-dom";
import MovieCard from "../MovieCard";
import Slidder from "../Slidder";

const MovieDetails = () => {
  const [currentMovieDetail, setMovie] = useState();
  const [video, setVideo] = useState();
  const [recomendation, setRecomendation] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const { type, id } = useParams();

  const getData = () => {
    fetch(
      `https://api.themoviedb.org/3/${type}/${id}?api_key=4e44d9029b1270a757cddc766a1bcb63&language=en-US`
    )
      .then((res) => res.json())
      .then((data) => setMovie(data));
  };

  const fetchMovie = async () => {
    const apiData = await fetch(
      `https://api.themoviedb.org/3/${type}/${id}/videos?api_key=${process.env.REACT_APP_APIKEY}&language=en-US`
    );
    const videoData = await apiData.json();
    setVideo(videoData.results[videoData.results.length - 1]?.key);
  };

  const fetchRecomendation = async () => {
    const fetchApi = await fetch(
      `https://api.themoviedb.org/3/${type}/${id}/recommendations?api_key=${process.env.REACT_APP_APIKEY}&language=en-US`
    );
    const apiData = await fetchApi.json();
    setRecomendation(apiData.results);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    getData();
    fetchMovie();
    fetchRecomendation();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  }, [type, id]);

  // console.log(currentMovieDetail);
  return (
    <div className=" overflow-x-visible">
      <div className="w-[100%] relative flex flex-col items-center text-white overflow-hidden">
        {isLoading ? (
          <div className="w-[100vw] h-[100vh] object-cover bg-black"></div>
        ) : (
          <div>
            <div className="absolute w-[100vw] h-[100vh] bg-gradient-to-r from-[rgba(0,0,0)] to-[rgba(0,0,0,0.6)] "></div>
            <img
              className="w-[100vw] h-[100vh] object-cover"
              src={`https://image.tmdb.org/t/p/original${
                currentMovieDetail ? currentMovieDetail.backdrop_path : ""
              }`}
            />
          </div>
        )}
        <div className="flex flex-col md:flex-row items-center gap-10 w-[90%] absolute top-[20%] movie_details">
          {isLoading ? (
            <div className="w-[500px] h-[70vh] bg-gray-400 rounded-md"></div>
          ) : (
            <div className="ml-2 min-w-[300px] max-w-[300px] rounded-md movie_Poster">
              <img
                src={`https://image.tmdb.org/t/p/original${
                  currentMovieDetail ? currentMovieDetail.poster_path : ""
                }`}
              />
            </div>
          )}

          <div className="flex flex-col h-auto justify-between">
            <div className="overflow-visible mb-5">
              <span className="text-3xl sm:text-4xl lg:text-5xl font-semibold overflow-visible">
                {currentMovieDetail
                  ? currentMovieDetail.original_title ||
                    currentMovieDetail.original_name
                  : ""}
              </span>
              <br />
              <br />
              <span className="text-xl mb-10 font-medium text-gray-300 capitalize ">
                {currentMovieDetail ? currentMovieDetail.tagline : ""}
              </span>
            </div>

            <div className="flex flex-col gap-4 mb-2 text-lg font-medium font-serif  sm:font-semibold md:gap-6 md:text-xl md:flex-row lg:gap-10 lg:mb-3">
              <span>
                {currentMovieDetail
                  ? `IMDb ${
                      Math.round(currentMovieDetail.vote_average * 10) / 10
                    }`
                  : ""}
              </span>
              {type === "movie" ? (
                <span>
                  {currentMovieDetail
                    ? `${Math.floor(currentMovieDetail.runtime / 60)} h 
            ${currentMovieDetail.runtime % 60} mins`
                    : ""}
                </span>
              ) : (
                ""
              )}
              <span>
                {currentMovieDetail
                  ? currentMovieDetail.adult
                    ? "A"
                    : "U/A"
                  : ""}
              </span>
            </div>
            <div className=" hidden md:block text-lg font-light tracking-wide mb-5">
              {currentMovieDetail && currentMovieDetail.overview
                ? currentMovieDetail.overview
                : ""}
            </div>

            <div className=" text-base flex flex-col gap-2 font-medium md:text-lg md:font-semibold lg:text-lg lg:font-bold">
              <span>
                <span className="mr-2">Release date :</span>
                {currentMovieDetail?.release_date ||
                  currentMovieDetail?.first_air_date}
              </span>
              <span>
                <span className="mr-2">Genres : </span>
                {currentMovieDetail && currentMovieDetail.genres
                  ? currentMovieDetail.genres.map((genre, index) => (
                      <span id={genre.id}>
                        {genre.name}
                        {index !== currentMovieDetail.genres.length - 1
                          ? ", "
                          : ""}
                      </span>
                    ))
                  : ""}
              </span>
              <span>
                <span className="mr-2 mb-10">Audio languages : </span>
                {currentMovieDetail && currentMovieDetail.spoken_languages
                  ? currentMovieDetail.spoken_languages.map(
                      (language, index) => (
                        <span id={language.id}>
                          {`${language.name}
                      ${
                        index !== currentMovieDetail.spoken_languages.length - 1
                          ? ", "
                          : ""
                      }`}
                        </span>
                      )
                    )
                  : ""}
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-center w-[100vw] ">
        <a
          className="flex gap-2 mt-7 mb-7 py-1 text-white text-xl font-semibold cursor-pointer sm:text-3xl md:gap-3 md:mt-10 md:mb-10 lg:text-4xl"
          target="__blank"
          href={`https://www.youtube.com/watch?v=${video}`}
        >
          <GrYoutube className="text-red-600 text-2xl sm:text-4xl lg:text-5xl" />
          Watch Trailer
        </a>
      </div>
      <div className="flex flex-wrap gap-4 justify-center ">
        {recomendation && (
          <Slidder
            class="mdr"
            tag="Similar Results"
            dataSet={recomendation}
            category={type}
          />
        )}
      </div>
    </div>
  );
};

export default MovieDetails;
