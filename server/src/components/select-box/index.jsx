import React from 'react';

export default function SelectBox({ id, name, toggles, setter }) {
  return (
    <select
      id={id}
      name={name}
      className="detail-input"
      onClick={(e) => setter(e.target.value)}
    >
      {toggles?.map((toggle) => (
        <option
          key={toggle?.value}
          name={name}
          value={toggle?.value}
        >
          {toggle?.text}
        </option>
      ))}
    </select>
  );
}
