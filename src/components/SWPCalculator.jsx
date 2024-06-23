import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import 'chart.js/auto';

export default function SwpCalculator() {
  const [totalInvestment, setTotalInvestment] = useState(1000000);
  const [withdrawalPerMonth, setWithdrawalPerMonth] = useState(10000);
  const [expectedReturns, setExpectedReturns] = useState(12);
  const [years, setYears] = useState(10);
  const [withdrawals, setWithdrawals] = useState(0);
  const [totalWithdrawn, setTotalWithdrawn] = useState(0);
  const [expectedGains, setExpectedGains] = useState(0);
  const [finalValue, setFinalValue] = useState(0);
  const [graphData, setGraphData] = useState([]);

  useEffect(() => {
    const calculateSWP = () => {
      const monthlyRate = expectedReturns / 100 / 12;
      let remainingInvestment = totalInvestment;
      let totalWithdrawnAmount = 0;
      let growthData = [];
      let monthlyWithdrawals = years * 12;

      for (let i = 1; i <= monthlyWithdrawals; i++) {
        remainingInvestment = remainingInvestment * (1 + monthlyRate) - withdrawalPerMonth;
        if (remainingInvestment < 0) {
          remainingInvestment = 0;
          monthlyWithdrawals = i - 1;
          break;
        }
        totalWithdrawnAmount += withdrawalPerMonth;
        growthData.push(remainingInvestment);
      }

      let expectedGainsValue = remainingInvestment - totalInvestment + totalWithdrawnAmount;
      setWithdrawals(monthlyWithdrawals);
      setTotalWithdrawn(totalWithdrawnAmount);
      setExpectedGains(expectedGainsValue > 0 ? expectedGainsValue : 0);
      setFinalValue(remainingInvestment > 0 ? remainingInvestment : 0);
      setGraphData(growthData);
    };

    calculateSWP();
  }, [totalInvestment, withdrawalPerMonth, expectedReturns, years]);

  const data = {
    labels: Array.from({ length: withdrawals }, (_, i) => `Month ${i + 1}`),
    datasets: [
      {
        label: 'Remaining Investment',
        data: graphData,
        fill: false,
        borderColor: 'rgba(75, 192, 192, 1)',
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
          text: 'Remaining Investment (₹)',
        },
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="container mx-auto p-5">
      <h2 className="text-2xl font-bold text-center mb-5">SWP Calculator</h2>
      <div className="flex flex-col md:flex-row justify-around items-center mb-5">
        <div className="w-full md:w-1/4 p-2">
          <label className="block text-gray-700 mb-2">Total Investment (₹)</label>
          <input
            type="number"
            min="0"
            value={totalInvestment}
            onChange={(e) => setTotalInvestment(Number(e.target.value))}
            className="w-full p-2 border rounded"
          />
        </div>
        <div className="w-full md:w-1/4 p-2">
          <label className="block text-gray-700 mb-2">Withdrawal per month (₹)</label>
          <input
            type="number"
            min="0"
            value={withdrawalPerMonth}
            onChange={(e) => setWithdrawalPerMonth(Number(e.target.value))}
            className="w-full p-2 border rounded"
          />
        </div>
        <div className="w-full md:w-1/4 p-2">
          <label className="block text-gray-700 mb-2">Expected Returns (%)</label>
          <input
            type="number"
            min="0"
            value={expectedReturns}
            onChange={(e) => setExpectedReturns(Number(e.target.value))}
            className="w-full p-2 border rounded"
          />
        </div>
        <div className="w-full md:w-1/4 p-2">
          <label className="block text-gray-700 mb-2">Years to Withdraw</label>
          <input
            type="number"
            min="1"
            value={years}
            onChange={(e) => setYears(Number(e.target.value))}
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
            <h3 className="text-lg font-semibold">Number of Withdrawals</h3>
            <p className="text-2xl font-bold">{withdrawals}</p>
          </div>
        </div>
        <div className="w-full md:w-1/4 p-2">
          <div className="bg-gray-100 p-4 rounded-lg shadow-md text-center">
            <h3 className="text-lg font-semibold">Total Withdrawn Amount</h3>
            <p className="text-2xl font-bold">{`₹ ${totalWithdrawn}`}</p>
          </div>
        </div>
        <div className="w-full md:w-1/4 p-2">
          <div className="bg-gray-100 p-4 rounded-lg shadow-md text-center">
            <h3 className="text-lg font-semibold">Expected Gains</h3>
            <p className="text-2xl font-bold">{`₹ ${expectedGains.toFixed(2)}`}</p>
          </div>
        </div>
        <div className="w-full md:w-1/4 p-2">
          <div className="bg-gray-100 p-4 rounded-lg shadow-md text-center">
            <h3 className="text-lg font-semibold">Expected Final Value</h3>
            <p className="text-2xl font-bold">{`₹ ${finalValue.toFixed(2)}`}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
