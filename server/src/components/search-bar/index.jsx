import React, { useState, useEffect } from 'react';

import useDebounce from '../../hooks/useDebounce';
import Icons from '../../resources/icons';

import './search-bar.css';

const isMobile = navigator.userAgent.match(
  /Android|webOS|iPhone|iPod|Blackberry/i
);

export default function SearchBar({ setSearch }) {
  const [internalSearch, setInternalSearch] = useState('');

  const debouncedSearch = useDebounce(internalSearch, 400);

  const handleChange = (e) => {
    setInternalSearch(e?.target?.value);
  };

  useEffect(() => {
    setSearch(internalSearch);
  }, [debouncedSearch]);

  return (
    <div className="search-box">
      <div
        className={`search-box-form ${
          internalSearch ? 'search-box-form-open' : ''
        }`}
      >
        <input
          id="search-box"
          className="clear-input search-box-input"
          type="search"
          placeholder="search..."
          onChange={handleChange}
        />
        {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
        <label
          htmlFor="search-box"
          className="search-box-icon"
        >
          <Icons.Search
            style={{ translate: `${isMobile ? '-10px' : '-2px'} 0` }}
          />
        </label>
      </div>
    </div>
  );
}
