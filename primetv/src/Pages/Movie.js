import { useState, useEffect } from "react";
import Genres from "../Components/Genres";
import MovieCard from "../Components/MovieCard";
import Pagination from "../Components/Pagination";
import useGenre from "../hooks/useGenre";

function Movie(props) {
  const [data, setData] = useState([]);
  const [totalPage, setTotalPage] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [genres, setGenres] = useState([]);
  const [selectedGenres, setSelectedGenres] = useState([]);

  const genreURL = useGenre(selectedGenres);

  const getApiData = async (props) => {
    const apiData = await fetch(
      `https://api.themoviedb.org/3/discover/${props.category}?api_key=${process.env.REACT_APP_APIKEY}&page=${currentPage}&with_genres=${genreURL}`
    );
    const dataList = await apiData.json();
    setData(dataList.results);
    console.log(data);
    setTotalPage(dataList.total_pages >= 25 ? 25 : dataList.total_pages);
  };

  useEffect(() => {
    window.scroll(0,0)
    getApiData(props);
  }, [currentPage, genres]);

  return (
    <>
      <Genres
        type="movie"
        selectedGenres={selectedGenres}
        setSelectedGenres={setSelectedGenres}
        genres={genres}
        setGenres={setGenres}
        setCurrentPage={setCurrentPage}
      />

      <div className="flex justify-evenly flex-wrap gap-2 gap-y-4 pl-4 py-5 ">
        {data.map((item) => (
          <MovieCard item={item} key={item.id} category={props.category}/>
        ))}
      </div>

      <div>
       { totalPage >1 && 
       <Pagination
          totalPage={totalPage}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />}
        
      </div>
    </>
  );
}

export default Movie;
