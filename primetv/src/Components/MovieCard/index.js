import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import dummyImg from "../../Images/dummy-img2.jpg";

function MovieCard({ item, category }) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
  setTimeout(() => {
        setIsLoading(false)
    }, 800)
}, []) 
  return (
    <>
      {isLoading ? (
        <div className=" bg-gray-600 h-[240px] min-w-[10rem] rounded-md">
        </div>
      ) : (
        <Link
          className="relative min-w-[10rem] max-w-[10rem] list-none cursor-pointer"
          key={item.id}
          to={`/${category}/${item.id}`}
        >
          {item?.poster_path ? (
            <img
              className="h-[239px] object-center rounded-md border border-cyan-50"
              src={`https://image.tmdb.org/t/p/w500/${item.poster_path}`}
              alt={item.title || item.name}
            />
          ) : (
            <img
              className="bg-white h-[239px] rounded-md border border-cyan-50"
              src={dummyImg}
              alt={item.title || item.name}
            />
          )}
          <img
            className="absolute top-0 left-0 "
            src="https://m.media-amazon.com/images/G/01/digital/video/web/cues/v3/prime.svg"
            alt="Included With Prime"
          />
        </Link>
      )}
    </>
  );
}

export default MovieCard;

{
  /* <span className='absolute top-0 left-0 px-1.5 pb-1 rounded-r-2xl border-[3px] border-black border-l-0 bg-yellow-500 font-bold text-sm '>prime</span> */
}
