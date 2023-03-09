import React, { useState } from 'react';
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
  Legend,
  RadialLinearScale,
  Filler
} from 'chart.js';
import { Doughnut, Line, Bar, Pie, Radar, PolarArea } from 'react-chartjs-2';

import { capitalizeFirst } from '../common';
import GraphData, { Toggles } from './graph-data';

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
  Title,
  RadialLinearScale,
  Filler
);
ChartJS.defaults.scale.ticks.backdropColor = 'transparent';

function GraphRadioToggleSet({ state, setter, toggles, name, color }) {
  return (
    <div
      className={`graph-toggle graph-toggle-${name} ${
        color ? `glow-${color}` : ''
      }`}
    >
      {toggles?.map((toggle, i) => (
        <label
          title={toggle?.text}
          key={toggle?.value}
          htmlFor={`graph_${toggle?.value}`}
          className={`${state === toggle?.value ? 'active' : ''} ${
            toggle?.color ? `glow-${toggle?.color}` : ''
          }`}
        >
          {toggle?.icon || toggle?.icon === '' ? toggle?.icon : toggle?.text}
          <input
            id={`graph_${toggle?.value}`}
            name={`graph-${name}`}
            type="radio"
            onClick={() => setter(toggle?.value)}
            defaultChecked={i === 0}
          />
        </label>
      ))}
    </div>
  );
}

function GraphToggles({ size, setSize, period, setPeriod, type, setType }) {
  return (
    <nav className="graph-toggle-container">
      <GraphRadioToggleSet
        state={size}
        setter={setSize}
        toggles={Toggles.size}
        name="size"
        color="red"
      />
      <GraphRadioToggleSet
        state={period}
        setter={setPeriod}
        toggles={Toggles.period}
        name="period"
      />
      <GraphRadioToggleSet
        state={type}
        setter={setType}
        toggles={Toggles.type}
        name="type"
      />
      <hr />
    </nav>
  );
}

function GraphType({ type, data }) {
  switch (type?.toLowerCase()) {
    case 'bar':
      return <Bar data={data} />;
    case 'line':
      return <Line data={data} />;
    case 'doughnut':
      return <Doughnut data={data} />;
    case 'pie':
      return <Pie data={data} />;
    case 'radar':
      return <Radar data={data} />;
    case 'polar':
      return <PolarArea data={data} />;
    default:
      return <Doughnut data={data} />;
  }
}

function GraphChart({
  graphs,
  toggles,
  size = 'sm',
  period = 'daily',
  type = 'doughnut'
}) {
  const main_title = 'Gateway Usage';
  const [_size, setSize] = useState(size);
  const [_period, setPeriod] = useState(period);
  const [_type, setType] = useState(type);
  return (
    <div className={`graph-chart graph-chart-${_size}`}>
      {toggles ? (
        <GraphToggles
          size={_size}
          setSize={setSize}
          period={_period}
          setPeriod={setPeriod}
          type={_type}
          setType={setType}
        />
      ) : null}
      <h3>{`${capitalizeFirst(_period)} ${main_title}`}</h3>
      <hr />
      <GraphType
        type={_type}
        data={GraphData(_period, graphs)}
      />
    </div>
  );
}

function GraphCharts({ graphs }) {
  return (
    <section className="graph-charts">
      <GraphChart
        graphs={graphs}
        title="Daily Gateway Usage"
        size="sm"
        period="daily"
        type="doughnut"
      />
      <GraphChart
        graphs={graphs}
        title="Weekly Gateway Usage"
        size="md"
        period="weekly"
        type="bar"
      />
      <GraphChart
        graphs={graphs}
        title="Monthly Gateway Usage"
        size="lg"
        period="monthly"
        type="line"
      />
    </section>
  );
}

export default function GraphView({ graphs }) {
  const [summary, setSummary] = useState(false);
  const theme = useSelector((state) => state.theme);
  ChartJS.defaults.color = theme === 'light' ? '#000' : '#fff';
  return (
    <section className="graph-charts">
      <div className="users-options">
        <button
          type="button"
          className={`clear-input glow-${summary ? 'red' : 'purple'}`}
          onClick={() => setSummary((prev) => !prev)}
        >
          View&nbsp;
          {summary ? 'Details' : 'Summary'}
        </button>
      </div>
      {summary ? (
        <GraphCharts graphs={graphs} />
      ) : (
        <GraphChart
          toggles
          graphs={graphs}
          title="Daily Gateway Usage"
          size="sm"
        />
      )}
    </section>
  );
}
