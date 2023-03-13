import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  sortData,
  CountInput,
  getMinMaxDateTime,
  advancedSearch
} from '../common';
import BulkOptions from '../bulk-options';
import DataTable from '../data-table';
import Pagination from '../pagination';
import SearchBar from '../search-bar';
import StateCounter from '../state-counter';
import './search-sort-data-table.css';
import DatePicker from '../date-picker';

export default function DataTableComponent({
  columns,
  title,
  type,
  icon,
  selectable,
  refreshUsers
}) {
  const [data, setData] = useState(columns);
  const getMinMax = useCallback(() => getMinMaxDateTime(columns), [columns]);
  const { min, max } = getMinMax();
  const [rCount, setRCount] = useState(15);
  const [page, setPage] = useState(1);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [search, setSearch] = useState('');
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [, forceUpdate] = useState();
  const navigate = useNavigate();
  useEffect(() => {
    setData(columns);
  }, [columns]);

  useEffect(() => {
    if (page !== 1) setPage(1);
    else forceUpdate({});
  }, [data]);

  useEffect(() => {
    const filteredData = advancedSearch(columns, {
      startDateTime: startDate,
      endDateTime: endDate,
      searchStr: search
    });
    setData(filteredData);
  }, [startDate, endDate, search]);

  const sortColumnData = (sortBy, sortOrder) => {
    const sortedData = sortData(data, sortBy, sortOrder);
    setData(sortedData);
    if (page !== 1) setPage(1);
    else forceUpdate({});
  };

  const editUser = (idx) => {
    navigate(`/admin/users/${data[idx].id}`);
  };

  const removeUsers = (ids) => {
    setData((prev) => prev.filter((user) => !ids.includes(user.id)));
  };

  return (
    <div>
      {selectable ? (
        <BulkOptions
          selectedUsers={selectedUsers}
          setSelectedUsers={setSelectedUsers}
          removeUsers={removeUsers}
          refreshUsers={refreshUsers}
        />
      ) : null}
      <section className="data-table-component">
        <h2 className="data-table-title">{title}</h2>
        <StateCounter
          page={page}
          rCount={rCount}
          length={data?.length || 0}
          type={type}
          icon={icon}
        />
        <div className="data-table-modifiers">
          <DatePicker
            setStartDate={setStartDate}
            setEndDate={setEndDate}
            min={min?.toISOString().split('.')[0] || ''}
            max={max?.toISOString().split('.')[0] || ''}
          />
        </div>
        <div className="data-table-modifiers">
          <span className="data-table-row-count-container">
            <CountInput
              title="# Rows"
              count={rCount}
              setCount={setRCount}
              id="data-table-row-count"
              min={5}
              max={50}
            />
          </span>
          <span className="search-box-container">
            <SearchBar setSearch={setSearch} />
          </span>
        </div>
        <div className="data-table">
          <DataTable
            columns={data}
            count={rCount}
            page={page}
            sortData={sortColumnData}
            editUser={editUser}
            setSelectedUsers={setSelectedUsers}
            selectedUsers={selectedUsers}
            selectable={selectable}
          />
        </div>
        <div className="data-table-modifiers">
          <Pagination
            count={data?.length || 0}
            rCount={rCount}
            page={page}
            setPage={setPage}
          />
        </div>
        <StateCounter
          page={page}
          rCount={rCount}
          length={data?.length || 0}
          type={type}
          icon={icon}
        />
      </section>
    </div>
  );
}
