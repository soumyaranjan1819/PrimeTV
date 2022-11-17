import React from "react";
import { useEffect, useState } from "react";
import { BsSearch } from "react-icons/bs";
import MovieCard from "../Components/MovieCard";

function Search() {
  const [type, setType] = useState(0);
  const [totalPage, setTotalPage] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [query, setQuery] = useState('')
  const [data, setData] = useState([]);
  const [errors, setErrors] = useState([]);

  const fetchData = async () => {
    const apiData = await fetch(
      `https://api.themoviedb.org/3/search/${type?'tv':'movie'}?api_key=${process.env.REACT_APP_APIKEY}&page=${currentPage}&query=${query}`
    );
    const dataList = await apiData.json();
    setData(dataList.results);
    setTotalPage(dataList.total_pages)
    dataList?.errors ? setErrors(dataList.errors) : setErrors('')
    console.log(dataList.results)
    // console.log(errors)
  };
  useEffect(() => {
    window.scroll(0, 0);
    fetchData();
  }, [currentPage, type]);

  const movieBtn = type ? `bg-white` : "bg-sky-500";
  const tvBtn = type ? "bg-sky-500" : `bg-white`;

  return (
    <div className="mt-24 flex flex-col justify-evenly items-center gap-5">
      <div className="flex gap-4">
        <input
          type="search"
          placeholder="Search..."
          autoFocus
          required
          className="w-[80vw] sm:w-[50vw] outline-none ml-2 px-2 py-1.5 sm:py-2.5  rounded text-xl font-medium bg-gray-700 text-white transition-all duration-500"
          onChange={(e) => setQuery(e.target.value)}
        />
        <span className="px-2 py-1.5 sm:py-2.5  rounded text-xl font-medium bg-gray-700 text-white cursor-pointer"
        onClick={()=>{fetchData()}}>
          <BsSearch color="white" size="22px" />
        </span>
      </div>
      <div className="text-black flex gap-6">
        <button
          className={`text-black ${movieBtn} px-8 py-2 rounded-md font-medium`}
          onClick={() => {
            setType(0);
          }}
        >
          Movies
        </button>
        <button
          className={`text-black ${tvBtn} px-8 py-2 rounded-md font-medium`}
          onClick={() => {
            setType(1);
          }}
        >
          TV Series
        </button>
      </div>

      {!query && <p className="w-[90vw] sm:w-[50vw] text-xl sm:text-4xl mt-10 font-medium p-4 text-center text-yellow-400 border-[2px] border-yellow-400">
        Search your favorite Movie or TV Series
      </p>}

      <div className="flex justify-evenly flex-wrap gap-2 gap-y-4 pl-4 py-5 ">
        {data && query && data.map((item) => (
          <MovieCard item={item} key={item.id} category={type?'tv':'movie'} />
        ))}
      </div>

      {!totalPage && query && <p className="w-[90vw] sm:w-[50vw] text-xl sm:text-4xl mt-10 font-medium p-4 text-center text-yellow-400 border-[2px] border-yellow-400">
        No results found 
      </p>}

    </div>
  );
}

export default Search;
