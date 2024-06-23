import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import 'chart.js/auto';
import { differenceInMonths } from 'date-fns';

const inflationRate = 6 / 100;

export default function BuyYourDreamHouse() {
  const [houseValue, setHouseValue] = useState(5000000);
  const [purchaseDate, setPurchaseDate] = useState('');
  const [growthRate, setGrowthRate] = useState(10);

  const [futureHouseValue, setFutureHouseValue] = useState(0);
  const [sipAmount, setSipAmount] = useState(0);
  const [lumpsumAmount, setLumpsumAmount] = useState(0);
  const [numberOfMonths, setNumberOfMonths] = useState(0);
  const [numberOfYears, setNumberOfYears] = useState(0);
  const [graphData, setGraphData] = useState({
    labels: [],
    datasets: [
      {
        label: 'SIP Investment',
        data: [],
        borderColor: 'rgba(75, 192, 192, 1)',
        fill: false,
        tension: 0.1,
      },
      {
        label: 'Lumpsum Investment',
        data: [],
        borderColor: 'rgba(153, 102, 255, 1)',
        fill: false,
        tension: 0.1,
      },
    ],
  });

  useEffect(() => {
    if (purchaseDate) {
      const currentDate = new Date();
      const targetDate = new Date(purchaseDate);
      const months = differenceInMonths(targetDate, currentDate);
      const years = months / 12;
      const monthlyRate = growthRate / 100 / 12;
      const annualRate = growthRate / 100;

      const futureValue = houseValue * Math.pow(1 + inflationRate, years);
      setFutureHouseValue(futureValue);
      setNumberOfMonths(months);
      setNumberOfYears(years);

      const sip = futureValue * monthlyRate / (Math.pow(1 + monthlyRate, months) - 1);
      setSipAmount(sip);

      const lumpsum = futureValue / Math.pow(1 + annualRate, years);
      setLumpsumAmount(lumpsum);

      const graphPoints = Array.from({ length: months }, (_, i) => {
        const currentMonth = i + 1;
        const sipInvestment = sip * ((Math.pow(1 + monthlyRate, currentMonth) - 1) / monthlyRate) * (1 + monthlyRate);
        const lumpsumInvestment = lumpsum * Math.pow(1 + monthlyRate, currentMonth);
        return {
          month: currentMonth,
          sipInvestment,
          lumpsumInvestment,
        };
      });

      setGraphData({
        labels: graphPoints.map(point => `Month ${point.month}`),
        datasets: [
          {
            label: 'SIP Investment',
            data: graphPoints.map(point => point.sipInvestment),
            borderColor: 'rgba(75, 192, 192, 1)',
            fill: false,
            tension: 0.1,
          },
          {
            label: 'Lumpsum Investment',
            data: graphPoints.map(point => point.lumpsumInvestment),
            borderColor: 'rgba(153, 102, 255, 1)',
            fill: false,
            tension: 0.1,
          },
        ],
      });
    }
  }, [houseValue, purchaseDate, growthRate]);

  return (
    <div className="container mx-auto p-5">
      <h2 className="text-2xl font-bold text-center mb-5">Buy Your Dream House</h2>
      <div className="flex flex-col md:flex-row justify-around items-center mb-5">
        <div className="w-full md:w-1/3 p-2">
          <label className="block text-gray-700 mb-2">Current Value of the House (₹)</label>
          <input
            type="number"
            min="0"
            value={houseValue}
            onChange={(e) => setHouseValue(Number(e.target.value))}
            className="w-full p-2 border rounded"
          />
        </div>
        <div className="w-full md:w-1/3 p-2">
          <label className="block text-gray-700 mb-2">Date You Wish to Purchase On</label>
          <input
            type="date"
            value={purchaseDate}
            onChange={(e) => setPurchaseDate(e.target.value)}
            className="w-full p-2 border rounded"
          />
        </div>
        <div className="w-full md:w-1/3 p-2">
          <label className="block text-gray-700 mb-2">Expected Growth Rate (%)</label>
          <input
            type="number"
            min="0"
            value={growthRate}
            onChange={(e) => setGrowthRate(Number(e.target.value))}
            className="w-full p-2 border rounded"
          />
        </div>
      </div>
      <div className="flex flex-col md:flex-row justify-around items-center">
        <div className="w-full md:w-1/2 p-2">
          <Line
            data={graphData}
            options={{
              scales: {
                x: {
                  title: {
                    display: true,
                    text: 'Months',
                  },
                },
                y: {
                  title: {
                    display: true,
                    text: 'Value (₹)',
                  },
                  beginAtZero: true,
                },
              },
            }}
          />
        </div>
        <div className="w-full md:w-1/2 p-2">
          <div className="bg-gray-100 p-4 rounded-lg shadow-md text-center">
            <h3 className="text-lg font-semibold">Invest Monthly</h3>
            <p className="text-xl mt-4">Expected Value of the House on {new Date(purchaseDate).toLocaleDateString()}</p>
            <p className="text-2xl font-bold">{`₹ ${futureHouseValue.toFixed(2)}`}</p>
            <p className="text-xl mt-4">Number of Months to Invest:</p>
            <p className="text-2xl font-bold">{numberOfMonths}</p>
            <p className="text-xl mt-4">SIP Amount Per Month:</p>
            <p className="text-2xl font-bold">{`₹ ${sipAmount.toFixed(2)}`}</p>
          </div>
          <div className="bg-gray-100 p-4 rounded-lg shadow-md text-center mt-6">
            <h3 className="text-lg font-semibold">Invest One-time/Lumpsum</h3>
            <p className="text-xl mt-4">Expected Value of the House on {new Date(purchaseDate).toLocaleDateString()}</p>
            <p className="text-2xl font-bold">{`₹ ${futureHouseValue.toFixed(2)}`}</p>
            <p className="text-xl mt-4">Number of Years to Invest:</p>
            <p className="text-2xl font-bold">{numberOfYears.toFixed(2)}</p>
            <p className="text-xl mt-4">Lumpsum Amount to be Invested:</p>
            <p className="text-2xl font-bold">{`₹ ${lumpsumAmount.toFixed(2)}`}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
