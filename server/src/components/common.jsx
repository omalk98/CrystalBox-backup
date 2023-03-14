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
    switch (sortOrder.toUpperCase()) {
      case 'ASC':
      case 'ASCE':
        return a[sortBy] > b[sortBy] ? 1 : -1;
      case 'DES':
      case 'DESC':
        return a[sortBy] < b[sortBy] ? 1 : -1;
      default:
        return 0;
    }
  });
  return sortedData;
};

export const getMinMaxDateTime = (data) => {
  if (!data?.length) return { min: null, max: null };
  const dateTimeFields = Object.keys(data[0]).filter((key) =>
    key.toLowerCase().match(/time|date/)
  );
  const offset = new Date().getTimezoneOffset() / 60 + 1;
  if (!dateTimeFields.length) return { min: null, max: null };
  const dateTimeValues = data.map((item) =>
    dateTimeFields.map((field) => new Date(item[field]))
  );
  const min = new Date(Math.min(...dateTimeValues.flat()));
  const max = new Date(Math.max(...dateTimeValues.flat()));
  min.setHours(min.getHours() + offset);
  max.setHours(max.getHours() + offset);
  return { min, max };
};

export const filterDateTime = (data, start, end) => {
  if (!data?.length || (!start && !end)) return data;
  const dateTimeFields = Object.keys(data[0]).filter((key) =>
    key.toLowerCase().match(/time|date/)
  );
  const startDT = new Date(start);
  const endDT = new Date(end);
  const offset = new Date().getTimezoneOffset() / 60;
  if (start) startDT.setHours(start.getHours() - offset - 2);
  if (end) endDT.setHours(end.getHours() - offset - 2);
  if (!dateTimeFields.length) return data;
  const filteredData = data.filter((item) => {
    if (!start && end) {
      return dateTimeFields.some((field) => {
        const dt = new Date(item[field]);
        dt.setHours(dt.getHours() + offset);
        return dt <= endDT;
      });
    }
    if (start && !end) {
      return dateTimeFields.some((field) => {
        const dt = new Date(item[field]);
        dt.setHours(dt.getHours() + offset);
        return dt >= startDT;
      });
    }
    return dateTimeFields.some((field) => {
      const sdt = new Date(item[field]);
      const edt = new Date(item[field]);
      sdt.setHours(sdt.getHours() + offset);
      edt.setHours(edt.getHours() + offset);
      return sdt >= startDT && edt <= endDT;
    });
  });
  return filteredData?.length ? filteredData : 'No results found';
};

export const fuzzySearch = (data, searchStr) => {
  if (!data?.length) return [];
  if (!searchStr) return data;
  const filteredData = data.filter((item) =>
    Object.values(item).some((value) =>
      value.toString().toLowerCase().includes(searchStr.toLowerCase())
    )
  );
  return filteredData?.length ? filteredData : 'No results found';
};

export const advancedSearch = (
  data,
  { startDateTime, endDateTime, searchStr, fields }
) => {
  if (!data?.length) return [];
  if (!startDateTime && !endDateTime && !searchStr) return data;

  const dateTimeFields = Object.keys(data[0]).filter((key) =>
    key.toLowerCase().match(/time|date/)
  );
  const startDT = new Date(startDateTime);
  const endDT = new Date(endDateTime);
  const offset = new Date().getTimezoneOffset() / 60;
  if (startDateTime) startDT.setHours(startDateTime.getHours() - offset - 2);
  if (endDateTime) endDT.setHours(endDateTime.getHours() - offset - 2);
  if (!dateTimeFields.length) return data;

  const filteredData = data.filter((item) => {
    let isMatch = true;

    // Date/Time filter
    if (!startDateTime && endDateTime) {
      isMatch = dateTimeFields.some((field) => {
        const dt = new Date(item[field]);
        dt.setHours(dt.getHours() + offset);
        dt.setMilliseconds(0);
        return dt <= endDT;
      });
    } else if (startDateTime && !endDateTime) {
      isMatch = dateTimeFields.some((field) => {
        const dt = new Date(item[field]);
        dt.setHours(dt.getHours() + offset);
        dt.setMilliseconds(0);
        return dt >= startDT;
      });
    } else if (startDateTime && endDateTime) {
      isMatch = dateTimeFields.some((field) => {
        const sdt = new Date(item[field]);
        const edt = new Date(item[field]);
        sdt.setHours(sdt.getHours() + offset);
        edt.setHours(edt.getHours() + offset);
        sdt.setMilliseconds(0);
        edt.setMilliseconds(0);
        return sdt >= startDT && edt <= endDT;
      });
    }

    if (!isMatch) return false;
    if (!searchStr) return true;

    // Fuzzy search
    if (fields?.length) {
      isMatch = fields.some((field) => {
        const value = item[field];
        return value.toString().toLowerCase().includes(searchStr.toLowerCase());
      });
    } else {
      isMatch = Object.values(item).some((value) =>
        value.toString().toLowerCase().includes(searchStr.toLowerCase())
      );
    }

    return isMatch;
  });

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
      weekday: 'short',
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric',
      hour12: true,
      timeZone: 'Europe/London'
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

export const colorList = [
  { name: 'red', hex: '#ff0000' },
  { name: 'green', hex: '#1db954' },
  { name: 'blue', hex: '#00bcd4' },
  { name: 'purple', hex: '#7431f9' },
  { name: 'orange', hex: '#ed9038' },
  { name: 'aqua', hex: '#09fbd3' },
  { name: 'yellow', hex: '#f5d300' },
  { name: 'pink', hex: '#fe53bb' },
  { name: 'lime', hex: '#b8fb3c' },
  { name: 'mint', hex: '#09bc8a' },
  { name: 'black', hex: '#000000' }
];

export const reactSelectStyles = {
  container: (provided) => ({
    ...provided,
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    padding: '5px 0'
  }),
  control: (provided) => ({
    ...provided,
    maxWidth: '400px',
    width: '100%',
    minHeight: '40px',
    backgroundColor: 'transparent',
    borderColor: 'var(--main-color)',
    borderRadius: '50px',
    color: 'var(--main-color)',
    padding: '5px'
  }),
  option: (provided) => ({
    ...provided,
    color: 'var(--main-color)',
    backgroundColor: 'var(--search-box-bg)',
    ':hover': {
      backgroundColor: 'var(--main-color-flip)'
    }
  }),
  placeholder: (provided) => ({
    ...provided,
    color: 'var(--main-color)'
  }),
  input: (provided) => ({
    ...provided,
    color: 'var(--main-color)'
  }),
  menu: (provided) => ({
    ...provided,
    maxWidth: '500px'
  }),
  multiValue: (provided, { data }) => ({
    ...provided,
    backgroundColor: `${data.color}80`,
    borderRadius: '50px',
    padding: '0 5px',
    border: `solid 1px ${data.color}`
  }),
  multiValueLabel: (provided) => ({
    ...provided,
    color: '#fff'
  }),
  multiValueRemove: (provided) => ({
    ...provided,
    borderRadius: '20px',
    marginLeft: '3px'
  }),
  dropdownIndicator: (provided) => ({
    ...provided,
    color: 'var(--main-color)',
    ':hover': {
      color: 'var(--disabled-color)'
    }
  }),
  clearIndicator: (provided) => ({
    ...provided,
    color: 'var(--main-color)',
    ':hover': {
      color: 'var(--disabled-color)'
    }
  })
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
