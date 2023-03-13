import React from 'react';
import Icons from '../../resources/icons';

const colorScheme = (opacity) => [
  `rgba(255, 99, 132, ${opacity})`,
  `rgba(54, 162, 235, ${opacity})`,
  `rgba(255, 206, 86, ${opacity})`,
  `rgba(75, 192, 192, ${opacity})`,
  `rgba(153, 102, 255, ${opacity})`,
  `rgba(255, 159, 64, ${opacity})`
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
    { value: 'monthly', text: 'Monthly Stats' }
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

const GraphData = (type, data) => {
  let dataSet = null;
  switch (type?.toLowerCase()) {
    case 'daily':
      dataSet = data?.daily;
      break;
    case 'weekly':
      dataSet = data?.weekly;
      break;
    case 'monthly':
      dataSet = data?.monthly;
      break;
    default:
      dataSet = data?.daily;
  }
  return {
    labels: data?.labels,
    datasets: dataSet ? chartDataset(dataSet) : []
  };
};

export default GraphData;
