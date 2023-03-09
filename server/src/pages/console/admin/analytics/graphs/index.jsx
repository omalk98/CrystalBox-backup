import React, { useState, useEffect } from 'react';

import Requests from '../../../../../requests';
import { PageTab, Loader } from '../../../../../components/common';
import GraphView from '../../../../../components/graph-chart';
import Icons from '../../../../../resources/icons';

export default function Graphs() {
  const [graphData, setGraphData] = useState({});
  const privateRequest = Requests.Private.Hook();

  useEffect(() => {
    const controller = new AbortController();
    const getGraph = async () => {
      try {
        if (graphData.length) return;
        const res = await privateRequest?.request(
          Requests.Private.Get.graphData(controller.signal)
        );
        if (res.status !== 200) throw new Error('Session expired');
        setGraphData(res.data);
      } catch {
        setGraphData({});
      }
    };

    getGraph();

    return () => {
      controller.abort();
    };
  }, []);

  return (
    <PageTab
      type="admin"
      sub="analytics"
      title="Graphs"
      icon={<Icons.Graph />}
    >
      {graphData?.graphs ? (
        <GraphView graphs={graphData?.graphs} />
      ) : (
        <Loader
          variant="success"
          animation="border"
        />
      )}
      <hr />
    </PageTab>
  );
}
