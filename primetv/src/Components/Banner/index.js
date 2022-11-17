import { useState, useEffect } from "react";
import BannerCards from "../BannerCards";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";
import { GiPlainCircle } from "react-icons/gi";

function Banner(props) {
  const [data, setData] = useState([]);
  const [itemIndex, setItemIndex] = useState(0);
  const getApiData = async () => {
    const apiData = await fetch(
      `https://api.themoviedb.org/3/trending/${props.media_type}/${props.time_window}?api_key=a0a09063cee4d69c5cf6f060bc73d07a`
    );
    const dataList = await apiData.json();
    setData(dataList.results);
    // console.log(dataList.results);
  };
  useEffect(() => {
    window.scroll(0,0)
    getApiData(props);
  }, []);

  const swipLeft = () => {
    itemIndex === 0
      ? setItemIndex(data.length - 1)
      : setItemIndex(itemIndex - 1);
  };
  const swipRight = () => {
    itemIndex === data.length - 1
      ? setItemIndex(0)
      : setItemIndex(itemIndex + 1);
  };

  return (
    <div className="relative">
      {data.map((item, index) => {
        let itemState = index === itemIndex ? "block" : "hidden";
        return (
          <div className={`${itemState} sm:pt-[72px] lg:pt-[75px]`}>
            <BannerCards item={item} />
          </div>
        );
      })}

      <div className="absolute bottom-6 sm:bottom-6 lg:bottom-9 flex gap-x-1.5 right-[50%] translate-x-[50%]">
        {data.map((item, index) => {
          let navBulletState =
            index === itemIndex ? "text-white" : "text-[#bababa61]";
          return (
            <GiPlainCircle
              className={`${navBulletState} text-[8px] lg:text-[10px] hover:text-[#eaeaeaa8] cursor-pointer`}
              onClick={() => setItemIndex(index)}
            />
          );
        })}
      </div>

      <span
        className="absolute left-0 top-[50%] z-10 font-black rounded-lg text-gray-200  text-3xl lg:text-4xl bg-[rgba(85,85,85,0.6)] cursor-pointer opacity-30 hover:opacity-100"
        onClick={swipLeft}
      >
        <AiOutlineLeft className="text-white" />
      </span>

      <span
        className={`absolute right-0 top-[50%] translate-y-[50%] z-10 font-black rounded-lg text-gray-200 text-3xl lg:text-4xl bg-[rgba(85,85,85,0.6)] cursor-pointer opacity-30 hover:opacity-100`}
        onClick={swipRight}
      >
        <AiOutlineRight className="text-white" />
      </span>
    </div>
  );
}

export default Banner;
