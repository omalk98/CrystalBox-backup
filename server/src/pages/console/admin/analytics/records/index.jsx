import React, { useState, useEffect } from 'react';

import Requests from '../../../../../requests';
import Icons from '../../../../../resources/icons';
import { PageTab, SearchSortDataTable } from '../../../../../components';

export default function Records() {
  const [records, setRecords] = useState([]);
  const [refresh, setRefresh] = useState(null);
  const [animation, setAnimation] = useState(false);
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
  }, [refresh]);
  return (
    <PageTab
      type="admin"
      sub="analytics"
      title="Records"
      icon={<Icons.Records />}
    >
      <div className="users-options">
        <button
          type="button"
          className="clear-input hover-black glow-orange"
          onClick={() => {
            setRefresh({});
            setAnimation(true);
          }}
          onAnimationEnd={() => setAnimation(false)}
        >
          <Icons.Refresh className={animation ? 'spin-clockwise-once' : ''} />
          &nbsp;Refresh Records
        </button>
      </div>
      <SearchSortDataTable
        columns={records}
        title="Record List"
        type="Records"
        icon={<Icons.Records />}
      />
    </PageTab>
  );
}
