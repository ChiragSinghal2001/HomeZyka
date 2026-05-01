/* eslint-disable react-refresh/only-export-components */
import { createContext, useState } from 'react';
import { mockMeals } from '../data/mockData';

export const FoodContext = createContext();

export const FoodProvider = ({ children }) => {
  const [meals, setMeals] = useState(mockMeals);
  const [orders] = useState([]);

  const bookMeal = (mealId, portions) => {
    setMeals(prev => prev.map(m => 
      m.id === mealId ? { ...m, portionsAvailable: m.portionsAvailable - portions } : m
    ));
    // Add to order history
  };

  return (
    <FoodContext.Provider value={{ meals, orders, bookMeal }}>
      {children}
    </FoodContext.Provider>
  );
};