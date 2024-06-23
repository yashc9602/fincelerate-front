import React, { useState } from 'react';
import { Line } from 'react-chartjs-2';
import 'tailwindcss/tailwind.css';

const PlanYourRetirement = () => {
  const [currentAge, setCurrentAge] = useState(30);
  const [retirementAge, setRetirementAge] = useState(60);
  const [investmentAmount, setInvestmentAmount] = useState(0);
  const [retirementCorpus, setRetirementCorpus] = useState(10000000);
  const [expectedGrowthRate, setExpectedGrowthRate] = useState(10);
  const [useInvestmentAmount, setUseInvestmentAmount] = useState(true);

  const calculateRetirement = () => {
    const yearsToInvest = retirementAge - currentAge;
    const monthsToInvest = yearsToInvest * 12;
    const monthlyRate = (expectedGrowthRate / 100) / 12;

    let SIPAmount = 0;
    let corpusNeeded = 0;

    if (useInvestmentAmount) {
      corpusNeeded = retirementCorpus;
      SIPAmount = (corpusNeeded * monthlyRate) / (Math.pow(1 + monthlyRate, monthsToInvest) - 1);
    } else {
      corpusNeeded = investmentAmount * Math.pow(1 + monthlyRate, monthsToInvest);
    }

    return {
      corpusNeeded: corpusNeeded.toFixed(2),
      SIPAmount: SIPAmount.toFixed(2),
      yearsToInvest: yearsToInvest.toFixed(1),
    };
  };

  const results = calculateRetirement();

  const chartData = {
    labels: Array.from({ length: results.yearsToInvest * 12 }, (_, i) => i + 1),
    datasets: [
      {
        label: 'Retirement Corpus Growth',
        data: Array.from({ length: results.yearsToInvest * 12 }, (_, i) => 
          useInvestmentAmount 
            ? results.SIPAmount * (Math.pow(1 + (expectedGrowthRate / 100) / 12, i + 1) - 1) / ((expectedGrowthRate / 100) / 12) 
            : results.corpusNeeded * Math.pow(1 + (expectedGrowthRate / 100) / 12, i + 1)),
        borderColor: 'rgba(54, 162, 235, 1)',
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
        fill: false,
      },
    ],
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="w-full max-w-6xl bg-white shadow-lg rounded-lg p-8">
        <h2 className="text-4xl font-bold mb-6 text-center text-gray-800">Plan Your Retirement</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div>
            <label className="block text-gray-700 font-semibold mb-2">Your Current Age</label>
            <input
              type="number"
              value={currentAge}
              onChange={(e) => setCurrentAge(Number(e.target.value))}
              className="w-full p-2 border rounded"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-semibold mb-2">Retirement Age</label>
            <input
              type="number"
              value={retirementAge}
              onChange={(e) => setRetirementAge(Number(e.target.value))}
              className="w-full p-2 border rounded"
            />
          </div>
          <div className="col-span-2">
            <label className="block text-gray-700 font-semibold mb-2">Do you know how much you can invest towards retirement?</label>
            <div className="flex items-center">
              <input
                type="radio"
                name="investmentOption"
                value="investAmount"
                checked={useInvestmentAmount}
                onChange={() => setUseInvestmentAmount(true)}
                className="mr-2"
              />
              <label className="mr-4">I know how much I can invest</label>
              <input
                type="radio"
                name="investmentOption"
                value="corpusAmount"
                checked={!useInvestmentAmount}
                onChange={() => setUseInvestmentAmount(false)}
                className="mr-2"
              />
              <label>I have a retirement corpus amount in mind</label>
            </div>
          </div>
          {useInvestmentAmount ? (
            <div className="col-span-2">
              <label className="block text-gray-700 font-semibold mb-2">I wish to save ₹</label>
              <input
                type="number"
                value={retirementCorpus}
                onChange={(e) => setRetirementCorpus(Number(e.target.value))}
                className="w-full p-2 border rounded"
              />
            </div>
          ) : (
            <div className="col-span-2">
              <label className="block text-gray-700 font-semibold mb-2">Monthly Investment Amount (₹)</label>
              <input
                type="number"
                value={investmentAmount}
                onChange={(e) => setInvestmentAmount(Number(e.target.value))}
                className="w-full p-2 border rounded"
              />
            </div>
          )}
          <div className="col-span-2">
            <label className="block text-gray-700 font-semibold mb-2">Expected Growth Rate of Your Investment (% p.a.)</label>
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
            <h3 className="text-2xl font-semibold mb-4">Investment Plan</h3>
            <p className="mb-2">Effective Corpus Needed: ₹{results.corpusNeeded}</p>
            <p className="mb-2">Monthly Amount to be Invested:</p>
            <p className="text-lg font-semibold mb-2">₹{results.SIPAmount}</p>
            <p className="mb-2">Number of Years to Invest:</p>
            <p className="text-lg font-semibold mb-2">{results.yearsToInvest}</p>
          </div>
          <div>
            <Line data={chartData} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlanYourRetirement;
