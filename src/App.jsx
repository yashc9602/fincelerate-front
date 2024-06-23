import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Provider, useDispatch } from 'react-redux';
import Footer from './components/Footer';
import Header from './components/Header';
import Home from './components/Home';
import Signin from './components/Signin';
import Contact from './components/Contact';
import Privacy from './components/Privacy';
import Terms from './components/Terms';
import About from './components/About';
import ProfileForm from './components/ProfileForm'; // Import ProfileForm
import store from './redux/store';
import { loginSuccess } from './redux/authReducer';
import ProfileView from './components/ProfileView';
import SIPCalculator from './components/SipCalculator';
import LumpsumCalculator from './components/LumpsumCalculator';
import StepUpSIPCalculator from './components/StepUpSIPCalculator';
import SWPCalculator from './components/SWPCalculator';
import STPCalculator from './components/STPCalculator';
import BuyDreamCar from './components/DreamCar';
import DreamHouseGoal from './components/DreamHouse';
import ChildEducationGoal from './components/ChildPlan';
import ChildMarriageGoal from './components/ChildMarriage';
import BuildYourCorpus from './components/Corpus';
import PlanYourGoal from './components/PlanYourGoal';
import PlanYourRetirement from './components/RetirementCalc';
import GoalsPage from './components/Goals';
import PlanYourChildEducation from './components/ChildEducation';
import CalculatorsPage from './components/Calculators';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem('token');
    const user = JSON.parse(localStorage.getItem('user'));
    if (token && user) {
      dispatch(loginSuccess(user, token));
    }
  }, [dispatch]);

  return (
    <div>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/about" element={<About />} />
        <Route path="/profile" element={<ProfileForm />} /> 
        <Route path="/profile/view" element={<ProfileView />} />
        <Route path="/sipcalculator" element={<SIPCalculator />} />
        <Route path="/lumpsumcalculator" element={<LumpsumCalculator />} />
        <Route path="/stepupsipcalculator" element={<StepUpSIPCalculator />} />
        <Route path="/swpcalculator" element={<SWPCalculator />} />
        <Route path="/stpcalculator" element={<STPCalculator />} />
        <Route path="/dreamcar" element={<BuyDreamCar />} />
        <Route path="/dreamhouse" element={<DreamHouseGoal />} />
        <Route path="/childplan" element={<ChildEducationGoal />} />
        <Route path="/childmarriage" element={<ChildMarriageGoal />} />
        <Route path="/corpus" element={<BuildYourCorpus />} />
        <Route path="/planyourgoal" element={<PlanYourGoal />} />
        <Route path="/retirementcalculator" element={<PlanYourRetirement />} />
        <Route path="/goals" element={<GoalsPage />} />
        <Route path="/childeducation" element={<PlanYourChildEducation />} />
        <Route path="/calculators" element={<CalculatorsPage />} />

        
      </Routes>
      <Footer />
    </div>
  );
}

export default function AppWrapper() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  );
}
