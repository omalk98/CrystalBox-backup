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

import Requests from '../../../Requests';

import { PageTab, Loader } from '../../../Components/Common';
import Icons from '../../../Resources/Icons';
import {
  AnalyticsDailyData,
  AnalyticsWeeklyData,
  AnalyticsMonthlyData
} from './AnalyticsData';

import './AnalyticsStyles.css';

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

function AnalyticsChart({ title, graph, size }) {
  return (
    <div className={`analytics-chart analytics-chart-${size}`}>
      <h3>{title}</h3>
      <hr />
      {graph}
    </div>
  );
}

function AnalyticsCharts({ graphs }) {
  return (
    <section className="analytics-charts">
      <AnalyticsChart
        title="Daily Gateway Usage"
        graph={<Doughnut data={AnalyticsDailyData(graphs)} />}
        size="sm"
      />
      <AnalyticsChart
        title="Weekly Gateway Usage"
        graph={<Bar data={AnalyticsWeeklyData(graphs)} />}
        size="med"
      />
      <AnalyticsChart
        title="Monthly Gateway Usage"
        graph={<Line data={AnalyticsMonthlyData(graphs)} />}
        size="lg"
      />
    </section>
  );
}

function AnalyticsView({ graphs }) {
  return graphs ? (
    <>
      <AnalyticsCharts graphs={graphs} />
      <hr />
    </>
  ) : (
    <Loader
      variant="success"
      animation="border"
    />
  );
}

export default function Analytics() {
  const theme = useSelector((state) => state.theme);
  ChartJS.defaults.color = theme === 'light' ? '#000' : '#fff';

  const [analyticsData, setAnalyticsData] = useState({});
  const privateRequest = Requests.Private.Hook();

  useEffect(() => {
    const controller = new AbortController();
    const getAnalytics = async () => {
      try {
        if (analyticsData.length) return;
        const res = await privateRequest?.request(
          Requests.Private.Get.analyticsData(controller.signal)
        );
        if (res.status !== 200) throw new Error('Session expired');
        setAnalyticsData(res.data);
      } catch {
        setAnalyticsData({});
      }
    };

    getAnalytics();

    return () => {
      controller.abort();
    };
  }, []);

  return (
    <PageTab
      type="admin"
      title="Analytics"
      icon={<Icons.Analytics />}
    >
      <AnalyticsView graphs={analyticsData?.graphs} />
    </PageTab>
  );
}
