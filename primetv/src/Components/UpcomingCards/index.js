import React, { useState, useEffect } from "react";
import { BsFillPlayFill } from "react-icons/bs";

function UpcomingCard({ item }) {
  const [video, setVideo] = useState();
  const [visible, setVisible] = useState(false);

  const fetchVideo = async () => {
    const getApiData = await fetch(
      `https://api.themoviedb.org/3/movie/${item.id}/videos?api_key=${process.env.REACT_APP_APIKEY}&language=en-US`
    );
    const videoKey = await getApiData.json();
    setVideo(videoKey.results[videoKey.results.length - 1]?.key);
  };

  useEffect(() => {
    fetchVideo({ item });
  }, []);

  return (
    <li
      className="relative flex justify-center min-w-[20rem] max-w-[20rem] mr-4 my-2 list-none cursor-pointer"
      key={item.id}
      onMouseEnter={()=>setVisible(!visible)}
      onMouseLeave={()=>setVisible(!visible)}
    >
      <div className="absolute w-[100%] h-[100%] bg-[#00000050] rounded-md"></div>
      <img
        className=" rounded-md"
        src={`https://image.tmdb.org/t/p/w500/${item.backdrop_path}`}
        alt={item.title || item.name}
      />
      {visible && <a
        className="absolute top-[50%] translate-x-[-50%] translate-y-[-50%] left-[50%] text-7xl text-sky-700 "
        target="__blank"
        href={`https://www.youtube.com/watch?v=${video}`}
      >
        <BsFillPlayFill />
      </a>}
      <p className="absolute bottom-[2%] text-xl font-bold text-gray-200 uppercase">
        {item.original_title}
      </p>
    </li>
  );
}

export default UpcomingCard;
