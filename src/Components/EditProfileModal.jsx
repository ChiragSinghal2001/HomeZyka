import { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';

export default function EditProfileModal({ isOpen, onClose, user }) {
  const { setCurrentUser } = useApp();
  
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: '',
    bio: '',
    avatar: ''
  });

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || '',
        phone: user.phone || '',
        address: user.address || '',
        bio: user.bio || '',
        avatar: user.avatar || ''
      });
    }
  }, [user, isOpen]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedUser = { ...user, ...formData };
    setCurrentUser(updatedUser);
    localStorage.setItem('homezayka_user', JSON.stringify(updatedUser));
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-dark/40 backdrop-blur-sm p-4 transition-opacity">
      <div className="bg-white rounded-3xl w-full max-w-lg shadow-xl overflow-hidden max-h-[90vh] flex flex-col animate-fadeIn">
        <div className="flex items-center justify-between p-6 border-b border-dark/5">
          <h2 className="font-display text-2xl text-dark">Edit Profile</h2>
          <button onClick={onClose} className="w-8 h-8 flex items-center justify-center rounded-full bg-warm-white hover:bg-dark/5 transition-colors">
            <i className="fas fa-times text-dark"></i>
          </button>
        </div>
        
        <div className="p-6 overflow-y-auto">
          <form id="edit-profile-form" onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <label className="text-sm font-semibold text-dark px-1">Full Name</label>
              <div className="relative">
                <i className="fas fa-user absolute left-4 top-1/2 -translate-y-1/2 text-gray-text"></i>
                <input 
                  type="text" 
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full pl-12 pr-4 py-3 rounded-xl bg-warm-white/50 border-none focus:ring-2 focus:ring-mustard outline-none transition-all"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-dark px-1">Phone Number</label>
              <div className="relative">
                <i className="fas fa-phone absolute left-4 top-1/2 -translate-y-1/2 text-gray-text"></i>
                <input 
                  type="text" 
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full pl-12 pr-4 py-3 rounded-xl bg-warm-white/50 border-none focus:ring-2 focus:ring-mustard outline-none transition-all"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-dark px-1">Address</label>
              <div className="relative">
                <i className="fas fa-map-marker-alt absolute left-4 top-3 text-gray-text"></i>
                <textarea 
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  rows="2"
                  className="w-full pl-12 pr-4 py-3 rounded-xl bg-warm-white/50 border-none focus:ring-2 focus:ring-mustard outline-none transition-all resize-none"
                ></textarea>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-dark px-1">Avatar Image URL</label>
              <div className="relative">
                <i className="fas fa-image absolute left-4 top-1/2 -translate-y-1/2 text-gray-text"></i>
                <input 
                  type="url" 
                  name="avatar"
                  value={formData.avatar}
                  onChange={handleChange}
                  placeholder="https://example.com/image.jpg"
                  className="w-full pl-12 pr-4 py-3 rounded-xl bg-warm-white/50 border-none focus:ring-2 focus:ring-mustard outline-none transition-all text-sm"
                />
              </div>
            </div>

            {user?.role === 'cook' && (
              <div className="space-y-2">
                <label className="text-sm font-semibold text-dark px-1">Bio (About Your Cooking)</label>
                <textarea 
                  name="bio"
                  value={formData.bio}
                  onChange={handleChange}
                  rows="3"
                  className="w-full px-4 py-3 rounded-xl bg-warm-white/50 border-none focus:ring-2 focus:ring-mustard outline-none transition-all resize-none text-sm"
                  placeholder="Tell customers about your specialties..."
                ></textarea>
              </div>
            )}
          </form>
        </div>

        <div className="p-6 border-t border-dark/5 bg-warm-white/30 flex justify-end gap-3">
          <button 
            type="button" 
            onClick={onClose}
            className="px-6 py-3 rounded-full font-bold text-dark hover:bg-dark/5 transition-all text-sm"
          >
            Cancel
          </button>
          <button 
            type="submit" 
            form="edit-profile-form"
            className="bg-mustard hover:bg-mustard/90 text-dark px-8 py-3 rounded-full font-bold transition-all text-sm shadow-sm"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}