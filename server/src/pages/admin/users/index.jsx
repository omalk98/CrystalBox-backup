import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import Requests from '../../../requests';
import Icons from '../../../resources/icons';
import {
  CountInput,
  fuzzySearch,
  Loader,
  PageTab,
  sortData
} from '../../../components/common';
import BulkOptions from '../../../components/bulk-options';
import DataTable from '../../../components/data-table';
import Pagination from '../../../components/pagination';
import SearchBar from '../../../components/search-bar';

import './users.css';

function StateCounter({ rCount, page, length }) {
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
        <Icons.Users />
        &nbsp;Showing Users:&nbsp;
        <u>
          {page * rCount - rCount + 1}
          &nbsp;-&nbsp;
          {`${page * rCount > length ? length : page * rCount} / ${length}`}
        </u>
      </span>
    </div>
  );
}

function DataTableComponent({ columns, title, removeUsers }) {
  const [data, setData] = useState(columns);
  const [rCount, setRCount] = useState(15);
  const [page, setPage] = useState(1);
  const navigate = useNavigate();
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [, forceUpdate] = useState();

  useEffect(() => {
    setData(columns);
  }, [columns]);

  useEffect(() => {
    if (page !== 1) setPage(1);
    else forceUpdate({});
  }, [data]);

  const searchData = (search) => {
    const filteredData = fuzzySearch(search, columns);
    setData(filteredData);
  };

  const SortData = (sortBy, sortOrder) => {
    const sortedData = sortData(data, sortBy, sortOrder);
    setData(sortedData);
    if (page !== 1) setPage(1);
    else forceUpdate({});
  };

  const editUser = (idx) => {
    navigate(`/admin/users/${data[idx].id}`);
  };

  return (
    <div>
      <BulkOptions
        selectedUsers={selectedUsers}
        setSelectedUsers={setSelectedUsers}
        removeUsers={removeUsers}
      />
      <section className="data-table-component">
        <h2 className="data-table-title">{title}</h2>
        <StateCounter
          page={page}
          rCount={rCount}
          length={data?.length || 0}
        />
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
            <SearchBar searchData={searchData} />
          </span>
        </div>
        <div className="data-table">
          <DataTable
            columns={data}
            count={rCount}
            page={page}
            sortData={SortData}
            editUser={editUser}
            setSelectedUsers={setSelectedUsers}
            selectedUsers={selectedUsers}
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
        />
      </section>
    </div>
  );
}

export default function Users() {
  const [users, setUsers] = useState([]);
  const privateRequest = Requests.Private.Hook();
  useEffect(() => {
    const controller = new AbortController();
    const getUsers = async () => {
      try {
        if (users.length) return;
        const res = await privateRequest(
          Requests.Private.Get.allUsers(controller.signal)
        );
        if (res.status !== 200) throw new Error("Couldn't get footer data");
        setUsers(res.data);
      } catch {
        setUsers([]);
      }
    };

    getUsers();

    return () => {
      controller.abort();
    };
  }, []);

  const removeUsers = (ids) => {
    setUsers((prev) => prev.filter((user) => !ids.includes(user.id)));
  };

  return users.length ? (
    <PageTab
      type="admin"
      title="Users"
      icon={<Icons.Users />}
    >
      <DataTableComponent
        columns={users}
        title="User List"
        removeUsers={removeUsers}
      />
    </PageTab>
  ) : (
    <Loader
      variant="success"
      animation="border"
    />
  );
}
