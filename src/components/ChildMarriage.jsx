import React, { useState } from 'react';
import { Line } from 'react-chartjs-2';
import 'tailwindcss/tailwind.css';

const ChildMarriageGoal = () => {
  const [currentAge, setCurrentAge] = useState(5);
  const [investmentAmount, setInvestmentAmount] = useState(1000000);
  const [withdrawalAge, setWithdrawalAge] = useState(25);
  const [expectedGrowthRate, setExpectedGrowthRate] = useState(10);

  const calculateInvestment = () => {
    const yearsToInvest = withdrawalAge - currentAge;
    const monthsToInvest = yearsToInvest * 12;

    const monthlyRate = (expectedGrowthRate / 100) / 12;
    const lumpSumRate = (expectedGrowthRate / 100);

    const SIPAmount = (investmentAmount * monthlyRate) / (Math.pow(1 + monthlyRate, monthsToInvest) - 1);
    const lumpSumAmount = investmentAmount / Math.pow(1 + lumpSumRate, yearsToInvest);

    return {
      investmentAmount: investmentAmount.toFixed(2),
      SIPAmount: SIPAmount.toFixed(2),
      monthsToInvest,
      lumpSumAmount: lumpSumAmount.toFixed(2),
      yearsToInvest: yearsToInvest.toFixed(1),
    };
  };

  const results = calculateInvestment();

  const chartData = {
    labels: Array.from({ length: results.monthsToInvest }, (_, i) => i + 1),
    datasets: [
      {
        label: 'Investment Growth (Monthly)',
        data: Array.from({ length: results.monthsToInvest }, (_, i) => results.SIPAmount * (Math.pow(1 + (expectedGrowthRate / 100) / 12, i + 1) - 1) / ((expectedGrowthRate / 100) / 12)),
        borderColor: 'rgba(54, 162, 235, 1)',
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
        fill: false,
      },
      {
        label: 'Investment Growth (Lumpsum)',
        data: Array.from({ length: results.monthsToInvest }, (_, i) => results.lumpSumAmount * Math.pow(1 + (expectedGrowthRate / 100) / 12, i + 1)),
        borderColor: 'rgba(255, 99, 132, 1)',
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        fill: false,
      },
    ],
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="w-full max-w-6xl bg-white shadow-lg rounded-lg p-8">
        <h2 className="text-4xl font-bold mb-6 text-center text-gray-800">Plan Your Child's Marriage</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div>
            <label className="block text-gray-700 font-semibold mb-2">Current Age of Child (years)</label>
            <input
              type="number"
              value={currentAge}
              onChange={(e) => setCurrentAge(Number(e.target.value))}
              className="w-full p-2 border rounded"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-semibold mb-2">Investment Amount for Child's Marriage (₹)</label>
            <input
              type="number"
              value={investmentAmount}
              onChange={(e) => setInvestmentAmount(Number(e.target.value))}
              className="w-full p-2 border rounded"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-semibold mb-2">Age at which you wish to withdraw (years)</label>
            <input
              type="number"
              value={withdrawalAge}
              onChange={(e) => setWithdrawalAge(Number(e.target.value))}
              className="w-full p-2 border rounded"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-semibold mb-2">Expected Growth Rate of Investment (% p.a.)</label>
            <input
              type="number"
              value={expectedGrowthRate}
              onChange={(e) => setExpectedGrowthRate(Number(e.target.value))}
              className="w-full p-2 border rounded"
            />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-2xl font-semibold mb-4">Monthly Investment</h3>
            <p className="mb-2">Expected value of the investment at age {withdrawalAge}:</p>
            <p className="text-lg font-semibold mb-2">₹{results.investmentAmount}</p>
            <p className="mb-2">Monthly Amount to be invested:</p>
            <p className="text-lg font-semibold mb-2">₹{results.SIPAmount}</p>
            <p className="mb-2">Number of Months to invest:</p>
            <p className="text-lg font-semibold mb-2">{results.monthsToInvest}</p>
          </div>
          <div>
            <h3 className="text-2xl font-semibold mb-4">One-time/Lumpsum Investment</h3>
            <p className="mb-2">Expected value of the investment at age {withdrawalAge}:</p>
            <p className="text-lg font-semibold mb-2">₹{results.investmentAmount}</p>
            <p className="mb-2">Lumpsum Amount to be invested:</p>
            <p className="text-lg font-semibold mb-2">₹{results.lumpSumAmount}</p>
            <p className="mb-2">Number of Years to invest:</p>
            <p className="text-lg font-semibold mb-2">{results.yearsToInvest}</p>
          </div>
        </div>
        <div className="mt-10">
          <Line data={chartData} />
        </div>
      </div>
    </div>
  );
};

export default ChildMarriageGoal;
