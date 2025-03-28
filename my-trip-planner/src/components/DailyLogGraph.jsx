import React from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const DailyLogLineGraph = ({ logs }) => {
  if (!logs || logs.length === 0) {
    return <p>No log data available to display the line graph.</p>;
  }
  const labels = logs.map(
    (log) => `Cycle ${log.cycle}, Day ${log.day}`
  );

  const dailyDrivingData = logs.map(log => log.daily_driving_hours || 0);
  const effectiveDrivingData = logs.map(log => log.effective_driving_hours || 0);
  const restHoursData = logs.map(log => log.rest_hours || 0);

  // Prepare Chart.js data object
  const data = {
    labels,
    datasets: [
      {
        label: 'Daily Driving Hours',
        data: dailyDrivingData,
        borderColor: 'rgb(54, 162, 235)',    
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
        tension: 0.3, // line smoothness
        fill: false
      },
      {
        label: 'Effective Driving Hours',
        data: effectiveDrivingData,
        borderColor: 'rgb(75, 192, 192)',    
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        tension: 0.3,
        fill: false
      },
      {
        label: 'Rest Hours',
        data: restHoursData,
        borderColor: 'rgb(255, 99, 132)',    
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        tension: 0.3,
        fill: false
      },
    ],
  };

  // Chart options
  const options = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: 'Daily ELD Log Line Graph',
      },
      legend: {
        position: 'top',
      },
      tooltip: {
        mode: 'index',
        intersect: false,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Hours',
        },
      },
      x: {
        title: {
          display: true,
          text: 'Log Entries',
        },
      },
    },
  };

  return <Line data={data} options={options} />;
};

export default DailyLogLineGraph;
