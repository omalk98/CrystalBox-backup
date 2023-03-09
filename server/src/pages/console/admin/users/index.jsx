import React, { useState, useEffect } from 'react';

import Requests from '../../../../requests';
import Icons from '../../../../resources/icons';
import { Loader, PageTab, SearchSortDataTable } from '../../../../components';

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
        if (res.status !== 200) throw new Error("Couldn't get user list");
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

  return users.length ? (
    <PageTab
      type="admin"
      title="Users"
      icon={<Icons.Users />}
    >
      <SearchSortDataTable
        columns={users}
        title="User List"
        type="Users"
        icon={<Icons.Users />}
        selectable
      />
    </PageTab>
  ) : (
    <Loader
      variant="success"
      animation="border"
    />
  );
}
