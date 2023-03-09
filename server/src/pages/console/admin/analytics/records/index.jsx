import React, { useState, useEffect } from 'react';

import Requests from '../../../../../requests';
import Icons from '../../../../../resources/icons';
import { PageTab, SearchSortDataTable } from '../../../../../components';

export default function Records() {
  const [records, setRecords] = useState([]);
  const privateRequest = Requests.Private.Hook();
  useEffect(() => {
    const controller = new AbortController();
    const getRecords = async () => {
      try {
        if (records.length) return;
        const res = await privateRequest(
          Requests.Private.Get.recordData(controller.signal)
        );
        if (res.status !== 200) throw new Error("Couldn't get record list");
        setRecords(res.data);
      } catch {
        setRecords([]);
      }
    };

    getRecords();

    return () => {
      controller.abort();
    };
  }, []);
  return (
    <PageTab
      type="admin"
      sub="analytics"
      title="Records"
      icon={<Icons.Records />}
    >
      <SearchSortDataTable
        columns={records}
        title="Record List"
        type="Records"
        icon={<Icons.Records />}
      />
    </PageTab>
  );
}
