import React from 'react';
import MealListItem from './MealListItem';

const MealList = ({ meals, onEdit }) => {
  // Sort meals by date and time
  const sortedMeals = [...meals].sort((a, b) => new Date(b.date) - new Date(a.date));

  return (
    <div>
      <h2 className="font-extrabold">Loggade måltider</h2>
      <ul>
        {sortedMeals.map((meal, index) => (
          <li key={index}>
            <MealListItem meal={meal} onEdit={onEdit} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MealList;