import React from "react";
import Recomended from "../Components/Recomended";
import PopularSlider from "../Components/Popular";
import UpComingSlider from "../Components/Upcoming";
import Banner from "../Components/Banner";

function Home() {
  return (
    <div>
      <Banner media_type="all" time_window="week" />
      <Recomended
        type="trending"
        media_type="movie"
        time_window="week"
        tag="Recomended Movies"
        class="RM"
      />
      <Recomended
        tag="Recomended Shows"
        type="trending"
        media_type="tv"
        time_window="week"
        class="RTV"
      />
      <UpComingSlider
        tag="Now Playing"
        type="upcoming"
        media_type="movie"
        class="UM"
        class2="um"
      />
      <PopularSlider
        tag="Popular Movies"
        type="top_rated"
        media_type="movie"
        class="PM"
        class2="pm"
      />
      <PopularSlider
        tag="Popular Shows"
        type="top_rated"
        media_type="tv"
        class="PTV"
        class2="ptv"
      />
    </div>
  );
}

export default Home;
