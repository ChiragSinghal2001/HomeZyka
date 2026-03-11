import { createContext, useState, useContext } from 'react';
import { mockMeals, mockUsers } from '../data/mockData';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [meals] = useState(mockMeals);
  const [users] = useState(mockUsers);
  const [currentUser, setCurrentUser] = useState(null);

  const getCookById = (id) => users.find(u => u.id === id);
  const getMealById = (id) => meals.find(m => m.id === id);

  return (
    <AppContext.Provider value={{ meals, users, currentUser, setCurrentUser, getCookById, getMealById }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => useContext(AppContext);