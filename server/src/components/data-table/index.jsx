import React, { useState, useRef, useEffect } from 'react';
import { Table } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

import Icons from '../../resources/icons';

import './data-table.css';

const TData = ({ data, titles }) =>
  data.map((text, i) => (
    <td
      key={i}
      title={titles[i]}
    >
      {text instanceof Array ? text.join(' - ') : text}
    </td>
  ));

function TRow({ column, selectedUsers, setSelectedUsers }) {
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
      <TData
        data={Object.values(column)}
        titles={Object.keys(column)}
      />
    </tr>
  );
}

function TBody({ columns, count, page, selectedUsers, setSelectedUsers }) {
  return (
    <tbody>
      {typeof columns === 'string' ? (
        <tr>
          <td colSpan="100%">
            <h3 style={{ color: 'red' }}>{columns}</h3>
          </td>
        </tr>
      ) : (
        columns.slice(count * (page - 1), count * page).map((column) => (
          <TRow
            key={column?.id}
            column={column}
            selectedUsers={selectedUsers}
            setSelectedUsers={setSelectedUsers}
          />
        ))
      )}
    </tbody>
  );
}

function TH({ title, sortData }) {
  const [sortOrder, setSortOrder] = useState('');

  const handleSort = () => {
    sortData(title, sortOrder === 'ASC' ? 'DESC' : 'ASC');
    setSortOrder((order) => (order === 'ASC' ? 'DESC' : 'ASC'));
  };
  return (
    <th
      className="data-table-th"
      title="click-to-sort"
    >
      <button
        type="button"
        className="data-table-th-button"
        onClick={handleSort}
      >
        {title}
        <span className="data-table-th-icon">
          <Icons.ArrowLong
            title={sortOrder === 'DESC' ? 'descending' : 'ascending'}
            className={`data-table-sort-arrow ${
              sortOrder === 'DESC' && 'rotate-180'
            }`}
          />
        </span>
      </button>
    </th>
  );
}

function THead({ titles, sortData, page, setSelectedUsers }) {
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
        <th>
          Select All&nbsp;&nbsp;
          <input
            type="checkbox"
            ref={selectAll}
            onChange={handleSelectAll}
          />
        </th>
        {Object.keys(titles).map((title, i) => (
          <TH
            key={i}
            title={title}
            sortData={sortData}
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
  editUser,
  selectedUsers,
  setSelectedUsers
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
        page={page}
        setSelectedUsers={setSelectedUsers}
      />
      <TBody
        columns={columns}
        count={count}
        page={page}
        editUser={editUser}
        selectedUsers={selectedUsers}
        setSelectedUsers={setSelectedUsers}
      />
    </Table>
  );
}
