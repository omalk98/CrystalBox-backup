import React from 'react';
import Icons from '../../resources/icons';

const colorScheme = (opacity) => [
  `rgba(255, 99, 132, ${opacity})`,
  `rgba(54, 162, 235, ${opacity})`,
  `rgba(255, 206, 86, ${opacity})`,
  `rgba(153, 102, 255, ${opacity})`,
  `rgba(75, 192, 192, ${opacity})`,
  `rgba(255, 159, 64, ${opacity})`,
  `rgba(29, 185, 84, ${opacity})`,
  `rgba(254, 83, 187, ${opacity})`,
  `rgba(184, 251, 60, ${opacity})`,
  `rgba(255, 0, 0, ${opacity})`,
  `rgba(9, 188, 138, ${opacity})`,
  `rgba(0, 0, 0, ${opacity})`
];

// prettier-ignore
const chartDataset = (data) => (
  data.map((valueSet) => (
    {
      label: valueSet?.label,
      data: valueSet?.dataset,
      backgroundColor: colorScheme(0.5),
      borderColor: colorScheme(1),
      borderWidth: 1
    }
  ))
);

export const Toggles = {
  size: [
    { value: 'sm', text: 'Small', color: 'blue', icon: '' },
    { value: 'md', text: 'Medium', color: 'orange', icon: '' },
    { value: 'lg', text: 'Large', color: 'red', icon: '' }
  ],
  period: [
    { value: 'daily', text: 'Daily Stats' },
    { value: 'weekly', text: 'Weekly Stats' },
    { value: 'annual', text: 'Annual Stats' }
  ],
  type: [
    { value: 'bar', text: 'Bar Chart', icon: <Icons.Graph />, color: 'purple' },
    {
      value: 'line',
      text: 'Line Chart',
      icon: <Icons.Analytics />,
      color: 'pink'
    },
    {
      value: 'doughnut',
      text: 'Doughnut',
      icon: <Icons.DoughnutChart />,
      color: 'yellow'
    },
    {
      value: 'pie',
      text: 'Pie Chart',
      icon: <Icons.PieChart />,
      color: 'green'
    },
    {
      value: 'polar',
      text: 'Polar Area Chart',
      icon: <Icons.PolarChart />,
      color: 'blue'
    },
    {
      value: 'radar',
      text: 'Radar Chart',
      icon: <Icons.RadarChart />,
      color: 'orange'
    }
  ]
};

const graphData = (data, type) => {
  let dataSet = null;
  switch (type?.toLowerCase()) {
    case 'daily':
      dataSet = data?.daily;
      break;
    case 'weekly':
      dataSet = data?.weekly;
      break;
    case 'annual':
      dataSet = data?.annual;
      break;
    default:
      dataSet = data?.daily;
  }
  return {
    labels: dataSet?.labels,
    datasets: dataSet?.datasets ? chartDataset(dataSet.datasets) : []
  };
};

export default graphData;
