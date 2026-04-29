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
  
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || '',
        phone: user.phone || '',
        address: user.address || '',
        bio: user.bio || '',
        avatar: user.avatar || ''
      });
      setErrors({});
    }
  }, [user, isOpen]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: null }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim() || formData.name.length < 2) {
      newErrors.name = 'Name must be at least 2 characters long';
    }
    if (!formData.phone || !/^[0-9]{10}$/.test(formData.phone)) {
      newErrors.phone = 'Phone number must be exactly 10 digits';
    }
    if (!formData.address.trim() || formData.address.length < 10) {
      newErrors.address = 'Please provide a valid address (min 10 chars)';
    }
    if (formData.avatar && !/^https?:\/\/.+/.test(formData.avatar)) {
      newErrors.avatar = 'Please provide a valid image URL';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    
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
          <form id="edit-profile-form" onSubmit={handleSubmit} className="space-y-5" noValidate>
            <div className="space-y-1">
              <label className="text-sm font-semibold text-dark px-1">Full Name <span className="text-tomato">*</span></label>
              <div className="relative">
                <i className="fas fa-user absolute left-4 top-1/2 -translate-y-1/2 text-gray-text"></i>
                <input 
                  type="text" 
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className={`w-full pl-12 pr-4 py-3 rounded-xl bg-warm-white/50 border outline-none transition-all ${
                    errors.name ? 'border-tomato/50 focus:border-tomato focus:ring-1 focus:ring-tomato/20' : 'border-transparent focus:border-mustard focus:ring-2 focus:ring-mustard/20'
                  }`}
                />
              </div>
              {errors.name && <p className="text-xs text-tomato px-1">{errors.name}</p>}
            </div>

            <div className="space-y-1">
              <label className="text-sm font-semibold text-dark px-1">Phone Number <span className="text-tomato">*</span></label>
              <div className="relative">
                <i className="fas fa-phone absolute left-4 top-1/2 -translate-y-1/2 text-gray-text"></i>
                <input 
                  type="tel" 
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  maxLength="10"
                  placeholder="e.g. 9876543210"
                  className={`w-full pl-12 pr-4 py-3 rounded-xl bg-warm-white/50 border outline-none transition-all ${
                    errors.phone ? 'border-tomato/50 focus:border-tomato focus:ring-1 focus:ring-tomato/20' : 'border-transparent focus:border-mustard focus:ring-2 focus:ring-mustard/20'
                  }`}
                />
              </div>
              {errors.phone && <p className="text-xs text-tomato px-1">{errors.phone}</p>}
            </div>

            <div className="space-y-1">
              <label className="text-sm font-semibold text-dark px-1">Address <span className="text-tomato">*</span></label>
              <div className="relative">
                <i className="fas fa-map-marker-alt absolute left-4 top-3 text-gray-text"></i>
                <textarea 
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  rows="2"
                  className={`w-full pl-12 pr-4 py-3 rounded-xl bg-warm-white/50 border outline-none transition-all resize-none ${
                    errors.address ? 'border-tomato/50 focus:border-tomato focus:ring-1 focus:ring-tomato/20' : 'border-transparent focus:border-mustard focus:ring-2 focus:ring-mustard/20'
                  }`}
                ></textarea>
              </div>
              {errors.address && <p className="text-xs text-tomato px-1">{errors.address}</p>}
            </div>

            <div className="space-y-1">
              <label className="text-sm font-semibold text-dark px-1">Avatar Image URL</label>
              <div className="relative">
                <i className="fas fa-image absolute left-4 top-1/2 -translate-y-1/2 text-gray-text"></i>
                <input 
                  type="url" 
                  name="avatar"
                  value={formData.avatar}
                  onChange={handleChange}
                  placeholder="https://example.com/image.jpg"
                  className={`w-full pl-12 pr-4 py-3 rounded-xl bg-warm-white/50 border outline-none transition-all text-sm ${
                    errors.avatar ? 'border-tomato/50 focus:border-tomato focus:ring-1 focus:ring-tomato/20' : 'border-transparent focus:border-mustard focus:ring-2 focus:ring-mustard/20'
                  }`}
                />
              </div>
              {errors.avatar && <p className="text-xs text-tomato px-1">{errors.avatar}</p>}
            </div>

            <div className="space-y-1">
              <label className="text-sm font-semibold text-dark px-1">Bio</label>
              <textarea 
                name="bio"
                value={formData.bio}
                onChange={handleChange}
                rows="3"
                maxLength="500"
                className="w-full px-4 py-3 rounded-xl bg-warm-white/50 border border-transparent focus:border-mustard focus:ring-2 focus:ring-mustard/20 outline-none transition-all resize-none text-sm"
                placeholder="Tell us about yourself..."
              ></textarea>
              <p className="text-xs text-gray-text px-1 text-right">{formData.bio?.length || 0}/500</p>
            </div>
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