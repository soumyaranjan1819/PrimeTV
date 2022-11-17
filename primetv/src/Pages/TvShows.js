import { useState, useEffect } from "react";
import Genres from "../Components/Genres";
import MovieCard from "../Components/MovieCard";
import Pagination from "../Components/Pagination";
import useGenre from "../hooks/useGenre";

function Movie(props) {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [genres, setGenres] = useState([]);
  const [selectedGenres, setSelectedGenres] = useState([]);

  const genreURL = useGenre(selectedGenres);

  const getApiData = async () => {
    const apiData = await fetch(
      `https://api.themoviedb.org/3/discover/${props.category}?api_key=${process.env.REACT_APP_APIKEY}&language=en-US&page=1&query=all&page=${currentPage}&with_genres=${genreURL}`
    );
    const dataList = await apiData.json();
    setData(dataList.results);
    console.log(data);
  };
  useEffect(() => {
    getApiData();
  }, [currentPage, genres]);

  return (
    <>
      <Genres
        type="tv"
        selectedGenres={selectedGenres}
        setSelectedGenres={setSelectedGenres}
        genres={genres}
        setGenres={setGenres}
        setCurrentPage={setCurrentPage}
      />

      <div className="flex justify-evenly flex-wrap gap-2 gap-y-4 pl-4 py-5">
        {data.map((item) => (
          <MovieCard item={item} key={item.id} category={props.category}/>
        ))}
      </div>

      <div>
        <Pagination
          totalPage={25}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      </div>
    </>
  );
}

export default Movie;
