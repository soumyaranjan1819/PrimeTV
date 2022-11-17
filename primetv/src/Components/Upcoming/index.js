import React, { useState, useEffect } from "react";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";
import UpcomingCard from "../UpcomingCards";


function Data(props) {
  const [data, setData] = useState([]);

  const getApiData = async () => {
      const apiData = await fetch(
        `https://api.themoviedb.org/3/${props.media_type}/${props.type}?api_key=${process.env.REACT_APP_APIKEY}`
      );
      const dataList = await apiData.json();
      setData(dataList.results);
      console.log(dataList.results)
  };

  useEffect(() => {
    window.scroll(0,0)
    getApiData(props);
  }, []);

  let box = document.querySelector(`.${props.class}`);

  const moveleft = () => {
    let width = box.clientWidth;
    box.scrollLeft = box.scrollLeft - width + 200;
    // console.log(box.scrollLeft);
  };
  const moveright = () => {
    let width = box.clientWidth;
    box.scrollLeft = box.scrollLeft + width - 200;
  };

  return (
    <div className="bg-black overflow-y-hidden scroll-smooth py-3 ">
      <h3 className="flex items-center text-2xl font-semibold text-white m-4 ml-10">
        {props.tag}
      </h3>

      <div className={`flex items-center`}>
        <div
          className={`${props.class} relative flex gap-3 px-10 overflow-x-hidden`}
        >
          {data.map((item) => <UpcomingCard item={item}/> )}
        </div>

        <span
          className="absolute left-0 z-20 font-black py-[72px] text-gray-200 text-4xl bg-[rgba(0,0,0,0.9)] cursor-pointer opacity-30 hover:opacity-100"
          onClick={moveleft}
        >
          <AiOutlineLeft />
        </span>

        <span
          className={`absolute right-0 z-20 py-[72px] font-black text-gray-200 text-4xl bg-[rgba(0,0,0,0.9)] cursor-pointer opacity-30 hover:opacity-100`}
          onClick={moveright}
        >
          <AiOutlineRight />
        </span>
      </div>
    </div>
  );
}

export default Data;
