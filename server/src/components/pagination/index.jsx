import React from 'react';

import { CountInput } from '../common';
import PaginationButtons from './pagination-buttons';

import './pagination.css';

export default function Pagination({ count, rCount, page, setPage }) {
  const max = Math.ceil(count / rCount);

  const buttons = PaginationButtons(page, max).map(
    ({ value, title, condition, icon }, i) => (
      <button
        type="button"
        key={i}
        title={title}
        disabled={condition}
        className="clear-input pagination-button"
        value={value}
        onClick={() => setPage(parseInt(value, 10))}
      >
        {icon}
      </button>
    )
  );

  return (
    <div className="pagination-container">
      <span className="pagination-buttons">{buttons}</span>
      <span className="pagination-input">
        <CountInput
          title="Page #"
          count={page}
          setCount={setPage}
          id="data-table-pagination"
          min={1}
          max={max}
        />
      </span>
    </div>
  );
}
