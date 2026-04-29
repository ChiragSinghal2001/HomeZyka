// import { createContext, useState, useContext } from 'react';
// import { mockMeals, mockUsers } from '../data/mockData';

// const AppContext = createContext();

// export const AppProvider = ({ children }) => {
//   const [meals] = useState(mockMeals);
//   const [users] = useState(mockUsers);
//   const [currentUser, setCurrentUser] = useState(null);

//   const getCookById = (id) => users.find(u => u.id === id);
//   const getMealById = (id) => meals.find(m => m.id === id);

//   return (
//     <AppContext.Provider value={{ meals, users, currentUser, setCurrentUser, getCookById, getMealById }}>
//       {children}
//     </AppContext.Provider>
//   );
// };

// export const useApp = () => useContext(AppContext);

import { createContext, useState, useContext, useEffect } from 'react';
import { mockMeals, mockUsers } from '../data/mockData';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [meals, setMeals] = useState(mockMeals);
  const [users, setUsers] = useState(mockUsers);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    // Fetch meals
    fetch('http://localhost:8080/api/meals')
      .then(res => res.json())
      .then(data => {
        if(data && data.length > 0) setMeals(data);
      })
      .catch(err => console.error("Failed to fetch meals:", err));

    // Fetch cooks
    fetch('http://localhost:8080/api/users/cooks')
      .then(res => res.json())
      .then(data => {
        if(data && data.length > 0) {
          // Merge API cooks with any non-cook mock users
          setUsers(prev => [...prev.filter(u => u.role !== 'cook'), ...data]);
        }
      })
      .catch(err => console.error("Failed to fetch cooks:", err));

    // Load auth
    const storedUser = localStorage.getItem('homezayka_user');
    if (storedUser) {
      setCurrentUser(JSON.parse(storedUser));
    }
  }, []);

  const getCookById = (id) => users.find(u => u.id === id || u._id === id);
  const getMealById = (id) => meals.find(m => m.id === id || m._id === id);

  const addMeal = (newMeal) => {
    setMeals([newMeal, ...meals]);
  };

  return (
    <AppContext.Provider value={{ meals, users, currentUser, setCurrentUser, getCookById, getMealById, addMeal }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => useContext(AppContext);