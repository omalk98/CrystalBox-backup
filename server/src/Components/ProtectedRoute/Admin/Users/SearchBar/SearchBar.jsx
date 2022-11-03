import React, { useState, useEffect } from 'react';

import useDebounce from '../../../../../Hooks/useDebounce';
import Icons from '../../../../../Resources/Icons';

import './SearchBar.css';

const isMobile = navigator.userAgent.match(
  /Android|webOS|iPhone|iPod|Blackberry/i
);

export default function SearchBar({ searchData }) {
  const [search, setSearch] = useState('');

  const debouncedSearch = useDebounce(search, 400);

  const handleChange = (e) => {
    setSearch(e?.target?.value);
  };

  useEffect(() => {
    searchData(search);
  }, [debouncedSearch]);

  return (
    <div className="search-box">
      <div
        className={`search-box-form ${search ? 'search-box-form-open' : ''}`}
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
