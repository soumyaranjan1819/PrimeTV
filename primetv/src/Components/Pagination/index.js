import React from "react";

function Pagination({ totalPage, currentPage, setCurrentPage }) {
  const pages = [];
  for (let i = 1; i <= totalPage; i++) {
    pages.push(i);
  }

  const prevBtn = currentPage === 1 ? "cursor-not-allowed" : "";
  const nextBtn = currentPage === totalPage ? "cursor-not-allowed" : "";

  const prevPage = () =>
    currentPage === 1 ? setCurrentPage(1) : setCurrentPage(currentPage - 1);
  const nextPage = () =>
    currentPage === totalPage
      ? setCurrentPage(totalPage)
      : setCurrentPage(currentPage + 1);

  return (
    <div className="flex flex-wrap justify-center items-center gap-3 px-4 my-5 font-semibold text-sky-500">
      <span onClick={prevPage} className={`cursor-pointer ${prevBtn}`}>
        Prev
      </span>
      {pages.map((page, index) => (
        <button
          key={index}
          onClick={() => setCurrentPage(page)}
          className={
            (currentPage === page ? "px-2 py-1 text-white rounded-[50%] bg-sky-500": "")
          }
        >
          {page}
        </button>
      ))}
      <span onClick={nextPage} className={`cursor-pointer ${nextBtn}`}>
        Next
      </span>
    </div>
  );
}

export default Pagination;
