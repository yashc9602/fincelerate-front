import React from 'react';
import { useNavigate } from 'react-router-dom';
import 'tailwindcss/tailwind.css';

const calculators = [
  { name: 'SIP Calculator', path: '/sipcalculator', image: '/path/to/sip-calculator-image.jpg' },
  { name: 'Lumpsum Calculator', path: '/lumpsumcalculator', image: '/path/to/lumpsum-calculator-image.jpg' },
  { name: 'STP Calculator', path: '/stpcalculator', image: '/path/to/stp-calculator-image.jpg' },
  { name: 'SWP Calculator', path: '/swpcalculator', image: '/path/to/swp-calculator-image.jpg' },
  { name: 'SIP Step Up Calculator', path: '/stepupsipcalculator', image: '/path/to/sip-step-up-calculator-image.jpg' },
];

const CalculatorsPage = () => {
  const navigate = useNavigate();

  const navigateToCalculator = (path) => {
    navigate(path);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
      <h1 className="text-4xl font-bold mb-8 text-gray-800">Financial Calculators</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {calculators.map((calculator) => (
          <div
            key={calculator.name}
            className="bg-white rounded-lg shadow-lg overflow-hidden cursor-pointer transition transform hover:scale-105"
            onClick={() => navigateToCalculator(calculator.path)}
          >
            <img src={calculator.image} alt={calculator.name} className="w-full h-40 object-cover" />
            <div className="p-4">
              <h2 className="text-2xl font-semibold text-gray-800">{calculator.name}</h2>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CalculatorsPage;
