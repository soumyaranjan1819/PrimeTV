import React, { useState, useEffect } from "react";
import Slidder from "../Slidder";

function Data(props) {
  const [data, setData] = useState([]);
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

  return <Slidder class={props.class} tag={props.tag} dataSet={data} />;
}
export default Data;
// 
