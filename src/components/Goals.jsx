import React from 'react';
import { useNavigate } from 'react-router-dom';
import 'tailwindcss/tailwind.css';

const goals = [
  { name: 'Buy Your Dream Car', path: '/dreamcar', image: '/path/to/car-image.jpg' },
  { name: 'Buy Your Dream House', path: '/dreamhouse', image: '/path/to/house-image.jpg' },
  { name: 'Build Your Corpus', path: '/corpus', image: '/path/to/corpus-image.jpg' },
  { name: "Plan Your Child's Education", path: '/childeducation', image: '/path/to/education-image.jpg' },
  { name: "Plan Your Child's Marriage", path: '/childmarriage', image: '/path/to/marriage-image.jpg' },
  { name: 'Plan Your Retirement', path: '/retirementcalculator', image: '/path/to/retirement-image.jpg' },
];

const GoalsPage = () => {
  const navigate = useNavigate();

  const navigateToGoal = (path) => {
    navigate(path);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
      <h1 className="text-4xl font-bold mb-8 text-gray-800">Plan Your Goals</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {goals.map((goal) => (
          <div
            key={goal.name}
            className="bg-white rounded-lg shadow-lg overflow-hidden cursor-pointer transition transform hover:scale-105"
            onClick={() => navigateToGoal(goal.path)}
          >
            <img src={goal.image} alt={goal.name} className="w-full h-40 object-cover" />
            <div className="p-4">
              <h2 className="text-2xl font-semibold text-gray-800">{goal.name}</h2>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GoalsPage;
