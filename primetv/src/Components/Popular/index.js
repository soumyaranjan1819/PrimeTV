import React, { useState, useEffect } from "react";
import { AiOutlineLeft, AiOutlineRight, AiFillCaretUp } from "react-icons/ai";
import MovieCard from "../MovieCard";
import Slidder from "../Slidder";

function Data(props) {
  const [data, setData] = useState([]);
  const [expandCarousal, setExpandCarousal] = useState(true);
  const getApiData = async () => {
    const apiData = await fetch(
      `https://api.themoviedb.org/3/${props.media_type}/${props.type}?api_key=${process.env.REACT_APP_APIKEY}`
    );
    const dataList = await apiData.json();
    setData(dataList.results);
  };
  useEffect(() => {
    getApiData(props);
  }, []);

  // let box = document.querySelector(`.${props.class}`);

  // const moveleft = () => {
  //   let width = box.clientWidth;
  //   box.scrollLeft = box.scrollLeft - width;
  //   console.log(box.scrollLeft);
  // };
  // const moveright = () => {
  //   let width = box.clientWidth;
  //   box.scrollLeft = box.scrollLeft + width;
  // };

  // let carousal = `relative flex gap-3 overflow-x-hidden`;
  // let showAll = `flex justify-evenly flex-wrap gap-4`;

  // let viewingState = expandCarousal ? carousal : showAll;

  return <Slidder class={props.class} tag={props.tag} dataSet={data} />;
}
export default Data;
// <div className="bg-black overflow-y-hidden scroll-smooth py-3 ">
//   <h3 className="flex items-center text-2xl font-semibold text-white m-4 ml-10">
//     {props.tag}
//     <span
//       className=" text-xs text-sky-600 mt-1.5 ml-2.5 cursor-pointer"
//       onClick={() => setExpandCarousal(!expandCarousal)}
//     >
//       {expandCarousal ? (
//         "View All"
//       ) : (
//         <AiFillCaretUp style={{ fontSize: "16px" }} />
//       )}
//     </span>
//   </h3>

//   <div className={`flex items-center`}>
//     <div className={`${props.class} ${viewingState} px-10`}>
//       {data.map((item, index) => (
//         <MovieCard item={item} category={props.media_type} />
//       ))}
//     </div>

//     {expandCarousal && (
//       <span
//         className="absolute left-0 z-20 font-black py-[102px] text-gray-200 text-4xl bg-[rgba(0,0,0,0.9)] cursor-pointer opacity-30 hover:opacity-100"
//         onClick={moveleft}
//       >
//         {" "}
//         <AiOutlineLeft />{" "}
//       </span>
//     )}

//     {expandCarousal && (
//       <span
//         className={`absolute right-0 z-20 py-[102px] font-black text-gray-200 text-4xl bg-[rgba(0,0,0,0.9)] cursor-pointer opacity-30 hover:opacity-100`}
//         onClick={moveright}
//       >
//         {" "}
//         <AiOutlineRight />{" "}
//       </span>
//     )}
//   </div>
// </div>
