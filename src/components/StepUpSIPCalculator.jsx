import React, { useState, useEffect } from 'react';
import { Pie } from 'react-chartjs-2';
import 'chart.js/auto';

export default function StepUpSipCalculator() {
  const [monthlyInvestment, setMonthlyInvestment] = useState(5000);
  const [years, setYears] = useState(10);
  const [growthRate, setGrowthRate] = useState(12);
  const [stepUpPercentage, setStepUpPercentage] = useState(10);

  const [totalInvested, setTotalInvested] = useState(0);
  const [expectedGains, setExpectedGains] = useState(0);
  const [finalValue, setFinalValue] = useState(0);

  useEffect(() => {
    const calculateStepUpSIP = () => {
      const monthlyRate = growthRate / 100 / 12;
      let investedAmount = 0;
      let futureValue = 0;
      let currentInvestment = monthlyInvestment;

      for (let year = 1; year <= years; year++) {
        for (let month = 1; month <= 12; month++) {
          investedAmount += currentInvestment;
          futureValue = (futureValue + currentInvestment) * (1 + monthlyRate);
        }
        currentInvestment *= 1 + stepUpPercentage / 100;
      }

      const gains = futureValue - investedAmount;
      setTotalInvested(investedAmount);
      setExpectedGains(gains);
      setFinalValue(futureValue);
    };

    calculateStepUpSIP();
  }, [monthlyInvestment, years, growthRate, stepUpPercentage]);

  const data = {
    labels: ['Total Invested', 'Expected Gains', 'Final Value'],
    datasets: [
      {
        data: [totalInvested, expectedGains, finalValue - totalInvested - expectedGains],
        backgroundColor: ['#ff6384', '#36a2eb', '#ffce56'],
        hoverBackgroundColor: ['#ff6384', '#36a2eb', '#ffce56'],
      },
    ],
  };

  return (
    <div className="container mx-auto p-5">
      <h2 className="text-2xl font-bold text-center mb-5">Step-Up SIP Calculator</h2>
      <div className="flex flex-col md:flex-row justify-around items-center mb-5">
        <div className="w-full md:w-1/3 p-2">
          <label className="block text-gray-700 mb-2">Monthly Investment (₹)</label>
          <input
            type="number"
            min="0"
            value={monthlyInvestment}
            onChange={(e) => setMonthlyInvestment(Number(e.target.value))}
            className="w-full p-2 border rounded"
          />
        </div>
        <div className="w-full md:w-1/3 p-2">
          <label className="block text-gray-700 mb-2">Investment Period (Years)</label>
          <input
            type="number"
            min="1"
            value={years}
            onChange={(e) => setYears(Number(e.target.value))}
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
        <div className="w-full md:w-1/3 p-2">
          <label className="block text-gray-700 mb-2">Step-Up Percentage (%)</label>
          <input
            type="number"
            min="0"
            value={stepUpPercentage}
            onChange={(e) => setStepUpPercentage(Number(e.target.value))}
            className="w-full p-2 border rounded"
          />
        </div>
      </div>
      <div className="flex flex-col md:flex-row justify-around items-center">
        <div className="w-full md:w-1/2 p-2">
          <div className="bg-gray-100 p-4 rounded-lg shadow-md text-center">
            <h3 className="text-lg font-semibold">Total Invested Amount</h3>
            <p className="text-2xl font-bold">{`₹ ${totalInvested.toFixed(2)}`}</p>
          </div>
          <div className="bg-gray-100 p-4 rounded-lg shadow-md text-center mt-4">
            <h3 className="text-lg font-semibold">Expected Gains</h3>
            <p className="text-2xl font-bold">{`₹ ${expectedGains.toFixed(2)}`}</p>
          </div>
          <div className="bg-gray-100 p-4 rounded-lg shadow-md text-center mt-4">
            <h3 className="text-lg font-semibold">Final Value</h3>
            <p className="text-2xl font-bold">{`₹ ${finalValue.toFixed(2)}`}</p>
          </div>
        </div>
        <div className="w-full md:w-1/4 p-2">
          <Pie data={data} />
        </div>
      </div>
    </div>
  );
}
