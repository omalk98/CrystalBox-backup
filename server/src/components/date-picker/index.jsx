import React, { useState, useEffect } from 'react';

import useDebounce from '../../hooks/useDebounce';

import './date-picker.css';

export default function DatePicker({ setStartDate, setEndDate, min, max }) {
  const [startValue, setStartValue] = useState(min);
  const [endValue, setEndValue] = useState(max);
  const debouncedStart = useDebounce(startValue, 700);
  const debouncedEnd = useDebounce(endValue, 700);
  useEffect(() => {
    setStartValue(min);
    setEndValue(max);
  }, [min, max]);
  useEffect(() => {
    setStartDate(new Date(debouncedStart));
  }, [debouncedStart]);
  useEffect(() => {
    setEndDate(new Date(debouncedEnd));
  }, [debouncedEnd]);
  const resetDate = () => {
    setStartDate(new Date(min));
    setEndDate(new Date(max));
    setStartValue(min);
    setEndValue(max);
  };
  return (
    <div className="users-options date-picker-box">
      <label htmlFor="start_date">
        Start Date/Time
        <input
          id="start_date"
          type="datetime-local"
          step={1}
          className="clear-input detail-input"
          onChange={(e) => setStartValue(e.target.value)}
          min={min}
          max={max}
          value={startValue}
        />
      </label>
      <button
        className="clear-input glow-red"
        onClick={resetDate}
      >
        Reset Date/Time
      </button>
      <label htmlFor="end_date">
        End Date/Time
        <input
          id="end_date"
          type="datetime-local"
          step={1}
          className="clear-input detail-input"
          onChange={(e) => setEndValue(e.target.value)}
          min={min}
          max={max}
          value={endValue}
        />
      </label>
    </div>
  );
}
