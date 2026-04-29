import { useState } from 'react';
import { useApp } from '../context/AppContext';

export default function AddMealModal({ isOpen, onClose }) {
  const { addMeal, currentUser } = useApp();
  const [formData, setFormData] = useState({
    title: '',
    price: '',
    description: '',
    category: 'North Indian',
    dietary: 'Veg',
    portions: '2'
  });

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    const newMeal = {
      id: 'm' + Date.now(),
      title: formData.title,
      description: formData.description,
      price: parseInt(formData.price),
      cookId: currentUser.id,
      images: ['https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=600'],
      rating: 0,
      reviews: 0,
      category: formData.category,
      dietary: formData.dietary,
      ingredients: ['Fresh ingredients', 'Love and Spices'],
      portionsAvailable: parseInt(formData.portions)
    };

    addMeal(newMeal);
    onClose();
    setFormData({ title: '', price: '', description: '', category: 'North Indian', dietary: 'Veg', portions: '2' });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-dark/40 backdrop-blur-sm">
      <div className="bg-white rounded-[2rem] p-8 w-full max-w-lg shadow-xl relative max-h-[90vh] overflow-y-auto">
        <button onClick={onClose} className="absolute top-6 right-6 text-gray-text hover:text-dark">
          <i className="fas fa-times text-xl"></i>
        </button>

        <h2 className="font-display text-3xl mb-6">Post New Meal</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-sm font-medium mb-1 block">Meal Title</label>
            <input 
              type="text" 
              required
              className="w-full p-3 rounded-xl bg-warm-white border-none focus:ring-2 focus:ring-mustard"
              value={formData.title}
              onChange={(e) => setFormData({...formData, title: e.target.value})}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium mb-1 block">Price (₹)</label>
              <input 
                type="number" 
                required
                className="w-full p-3 rounded-xl bg-warm-white border-none focus:ring-2 focus:ring-mustard"
                value={formData.price}
                onChange={(e) => setFormData({...formData, price: e.target.value})}
              />
            </div>
            <div>
              <label className="text-sm font-medium mb-1 block">Portions</label>
              <input 
                type="number" 
                required
                className="w-full p-3 rounded-xl bg-warm-white border-none focus:ring-2 focus:ring-mustard"
                value={formData.portions}
                onChange={(e) => setFormData({...formData, portions: e.target.value})}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium mb-1 block">Category</label>
              <select 
                className="w-full p-3 rounded-xl bg-warm-white border-none focus:ring-2 focus:ring-mustard"
                value={formData.category}
                onChange={(e) => setFormData({...formData, category: e.target.value})}
              >
                <option>North Indian</option>
                <option>South Indian</option>
                <option>Healthy</option>
                <option>Snacks</option>
                <option>Desserts</option>
              </select>
            </div>
            <div>
              <label className="text-sm font-medium mb-1 block">Dietary</label>
              <select 
                className="w-full p-3 rounded-xl bg-warm-white border-none focus:ring-2 focus:ring-mustard"
                value={formData.dietary}
                onChange={(e) => setFormData({...formData, dietary: e.target.value})}
              >
                <option>Veg</option>
                <option>Non-Veg</option>
                <option>Vegan</option>
              </select>
            </div>
          </div>

          <div>
            <label className="text-sm font-medium mb-1 block">Description</label>
            <textarea 
              required
              rows="3"
              className="w-full p-3 rounded-xl bg-warm-white border-none focus:ring-2 focus:ring-mustard resize-none"
              value={formData.description}
              onChange={(e) => setFormData({...formData, description: e.target.value})}
            ></textarea>
          </div>

          <button type="submit" className="w-full bg-mustard py-4 rounded-full font-bold hover:bg-mustard/90 transition-all mt-4">
            Publish Meal
          </button>
        </form>
      </div>
    </div>
  );
}