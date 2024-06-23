import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import 'chart.js/auto';

export default function StpCalculator() {
  const [sourceInvestment, setSourceInvestment] = useState(100000);
  const [sourceReturns, setSourceReturns] = useState(8);
  const [transferAmount, setTransferAmount] = useState(1000);
  const [frequency, setFrequency] = useState(1); // Monthly
  const [targetPeriod, setTargetPeriod] = useState(12); // In months
  const [targetReturns, setTargetReturns] = useState(10);

  const [sourceGains, setSourceGains] = useState(0);
  const [targetGains, setTargetGains] = useState(0);
  const [finalValue, setFinalValue] = useState(0);
  const [totalGains, setTotalGains] = useState(0);
  const [graphData, setGraphData] = useState([]);

  useEffect(() => {
    const calculateSTP = () => {
      const sourceMonthlyRate = sourceReturns / 100 / 12;
      const targetMonthlyRate = targetReturns / 100 / 12;

      let remainingSource = sourceInvestment;
      let accumulatedTarget = 0;
      let growthData = [];

      for (let i = 0; i < targetPeriod; i++) {
        if (remainingSource < transferAmount) {
          transferAmount = remainingSource;
        }
        
        // Calculate gains in source fund
        let sourceGainsThisMonth = remainingSource * sourceMonthlyRate;
        remainingSource += sourceGainsThisMonth - transferAmount;

        // Calculate gains in target fund
        accumulatedTarget += transferAmount;
        let targetGainsThisMonth = accumulatedTarget * targetMonthlyRate;
        accumulatedTarget += targetGainsThisMonth;

        growthData.push({
          month: i + 1,
          remainingSource: Math.max(remainingSource, 0),
          accumulatedTarget: accumulatedTarget,
        });
      }

      setSourceGains(sourceInvestment * (1 + sourceMonthlyRate) ** targetPeriod - sourceInvestment);
      setTargetGains(accumulatedTarget - transferAmount * targetPeriod);
      setFinalValue(remainingSource + accumulatedTarget);
      setTotalGains((remainingSource + accumulatedTarget) - sourceInvestment);
      setGraphData(growthData);
    };

    calculateSTP();
  }, [sourceInvestment, sourceReturns, transferAmount, frequency, targetPeriod, targetReturns]);

  const data = {
    labels: graphData.map(data => `Month ${data.month}`),
    datasets: [
      {
        label: 'Remaining Source Fund',
        data: graphData.map(data => data.remainingSource),
        fill: false,
        borderColor: 'rgba(255, 99, 132, 1)',
        tension: 0.1,
      },
      {
        label: 'Accumulated Target Fund',
        data: graphData.map(data => data.accumulatedTarget),
        fill: false,
        borderColor: 'rgba(54, 162, 235, 1)',
        tension: 0.1,
      },
    ],
  };

  const options = {
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
  };

  return (
    <div className="container mx-auto p-5">
      <h2 className="text-2xl font-bold text-center mb-5">STP Calculator</h2>
      <div className="flex flex-col md:flex-row justify-around items-center mb-5">
        <div className="w-full md:w-1/4 p-2">
          <label className="block text-gray-700 mb-2">Investment in Source Fund (₹)</label>
          <input
            type="number"
            min="0"
            value={sourceInvestment}
            onChange={(e) => setSourceInvestment(Number(e.target.value))}
            className="w-full p-2 border rounded"
          />
        </div>
        <div className="w-full md:w-1/4 p-2">
          <label className="block text-gray-700 mb-2">Expected Returns from Source Fund (%)</label>
          <input
            type="number"
            min="0"
            value={sourceReturns}
            onChange={(e) => setSourceReturns(Number(e.target.value))}
            className="w-full p-2 border rounded"
          />
        </div>
        <div className="w-full md:w-1/4 p-2">
          <label className="block text-gray-700 mb-2">Amount to Transfer to Target Fund (₹)</label>
          <input
            type="number"
            min="0"
            value={transferAmount}
            onChange={(e) => setTransferAmount(Number(e.target.value))}
            className="w-full p-2 border rounded"
          />
        </div>
        <div className="w-full md:w-1/4 p-2">
          <label className="block text-gray-700 mb-2">Frequency of Transfer (Months)</label>
          <input
            type="number"
            min="1"
            value={frequency}
            onChange={(e) => setFrequency(Number(e.target.value))}
            className="w-full p-2 border rounded"
          />
        </div>
        <div className="w-full md:w-1/4 p-2">
          <label className="block text-gray-700 mb-2">Time Period to Stay Invested in Target Fund (Months)</label>
          <input
            type="number"
            min="1"
            value={targetPeriod}
            onChange={(e) => setTargetPeriod(Number(e.target.value))}
            className="w-full p-2 border rounded"
          />
        </div>
        <div className="w-full md:w-1/4 p-2">
          <label className="block text-gray-700 mb-2">Expected Returns from Target Fund (%)</label>
          <input
            type="number"
            min="0"
            value={targetReturns}
            onChange={(e) => setTargetReturns(Number(e.target.value))}
            className="w-full p-2 border rounded"
          />
        </div>
      </div>
      <div className="flex flex-col items-center mb-5">
        <div className="w-full md:w-2/3 p-2">
          <Line data={data} options={options} />
        </div>
      </div>
      <div className="flex flex-col md:flex-row justify-around items-center">
        <div className="w-full md:w-1/4 p-2">
          <div className="bg-gray-100 p-4 rounded-lg shadow-md text-center">
            <h3 className="text-lg font-semibold">Expected Gains from Source Fund</h3>
            <p className="text-2xl font-bold">{`₹ ${sourceGains.toFixed(2)}`}</p>
          </div>
        </div>
        <div className="w-full md:w-1/4 p-2">
          <div className="bg-gray-100 p-4 rounded-lg shadow-md text-center">
            <h3 className="text-lg font-semibold">Expected Gains from Target Fund</h3>
            <p className="text-2xl font-bold">{`₹ ${targetGains.toFixed(2)}`}</p>
          </div>
        </div>
        <div className="w-full md:w-1/4 p-2">
          <div className="bg-gray-100 p-4 rounded-lg shadow-md text-center">
            <h3 className="text-lg font-semibold">Expected Final Value of Complete Investment</h3>
            <p className="text-2xl font-bold">{`₹ ${finalValue.toFixed(2)}`}</p>
          </div>
        </div>
        <div className="w-full md:w-1/4 p-2">
          <div className="bg-gray-100 p-4 rounded-lg shadow-md text-center">
            <h3 className="text-lg font-semibold">Total Gains</h3>
            <p className="text-2xl font-bold">{`₹ ${totalGains.toFixed(2)}`}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
