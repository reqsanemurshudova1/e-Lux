import React from "react";


const Pagination = ({ pageNumbers, currentPage, paginate, nextPage, prevPage }) => {
  return (
    <nav className="pagination">
      <ul className="pagination-list">
        <li className={`pagination-item ${currentPage === 1 ? 'disabled' : ''}`}>
          <a onClick={prevPage} href="#!" className="pagination-link1">
           <img src="./Assets/left.svg" alt="Previous" /> Previous
          </a>
        </li>
        {pageNumbers.map(number => (
          <li key={number} className={`pagination-item ${currentPage === number ? 'active' : ''}`}>
            <a onClick={() => paginate(number)} href="#!" className="pagination-link">
              {number}
            </a>
          </li>
        ))}
        <li className={`pagination-item ${currentPage === pageNumbers.length ? 'disabled' : ''}`}>
          <a onClick={nextPage} href="#!" className="pagination-link1">
            Next <img src="./Assets/right.svg" alt="Next" />
          </a>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;
