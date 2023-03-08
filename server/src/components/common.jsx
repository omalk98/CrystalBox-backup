import React from 'react';
import { Spinner } from 'react-bootstrap';

import './common.css';

export const setTitle = (title) => {
  document.title = `${title ? `${title} | ` : ''} Crystal Box`;
};

export const dashedString = (str) => str?.replace(' ', '-').toLowerCase();

export function PageTab({ type, sub, title, icon, children }) {
  setTitle(title);
  return (
    <div className={`${type}-${sub ? `${sub}-` : ''}${dashedString(title)}`}>
      <div className="page-tab-header">
        <h1 className="page-tab-title">
          <span className="page-tab-title-icon">{icon}</span>
          &nbsp;
          {title}
        </h1>
        <hr />
      </div>
      <div className="page-tab">{children}</div>
    </div>
  );
}

export function Loader({ text = '', variant = 'primary', animation = 'grow' }) {
  return (
    <Spinner
      size="lg"
      animation={animation}
      role="status"
      variant={variant}
      className="mx-auto suspense-spinner"
    >
      {text && (
        <h1>
          {text}
          ...
        </h1>
      )}
    </Spinner>
  );
}
export function CountInput({ title, count, setCount, id, max, min }) {
  const handleChange = (e) => {
    if (e.target.value < min) {
      setCount(min);
      return;
    }
    if (e.target.value > max) {
      setCount(max);
      return;
    }
    setCount(e.target.value);
  };

  return (
    <div className="number-input-container">
      <input
        id={id}
        className="clear-input number-input"
        type="number"
        min={min}
        max={max}
        defaultValue={count}
        onChange={handleChange}
      />
      <label htmlFor={id}>{title}</label>
    </div>
  );
}

export function OuterLink({ href, text, ...rest }) {
  return (
    <a
      className="clear-link"
      href={href}
      target="_blank"
      rel="noreferrer"
      {...rest}
    >
      {text}
    </a>
  );
}

export const sortData = (data, sortBy, sortOrder = 'ASC') => {
  if (!data) return [];
  if (!sortBy) return data;
  const sortedData = data.sort((a, b) => {
    switch (sortOrder) {
      case 'ASC':
        return a[sortBy] > b[sortBy] ? 1 : -1;
      case 'DESC':
        return a[sortBy] < b[sortBy] ? 1 : -1;
      default:
        return 0;
    }
  });
  return sortedData;
};

export const fuzzySearch = (search, data) => {
  if (!data) return [];
  if (!search) return data;
  const searchStr = search.toLowerCase();
  const filteredData = data.filter((item) =>
    Object.values(item).some((value) =>
      value.toString().toLowerCase().includes(searchStr)
    )
  );
  return filteredData?.length ? filteredData : 'No results found';
};

export const formatDate = (date, dateDelimiter = '-', timeDelimiter = ':') => {
  if (!date) return '';
  const hasTime = date.includes('T');
  let newDate = date;
  let time = '';
  let timeSlots = [];
  if (hasTime) {
    const parts = date.split('T');
    [newDate, time] = parts;
  }
  const dateSlots = newDate.split(dateDelimiter);
  timeSlots = time.split(timeDelimiter);
  const seconds = timeSlots.pop().split('.')[0];
  timeSlots.push(seconds);
  dateSlots[1] = parseInt(dateSlots[1], 10) - 1;

  const returnDate = new Date(...dateSlots, ...timeSlots);
  // prettier-ignore
  return hasTime
    ? returnDate.toLocaleTimeString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric',
      hour12: true
    })
    : returnDate.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
};

export const formatPhone = (phone) => {
  const cleaned = phone.toString().replace(/\D/g, '');
  const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
  return match ? `(${match[1]}) ${match[2]}-${match[3]}` : phone;
};

// prettier-ignore
export const capitalizeFirst = (str, delimiter) =>
  str
    ? str
      .split(delimiter)
      .map((s) => s.charAt(0).toUpperCase() + s.substring(1).toLowerCase())
      .join(' ')
    : '';

export const getInputType = (key) => {
  let type = 'text';
  if (key.includes('email')) type = 'email';
  else if (key.includes('password')) type = 'password';
  else if (key.includes('date') || key.includes('time')) type = 'date';
  else if (key.includes('phone')) type = 'tel';
  else if (key.includes('number') || key.includes('level')) type = 'number';
  else if (key.includes('province')) type = 'select';
  else if (key.includes('activated') || key.includes('locked')) {
    type = 'checkbox';
  } else type = 'text';
  return type;
};

export const provinceList = [
  {
    code: 'ON',
    name: 'Ontario'
  },
  {
    code: 'BC',
    name: 'British Columbia'
  },
  {
    code: 'QC',
    name: 'Quebec'
  },
  {
    code: 'AB',
    name: 'Alberta'
  },
  {
    code: 'NS',
    name: 'Nova Scotia'
  },
  {
    code: 'NB',
    name: 'New Brunswick'
  },
  {
    code: 'MB',
    name: 'Manitoba'
  },
  {
    code: 'PE',
    name: 'Prince Edward Island'
  },
  {
    code: 'SK',
    name: 'Saskatchewan'
  },
  {
    code: 'NL',
    name: 'Newfoundland and Labrador'
  }
];

export const ProvinceListOptions = (
  <>
    <option value="">Select Province</option>

    {provinceList.map((province) => (
      <option
        key={province?.code}
        value={province?.code}
      >
        {province?.name}
      </option>
    ))}
  </>
);
