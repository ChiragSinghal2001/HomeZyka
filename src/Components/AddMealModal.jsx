import { useState } from 'react';
import { useApp } from '../context/AppContext';
import { cuisines, categories, locations } from '../data/mockData';

export default function AddMealModal({ isOpen, onClose }) {
  const { addMeal, currentUser } = useApp();
  const [formData, setFormData] = useState({
    title: '',
    price: '',
    description: '',
    cuisine: 'North Indian',
    category: 'all',
    dietary: 'Veg',
    location: 'Agra',
    portions: '2',
    availableFrom: '',
    availableTo: '',
    imageStr: ''
  });

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('homezayka_token');
      if (!token) return alert('Not authenticated');

      const mealData = {
        title: formData.title,
        description: formData.description,
        price: parseInt(formData.price),
        cuisine: formData.cuisine,
        category: formData.category,
        location: formData.location,
        dietary: [formData.dietary],
        portionsAvailable: parseInt(formData.portions),
        portionsTotal: parseInt(formData.portions),
        availableFrom: new Date(formData.availableFrom),
        availableTo: new Date(formData.availableTo),
        images: formData.imageStr ? [formData.imageStr] : ['https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=600'],
      };

      const res = await fetch('http://localhost:8080/api/meals', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(mealData)
      });
      
      const data = await res.json();
      if (res.ok) {
        addMeal(data);
        onClose();
        setFormData({ title: '', price: '', description: '', cuisine: 'North Indian', category: 'all', dietary: 'Veg', location: 'Agra', portions: '2', availableFrom: '', availableTo: '', imageStr: '' });
        alert('Meal added successfully!');
      } else {
        alert(data.message || 'Failed to add meal');
      }
    } catch (err) {
      console.error(err);
      alert('Network error');
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({ ...formData, imageStr: reader.result });
      };
      reader.readAsDataURL(file);
    }
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

          <div>
            <label className="text-sm font-medium mb-1 block">Meal Image</label>
            <input 
              type="file" 
              accept="image/*"
              className="w-full p-3 rounded-xl bg-warm-white border-none focus:ring-2 focus:ring-mustard text-sm"
              onChange={handleImageChange}
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
              <label className="text-sm font-medium mb-1 block">Cuisine</label>
              <select 
                className="w-full p-3 rounded-xl bg-warm-white border-none focus:ring-2 focus:ring-mustard"
                value={formData.cuisine}
                onChange={(e) => setFormData({...formData, cuisine: e.target.value})}
              >
                {cuisines.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            <div>
              <label className="text-sm font-medium mb-1 block">Category</label>
              <select 
                className="w-full p-3 rounded-xl bg-warm-white border-none focus:ring-2 focus:ring-mustard"
                value={formData.category}
                onChange={(e) => setFormData({...formData, category: e.target.value})}
              >
                {categories.map(c => <option key={c.value} value={c.value}>{c.label}</option>)}
              </select>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
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
            <div>
              <label className="text-sm font-medium mb-1 block">Location</label>
              <select 
                className="w-full p-3 rounded-xl bg-warm-white border-none focus:ring-2 focus:ring-mustard"
                value={formData.location}
                onChange={(e) => setFormData({...formData, location: e.target.value})}
              >
                {locations.filter(loc => loc !== 'All Locations').map(loc => <option key={loc} value={loc}>{loc}</option>)}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium mb-1 block">Available From</label>
              <input 
                type="datetime-local" 
                required
                className="w-full p-3 rounded-xl bg-warm-white border-none focus:ring-2 focus:ring-mustard text-sm"
                value={formData.availableFrom}
                onChange={(e) => setFormData({...formData, availableFrom: e.target.value})}
              />
            </div>
            <div>
              <label className="text-sm font-medium mb-1 block">Available To</label>
              <input 
                type="datetime-local" 
                required
                className="w-full p-3 rounded-xl bg-warm-white border-none focus:ring-2 focus:ring-mustard text-sm"
                value={formData.availableTo}
                onChange={(e) => setFormData({...formData, availableTo: e.target.value})}
              />
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