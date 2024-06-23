import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const ProfileView = () => {
  const [profile, setProfile] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetch('http://localhost:3000/server/profile', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem('token')
      }
    })
      .then(response => response.json())
      .then(data => {
        if (data.success) {
          setProfile(data.profile);
        } else {
          console.error('Failed to fetch profile', data.message);
        }
      });
  }, []);

  if (!profile) {
    return <div>Loading...</div>;
  }

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-6">Your Profile</h2>
      <div className="bg-white shadow-md rounded-lg p-6 space-y-4">
        <div>
          <h3 className="text-lg font-semibold">Investment Preference</h3>
          <p>{profile.wouldInvest === 'yes' ? 'Yes' : 'No'}</p>
        </div>
        <div>
          <h3 className="text-lg font-semibold">Yearly Income</h3>
          <p>₹{profile.yearlyIncome}</p>
        </div>
        <div>
          <h3 className="text-lg font-semibold">Source of Income</h3>
          <p>{profile.sourceOfIncome}</p>
        </div>
        <div>
          <h3 className="text-lg font-semibold">Used Buy Now Pay Later</h3>
          <p>{profile.usedBuyNowPayLater === 'yes' ? 'Yes' : 'No'}</p>
        </div>
        <div>
          <h3 className="text-lg font-semibold">Currently Invested</h3>
          <p>{profile.currentlyInvested === 'yes' ? 'Yes' : 'No'}</p>
        </div>
        <div>
          <h3 className="text-lg font-semibold">Current Portfolio Size</h3>
          <p>{profile.portfolioSize}</p>
        </div>
        <div>
          <h3 className="text-lg font-semibold">Investment Options</h3>
          <ul>
            {profile.investmentOptions.map(option => (
              <li key={option}>{option}</li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="text-lg font-semibold">Investment Duration</h3>
          <p>{profile.investmentDuration} years</p>
        </div>
        <div>
          <h3 className="text-lg font-semibold">Risk Tolerance</h3>
          <p>{profile.riskTolerance}</p>
        </div>
        <button
          onClick={() => navigate('/profile/edit')}
          className="px-4 py-2 bg-blue-500 text-white rounded-md"
        >
          Edit Profile
        </button>
      </div>
    </div>
  );
};

export default ProfileView;
