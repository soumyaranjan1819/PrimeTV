import { Link } from "react-router-dom";
import { GrYoutube } from "react-icons/gr";
import { BsFillStarFill, BsInfoCircleFill } from "react-icons/bs";
import logo from "../../Images/prime-video-logo.png";
import { useEffect, useState } from "react";

function BannerCards({ item }) {
  const [video, setVideo] = useState();
  const [isLoading, setIsLoading] = useState(true);

  const fetchVideo = async () => {
    const getApiData = await fetch(
      `https://api.themoviedb.org/3/${item.media_type}/${item.id}/videos?api_key=${process.env.REACT_APP_APIKEY}&language=en-US`
    );
    const videoKey = await getApiData.json();
    setVideo(videoKey.results[videoKey.results.length - 1]?.key);
  };

  useEffect(() => {
    fetchVideo({ item });
    setTimeout(() => {
      setIsLoading(false);
    }, 500);
  }, []);

  return (
    <>
      {isLoading ? (
        <div className="bg-gray-500 min-w-[100vw] h-[70vh]"></div>
      ) : (
        <div className="static font-serif" key={item.id}>
          {/* #115696 */}
          <div className="relative w-[100%] hidden sm:block">
            <div className="absolute w-[100%] h-[100%] bg-[#000]"></div>
            <div className="relative w-[70%] ml-auto ">
              <div className="absolute w-[100%] h-[100%] bg-gradient-to-r from-[#000] to-[#00000020] "></div>
              <img
                className=" min-w-[100%]"
                src={`https://image.tmdb.org/t/p/original/${item?.backdrop_path}`}
                alt={item.title || item.name}
              />
            </div>

            <div className="absolute left-[50%] bottom-[7.5%] sm:bottom-[20%]">
              <p className=" text-white font-semibold text-2xl sm:text-3xl  lg:text-5xl overflow-visible tracking-wide">
                {item.title || item.name}
              </p>
              <div className="flex items-center justify-center gap-6 sm:gap-9 lg:gap-12 mt-3 lg:mt-6 font-sans">
                <a
                  className=" cursor-pointer flex gap-2 items-center"
                  target="__blank"
                  href={`https://www.youtube.com/watch?v=${video}`}
                >
                  {/* <img className="sm:h-7 lg:h-8" src={playButton} alt="" /> */}
                  <GrYoutube className="text-red-600 text-xl sm:text-2xl lg:text-3xl" />
                  <span className="text-white font-medium text-base sm:text-xl lg:text-xl">
                    Watch Now
                  </span>
                </a>
                <p className="flex items-center gap-2 text-[#d4af37] text-lg sm:text-xl lg:text-2xl  font-semibold">
                  <BsFillStarFill />
                  <span>{Math.round(item.vote_average * 10) / 10}</span>
                </p>
                <Link
                  className="text-sky-100 sm:text-xl lg:text-2xl font-bold cursor-pointer"
                  to={`/${item.media_type}/${item.id}`}
                >
                  <BsInfoCircleFill />
                </Link>
              </div>
            </div>

            <div className="absolute left-[5%] top-[37%] flex items-center gap-2 sm:gap-3 lg:gap-4">
              <img src={logo} alt="logo" className="h-7 sm:h-10 lg:h-14 mt-6" />
              <p className="flex items-center text-sky-500 font-sans font-medium text-[16px] sm:text-[20px] lg:font-semibold lg:text-[30px] ">
                <span className="">|</span>
                <span className="mx-3 tracking-wider">STORE</span>
              </p>
            </div>

            <div className="absolute left-[5%] bottom-[20%] ml-2 md:ml-4 lg:ml-6 bg-gradient-to-r from-yellow-600 to-yellow-200 font-sans text-sm sm:text-base lg:text-xl font-bold px-4 sm:px-5 md:px-6 lg:px-8 py-0.5 md:py-1 cursor-pointer">
              RENT NOW @ 199/-
            </div>
          </div>

          {/* mob view */}
          <div className="relative w-[100%] sm:hidden block">
            <div className="relative w-[100%] h-auto">
              <div className="absolute w-[100%] h-[100%] bg-gradient-to-r from-[#00000050] to-[#00000050] "></div>
              <img
                className="w-[100%]"
                src={`https://image.tmdb.org/t/p/original/${item?.poster_path}`}
                alt={item.title || item.name}
              />
            </div>

            <div className="absolute left-[50%] bottom-[50%] translate-x-[-50%]">
              <a
                className=" cursor-pointer flex gap-3 items-center"
                target="__blank"
                href={`https://www.youtube.com/watch?v=${video}`}
              >
                <GrYoutube className="text-red-700 text-7xl" />
              </a>
            </div>

            <div className="absolute top-[50%] w-[100%] flex justify-center gap-2">
              <div className="flex gap-3 items-center">
                <img src={logo} alt="logo" className=" h-10 mt-6" />
                <p className="flex items-center text-sky-500 font-sans font-bold text-[20px] ">
                  <span className="">|</span>
                  <span className="mx-3 tracking-wider">STORE</span>
                </p>
              </div>
            </div>
            <div className="flex justify-center w-[100%]">
              <div className="absolute top-[65%]  flex justify-center bg-gradient-to-r from-yellow-600 to-yellow-200 font-sans text-base font-bold px-6 py-1 cursor-pointer">
                <span>RENT NOW @ 199/-</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
export default BannerCards;
