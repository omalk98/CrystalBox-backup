import React, { useState, useEffect } from 'react';

import Requests from '../../../../../requests';
import { PageTab, Loader } from '../../../../../components/common';
import GraphView from '../../../../../components/graph-chart';
import Icons from '../../../../../resources/icons';

export default function Graphs() {
  const [graphData, setGraphData] = useState({});
  const [summary, setSummary] = useState(true);
  const [refresh, setRefresh] = useState(null);
  const [animation, setAnimation] = useState(false);
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
  }, [refresh]);

  return (
    <PageTab
      type="admin"
      sub="analytics"
      title="Graphs"
      icon={<Icons.Graph />}
    >
      <div className="users-options">
        <button
          type="button"
          className={`clear-input glow-${summary ? 'red' : 'purple'}`}
          onClick={() => setSummary((prev) => !prev)}
        >
          View&nbsp;
          {summary ? 'Details' : 'Summary'}
        </button>
        <button
          type="button"
          className="clear-input glow-orange"
          onClick={() => {
            setRefresh({});
            setAnimation(true);
          }}
          onAnimationEnd={() => setAnimation(false)}
        >
          <Icons.Refresh className={animation ? 'spin-clockwise-once' : ''} />
          &nbsp;Refresh Data
        </button>
      </div>
      {graphData?.graphs ? (
        <GraphView
          graphs={graphData?.graphs}
          summary={summary}
        />
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
