import React from "react";
import { getPageArray } from "../../../Utils/pages";

const MyPagination = ({ totalPages, page, setPage }) => {
  let pagesArray = getPageArray(totalPages);
//   console.log([pagesArray]);

  return (
    <div className="page__wrapper">
      {pagesArray.map((p) => (
        <span
          onClick={() => setPage(p)}
          key={p}
          className={page === p ? "page page__current" : "page"}
        >
          {p}
        </span>
      ))}
    </div>
  );
};

export default MyPagination;
