import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import 'chart.js/auto';

export default function SipCalculator() {
  const [sipAmount, setSipAmount] = useState(5000);
  const [years, setYears] = useState(10);
  const [expectedRate, setExpectedRate] = useState(12);
  const [investmentGrowth, setInvestmentGrowth] = useState([]);
  const [totalInvested, setTotalInvested] = useState(0);
  const [expectedGains, setExpectedGains] = useState(0);
  const [expectedFutureValue, setExpectedFutureValue] = useState(0);

  useEffect(() => {
    const calculateSIP = () => {
      let totalInvestedAmount = sipAmount * 12 * years;
      let totalValue = 0;
      let growthData = [];

      for (let i = 1; i <= years; i++) {
        totalValue += sipAmount * 12 * ((1 + expectedRate / 100) ** i);
        growthData.push(totalValue);
      }

      setInvestmentGrowth(growthData);
      setTotalInvested(totalInvestedAmount);
      setExpectedGains(totalValue - totalInvestedAmount);
      setExpectedFutureValue(totalValue);
    };

    calculateSIP();
  }, [sipAmount, years, expectedRate]);

  const data = {
    labels: Array.from({ length: years }, (_, i) => `Year ${i + 1}`),
    datasets: [
      {
        label: 'Expected Future Value',
        data: investmentGrowth,
        backgroundColor: 'rgba(54, 162, 235, 0.6)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="container mx-auto p-5">
      <h2 className="text-4xl font-bold text-center mb-16">SIP Calculator</h2>
      <div className="flex flex-col md:flex-row justify-around items-center mb-5">
        <div className="w-full md:w-1/3 p-2">
          <label className="block text-gray-700 mb-2">Monthly SIP Amount (₹)</label>
          <input
            type="range"
            min="1000"
            max="100000"
            value={sipAmount}
            onChange={(e) => setSipAmount(Number(e.target.value))}
            className="w-full"
          />
          <span className="block text-center mt-2">{`₹ ${sipAmount}`}</span>
        </div>
        <div className="w-full md:w-1/3 p-2">
          <label className="block text-gray-700 mb-2">Number of Years</label>
          <input
            type="range"
            min="1"
            max="30"
            value={years}
            onChange={(e) => setYears(Number(e.target.value))}
            className="w-full"
          />
          <span className="block text-center mt-2">{years} Years</span>
        </div>
        <div className="w-full md:w-1/3 p-2">
          <label className="block text-gray-700 mb-2">Expected Annual Return (%)</label>
          <input
            type="range"
            min="1"
            max="30"
            value={expectedRate}
            onChange={(e) => setExpectedRate(Number(e.target.value))}
            className="w-full"
          />
          <span className="block text-center mt-2">{expectedRate} %</span>
        </div>
      </div>
      <div className="flex flex-col items-center mb-5">
        <div className="w-full md:w-1/2 p-2">
          <Bar data={data} options={{ maintainAspectRatio: false }} />
        </div>
      </div>
      <div className="flex flex-col md:flex-row justify-around items-center">
        <div className="w-full md:w-1/4 p-2">
          <div className="bg-gray-100 p-4 rounded-lg shadow-md text-center">
            <h3 className="text-lg font-semibold">Monthly SIP Amount</h3>
            <p className="text-2xl font-bold">{`₹ ${sipAmount}`}</p>
          </div>
        </div>
        <div className="w-full md:w-1/4 p-2">
          <div className="bg-gray-100 p-4 rounded-lg shadow-md text-center">
            <h3 className="text-lg font-semibold">Total Invested Amount</h3>
            <p className="text-2xl font-bold">{`₹ ${totalInvested}`}</p>
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
            <h3 className="text-lg font-semibold">Expected Future Value</h3>
            <p className="text-2xl font-bold">{`₹ ${expectedFutureValue.toFixed(2)}`}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
