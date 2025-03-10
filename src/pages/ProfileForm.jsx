import WeightList from '../components/WeightList';
import { useDispatch, useSelector } from 'react-redux';
import {
  setGender,
  setWeight,
  setHeight,
  setAge,
  setActivityLevel,
  setGoal,
  setTDEE,
} from '../features/profileSlice';
import './ProfileForm.css';

const ProfileForm = () => {
  const dispatch = useDispatch();
  const {
    gender,
    weight,
    height,
    age,
    activityLevel,
    goal,
    tdee,
  } = useSelector((state) => state.profile);

  console.log("Profile component is rendering"); // Add this
  const weightArr = [
    {
        id: 1,
        weight: 100,
        date: "2023-01-01"
    },
    {
        id: 2,
        weight: 102,
        date: "2023-01-12"
    }
]

const calculateTDEE = (e) => {
  e.preventDefault();
  
  let bmr;
  if (gender === 'male') {
    bmr = 88.36 + (13.4 * weight) + (4.8 * height) - (5.7 * age);
  } else if (gender === 'female') {
    bmr = 447.6 + (9.2 * weight) + (3.1 * height) - (4.3 * age);
  }

  // Debugging logs
  console.log("BMR:", bmr);
  console.log("Activity Level:", activityLevel);
  console.log("Goal:", goal);

  const totalEnergyExpenditure = (bmr * activityLevel) + goal;
  dispatch(setTDEE(totalEnergyExpenditure));
};

const handleBirthDateChange = (e) => {
  const birthDate = new Date(e.target.value);
  const today = new Date();
  const calculatedAge = today.getFullYear() - birthDate.getFullYear();
  const monthDifference = today.getMonth() - birthDate.getMonth();

  if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
    dispatch(setAge(calculatedAge - 1));
  } else {
    dispatch(setAge(calculatedAge));
  }
};


  return (
    <>
    <form onSubmit={calculateTDEE}>
      <h1>Profil</h1>
      <label>
        <input type="radio" name='gender' value='male' onChange={() => dispatch(setGender('male'))} required />
        Man
      </label>
      <label>
        <input type="radio" name='gender' value='female' onChange={() => dispatch(setGender('female'))} required />
        Kvinna
      </label>

      <label htmlFor="weight">Vikt (kg):</label>
      <input type="number" name="weight" value={weight} onChange={(e) => dispatch(setWeight(e.target.value))} required />

      <label htmlFor="height">Längd (cm):</label>
      <input type="number" name="height" value={height} onChange={(e) => dispatch(setHeight(e.target.value))} required />

      <label htmlFor="birthdate">Födelsedatum (yyyy-mm-dd):</label>
      <input type="date" name="birthdate" onChange={handleBirthDateChange} required />

      <label htmlFor="activity-level">Aktivitetsnivå:</label>
      <select value={activityLevel} onChange={(e) => dispatch(setActivityLevel(e.target.value))}>
        <option value={1.2}>Stillasittande (lite eller ingen träning)</option>
        <option value={1.375}>Lätt aktiv (lätt träning/sport 1-3 dagar/vecka)</option>
        <option value={1.55}>Måttligt aktiv (måttlig träning/sport 3-5 dagar/vecka)</option>
        <option value={1.725}>Mycket aktiv (hård träning/sport 6-7 dagar/vecka)</option>
        <option value={1.9}>Elit/idrottare (mycket hård träning, fysiskt jobb)</option>
      </select>

      <label htmlFor="goal">Mål:</label>
      <select value={goal} onChange={(e) => dispatch(setGoal(parseFloat(e.target.value)))}>
        <option value="-500">Gå ner i vikt</option> 
        <option value="0">Hålla vikten</option>
        <option value="500">Gå upp i vikt</option>
        
      </select>

      <button type="submit">Spara</button>

      {tdee && (
  <h2>Ditt totala dagliga energibehov: <br />{tdee.toFixed(2)} kcal</h2>
)}

      
    </form>
    <WeightList weightData={weightArr} />
    </>
  );
}

export default ProfileForm;
