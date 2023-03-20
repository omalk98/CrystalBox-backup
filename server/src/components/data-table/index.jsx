import React, { useState, useRef, useEffect } from 'react';
import { Table } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

import Icons from '../../resources/icons';
import { capitalizeFirst, formatDate } from '../common';

import './data-table.css';

const TData = ({ data, titles }) =>
  data.map((text, i) => {
    let formatted_text = text;
    if (text instanceof Array) {
      formatted_text = text.join(' - ');
    } else if (
      typeof text === 'string' &&
      text?.split('T').length === 2 &&
      text.includes(':')
    ) {
      formatted_text = formatDate(text);
    } else if (text instanceof Object) {
      formatted_text = '';
    }
    return (
      <td
        key={i}
        title={titles[i]}
      >
        {formatted_text}
      </td>
    );
  });

function TRow({ column, num, selectedUsers, setSelectedUsers, selectable }) {
  const selected = useRef();
  const navigate = useNavigate();
  const editUser = (id) => navigate(`/console/admin/users/${id}`);
  const modifyList = (id, chk) => {
    if (chk) {
      setSelectedUsers((prev) => Array.from(new Set([...prev, id])));
    } else {
      setSelectedUsers((prev) => prev.filter((i) => i !== id));
    }
  };
  return (
    <tr className="data-table-row">
      {selectable ? (
        <td>
          <button
            title="Edit User"
            type="button"
            className="clear-input edit-user-button"
            onClick={() => editUser(column?.id)}
          >
            <Icons.EditUser />
            &nbsp;&nbsp;Edit
          </button>
          <input
            id={column?.id}
            type="checkbox"
            name="selected-user"
            ref={selected}
            defaultChecked={selectedUsers.includes(column?.id)}
            onChange={() => modifyList(column?.id, selected?.current?.checked)}
          />
        </td>
      ) : null}
      <td title="Number">{num}</td>
      <TData
        data={Object.values(column)}
        titles={Object.keys(column)}
      />
    </tr>
  );
}

function TBody({
  columns,
  count,
  page,
  hiddenFields,
  selectedUsers,
  setSelectedUsers,
  selectable
}) {
  return (
    <tbody>
      {typeof columns === 'string' ? (
        <tr>
          <td colSpan="100%">
            <h3 style={{ color: 'red' }}>{columns}</h3>
          </td>
        </tr>
      ) : (
        columns
          .slice(count * (page - 1), count * page)
          .map((column) => {
            const newColumn = { ...column };
            hiddenFields.forEach((field) => {
              delete newColumn[field];
            });
            return newColumn;
          })
          .map((column, i) => (
            <TRow
              key={column?.id || column?._id}
              column={column}
              num={count * (page - 1) + i + 1}
              selectedUsers={selectedUsers}
              setSelectedUsers={setSelectedUsers}
              selectable={selectable}
            />
          ))
      )}
    </tbody>
  );
}

function TH({ title, sortData, hideColumn }) {
  const [sortOrder, setSortOrder] = useState('');

  const handleSort = () => {
    sortData(title, sortOrder === 'ASC' ? 'DESC' : 'ASC');
    setSortOrder((order) => (order === 'ASC' ? 'DESC' : 'ASC'));
  };
  return (
    <th title={capitalizeFirst(title, '_')}>
      <div className="data-table-th">
        {capitalizeFirst(title, '_')}
        <div className="data-table-th-buttons">
          <button
            title={sortOrder === 'DESC' ? 'Descending' : 'Ascending'}
            type="button"
            className="data-table-th-button"
            onClick={handleSort}
          >
            <span className="data-table-th-icon">
              <Icons.ArrowLong
                className={`data-table-sort-arrow ${
                  sortOrder === 'DESC' && 'rotate-180'
                }`}
              />
            </span>
          </button>
          {title === 'id' || title === '_id' ? null : (
            <button
              title="Hide Column"
              type="button"
              className="data-table-th-button"
              onClick={() => hideColumn(title)}
            >
              <span className="data-table-th-icon">
                <Icons.Visible className="data-table-sort-arrow" />
              </span>
            </button>
          )}
        </div>
      </div>
    </th>
  );
}

function THead({
  titles,
  sortData,
  hiddenFields,
  hideColumn,
  page,
  setSelectedUsers,
  selectable
}) {
  const selectAll = useRef();

  const handleSelectAll = () => {
    const selected = [];
    document
      .querySelectorAll('input[name="selected-user"]')
      .forEach((input) => {
        // eslint-disable-next-line no-param-reassign
        input.checked = selectAll.current?.checked;
        selected.push(input.id);
      });
    if (selectAll.current?.checked) {
      setSelectedUsers((prev) => Array.from(new Set([...prev, ...selected])));
    } else {
      setSelectedUsers((prev) =>
        prev.filter((user) => selected.indexOf(user) === -1)
      );
    }
  };

  useEffect(() => {
    if (selectAll.current) selectAll.current.checked = false;
  }, [page]);

  return titles && typeof titles !== 'string' ? (
    <thead>
      <tr className="data-table-row">
        {selectable ? (
          <th>
            Select All&nbsp;&nbsp;
            <input
              type="checkbox"
              ref={selectAll}
              onChange={handleSelectAll}
            />
          </th>
        ) : null}
        <th title="Number">#</th>
        {Object.keys(titles)
          .filter((title) => !hiddenFields.has(title))
          .map((title, i) => (
            <TH
              key={i}
              title={title}
              sortData={sortData}
              hideColumn={hideColumn}
            />
          ))}
      </tr>
    </thead>
  ) : null;
}

export default function DataTable({
  columns,
  count,
  page,
  sortData,
  hiddenFields,
  hideColumn,
  editUser,
  selectedUsers,
  setSelectedUsers,
  selectable
}) {
  const theme = useSelector((state) => state.theme);

  return (
    <Table
      border={2}
      variant={theme}
      striped
      bordered
      hover
    >
      <THead
        titles={columns && columns[0]}
        sortData={sortData}
        hiddenFields={hiddenFields}
        hideColumn={hideColumn}
        page={page}
        setSelectedUsers={setSelectedUsers}
        selectable={selectable}
      />
      <TBody
        columns={columns}
        hiddenFields={hiddenFields}
        //   hiddenFields?.length
        //     ? columns.map((column) => {
        //       const newColumn = { ...column };
        //       hiddenFields.forEach((field) => {
        //         delete newColumn[field];
        //       });
        //       return newColumn;
        //     })
        //     : columns
        // }
        count={count}
        page={page}
        editUser={editUser}
        selectedUsers={selectedUsers}
        setSelectedUsers={setSelectedUsers}
        selectable={selectable}
      />
    </Table>
  );
}
