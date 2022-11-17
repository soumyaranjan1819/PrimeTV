import { useEffect, useState } from "react";

const Genres = ({
  selectedGenres,
  setSelectedGenres,
  genres,
  setGenres,
  type,
  setCurrentPage,
}) => {
  const [showGenre, setShowGenres] = useState(false);

  const fetchGenres = async () => {
    const apiData = await fetch(
      `https://api.themoviedb.org/3/genre/${type}/list?api_key=${process.env.REACT_APP_APIKEY}&language=en-US`
    );
    const data = await apiData.json();
    setGenres(data.genres);
  };

  useEffect(() => {
    fetchGenres();
  }, []);

  const addGerner = (gerner) => {
    setSelectedGenres([...selectedGenres, gerner]);
    setGenres(genres.filter((g) => g.id !== gerner.id));
    setCurrentPage(1);
  };

  const removeGerner = (gerner) => {
    setGenres([...genres, gerner]);
    setSelectedGenres(selectedGenres.filter((g) => g.id !== gerner.id));
    setCurrentPage(1);
  };

  return (
    <>
      <div
        className="mt-24 ml-8 mb-3 text-yellow-400 font-medium cursor-pointer"
        onClick={() => {
          setShowGenres(!showGenre);
        }}
      >
        {!showGenre ? <span>Show Genres</span> : <span>Hide Genres</span>}
      </div>
      {showGenre && (
        <div className="flex flex-wrap gap-3 justify-center mx-3 mb-2">
          {selectedGenres.map((genre) => (
            <div
              key={genre.id}
              className=" bg-yellow-400 text-black font-normal py-0.5 px-2.5 rounded-2xl cursor-pointer hover:bg-yellow-500"
              onClick={() => {
                removeGerner(genre);
              }}
            >
              {genre.name}
              <span className=" font-bold"> X</span>
            </div>
          ))}
          {genres.map((genre) => (
            <span
              key={genre.id}
              className=" bg-sky-600 text-sky-50 font-normal py-0.5 px-2.5 rounded-2xl cursor-pointer hover:bg-sky-700"
              onClick={() => {
                addGerner(genre);
              }}
            >
              {genre.name}
            </span>
          ))}
        </div>
      )}
    </>
  );
};
export default Genres;
