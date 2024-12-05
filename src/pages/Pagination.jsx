import React from "react";

const Pagination = ({ pageNumbers, currentPage, paginate, nextPage, prevPage }) => {
  const startPage = Math.max(1, currentPage - 1);
  const endPage = Math.min(pageNumbers.length, currentPage + 1);

  return (
    <nav className="pagination">
      <ul className="pagination-list">
        <li className={`pagination-item ${currentPage === 1 ? 'disabled' : ''}`}>
          <a onClick={prevPage} href="#!" className="pagination-link1">
            <img src="./Assets/left.svg" alt="Previous" /> Əvvəlki
          </a>
        </li>
        {pageNumbers.map(number => (
          (number >= startPage && number <= endPage) && (
            <li key={number} className={`pagination-item ${currentPage === number ? 'active' : ''}`}>
              <a onClick={() => paginate(number)} href="#!" className="pagination-link">
                {number}
              </a>
            </li>
          )
        ))}
        <li className={`pagination-item ${currentPage === pageNumbers.length ? 'disabled' : ''}`}>
          <a onClick={nextPage} href="#!" className="pagination-link1">
          Növbəti<img src="./Assets/right.svg" alt="Next" />
          </a>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;
