import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const options = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: 'top',
      labels: {
        color: 'black',
        font: {
          size: 16,
        },
      },
    },
    title: {
      display: true,
      text: 'Revenue Chart of sales',
      font: {
        size: 20,
      },
    },
  },
};


const data = {
  labels:['January', 'February', 'March', 'April', 'May', 'June','July', 'August', 'September', 'October', 'November', 'December'],
  datasets: [
    {
      label: 'Revenue',
      data: [18,26,40,48,57,77,89,100,123,120,144,208.9],
      backgroundColor: 'rgba(54, 162, 235, 0.2)',
      borderColor: 'rgba(54, 162, 235, 1)',
      borderWidth: 1,
    },
  ],
};

const RevenueChart = () => {
  return (
    <div className='h-[20rem]'>
      <Bar options={options} data={data} />
    </div>
  );
};

export default RevenueChart;
