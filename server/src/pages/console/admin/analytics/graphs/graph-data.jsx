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

export const GraphDailyData = (data) => ({
  labels: data?.labels,
  datasets: data ? chartDataset(data?.daily) : []
});

export const GraphWeeklyData = (data) => ({
  labels: data?.labels,
  datasets: data ? chartDataset(data?.weekly) : []
});

export const GraphMonthlyData = (data) => ({
  labels: data?.labels,
  datasets: data ? chartDataset(data?.monthly) : []
});
