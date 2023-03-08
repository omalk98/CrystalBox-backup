import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  ArcElement,
  Tooltip,
  Legend
} from 'chart.js';
import { Doughnut, Line, Bar } from 'react-chartjs-2';

import Requests from '../../../../../requests';

import { PageTab, Loader } from '../../../../../components/common';
import Icons from '../../../../../resources/icons';
import {
  GraphDailyData,
  GraphWeeklyData,
  GraphMonthlyData
} from './graph-data';

import './graph-styles.css';

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  PointElement,
  BarElement,
  LineElement,
  Title
);

function GraphChart({ title, graph, size }) {
  return (
    <div className={`graph-chart graph-chart-${size}`}>
      <h3>{title}</h3>
      <hr />
      {graph}
    </div>
  );
}

function GraphCharts({ graphs }) {
  return (
    <section className="graph-charts">
      <GraphChart
        title="Daily Gateway Usage"
        graph={<Doughnut data={GraphDailyData(graphs)} />}
        size="sm"
      />
      <GraphChart
        title="Weekly Gateway Usage"
        graph={<Bar data={GraphWeeklyData(graphs)} />}
        size="med"
      />
      <GraphChart
        title="Monthly Gateway Usage"
        graph={<Line data={GraphMonthlyData(graphs)} />}
        size="lg"
      />
    </section>
  );
}

function GraphView({ graphs }) {
  return graphs ? (
    <>
      <GraphCharts graphs={graphs} />
      <hr />
    </>
  ) : (
    <Loader
      variant="success"
      animation="border"
    />
  );
}

export default function Graphs() {
  const theme = useSelector((state) => state.theme);
  ChartJS.defaults.color = theme === 'light' ? '#000' : '#fff';

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
      <GraphView graphs={graphData?.graphs} />
    </PageTab>
  );
}
