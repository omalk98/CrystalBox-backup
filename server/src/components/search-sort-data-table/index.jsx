import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import Select from 'react-select';
import {
  sortData,
  CountInput,
  getMinMaxDateTime,
  advancedSearch,
  capitalizeFirst,
  reactSelectStyles,
  colorList
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
  const [columnFilter, setColumnFilter] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [hiddenFields, setHiddenFields] = useState(new Set());
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
      searchStr: search,
      fields: columnFilter
    });
    setData(filteredData);
  }, [startDate, endDate, search, columnFilter]);

  const sortColumnData = (sortBy, sortOrder) => {
    const sortedData = sortData(data, sortBy, sortOrder);
    setData(sortedData);
    if (page !== 1) setPage(1);
    else forceUpdate({});
  };

  const filterColumnData = (selected) => {
    setColumnFilter(selected.map((item) => item.value));
  };

  const editUser = (idx) => {
    navigate(`/admin/users/${data[idx].id}`);
  };

  const removeUsers = (ids) => {
    setData((prev) => prev.filter((user) => !ids.includes(user.id)));
  };

  const hideField = (field) => {
    setHiddenFields((prev) => {
      prev.add(field);
      return new Set(prev);
    });
  };

  const showField = (field) => {
    setHiddenFields((prev) => {
      prev.delete(field);
      return new Set(prev);
    });
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
          <Select
            options={
              // prettier-ignore
              columns[0]
                ? Object.keys(columns[0]).map((key, i) => ({
                  label: capitalizeFirst(key, '_'),
                  value: key,
                  color: colorList[i]?.hex
                }))
                : []
            }
            onChange={filterColumnData}
            placeholder="Filter Search by Column..."
            isMulti
            className="react-select-container"
            classNamePrefix="react-select"
            styles={reactSelectStyles}
          />
          <span className="search-box-container">
            <SearchBar setSearch={setSearch} />
          </span>
        </div>
        <div className="data-table-modifiers users-options mb-0">
          {Array.from(hiddenFields).map((field, i) => (
            <button
              className={`clear-input glow-${colorList[i]?.name}`}
              key={`show_${field}`}
              onClick={() => showField(field)}
            >
              {capitalizeFirst(field)}
            </button>
          ))}
        </div>
        <div className="data-table">
          <DataTable
            columns={data}
            count={rCount}
            page={page}
            sortData={sortColumnData}
            hiddenFields={hiddenFields}
            hideColumn={hideField}
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
