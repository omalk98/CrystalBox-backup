import React from 'react';
import Icons from '../../resources/icons';
import './state-counter.css';

export default function StateCounter({ rCount, page, length, type, icon }) {
  return (
    <div className="data-table-counter">
      <span>
        <Icons.Page />
        &nbsp;Showing Page:&nbsp;
        <u>
          {`${length !== 0 ? page : 0} / ${Math.ceil(length / rCount)}`}
          &nbsp;
        </u>
      </span>
      <span>
        {icon}
        &nbsp;Showing&nbsp;
        {type}
        :&nbsp;
        <u>
          {page * rCount - rCount + 1}
          &nbsp;-&nbsp;
          {`${page * rCount > length ? length : page * rCount} / ${length}`}
        </u>
      </span>
    </div>
  );
}
