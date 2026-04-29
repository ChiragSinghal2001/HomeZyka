import { useState } from 'react';

export default function ReviewModal({ isOpen, onClose, order, onReviewSubmitted }) {
  const [rating, setRating] = useState(5);
  const [text, setText] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen || !order) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const token = localStorage.getItem('homezayka_token');
      const res = await fetch('http://localhost:8080/api/reviews', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          mealId: order.mealId?._id || order.mealId,
          cookId: order.cookId?._id || order.cookId,
          rating,
          text
        })
      });

      if (res.ok) {
        onReviewSubmitted();
        onClose();
        setText('');
        setRating(5);
        alert('Review submitted successfully!');
      } else {
        const data = await res.json();
        alert(data.message || 'Failed to submit review');
      }
    } catch (err) {
      console.error(err);
      alert('Network error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-dark/40 backdrop-blur-sm">
      <div className="bg-white rounded-[2rem] w-full max-w-lg p-8 shadow-2xl relative">
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 w-10 h-10 rounded-full bg-warm-white flex items-center justify-center text-dark hover:bg-dark/5 transition-colors"
        >
          <i className="fas fa-times"></i>
        </button>

        <h2 className="font-display text-3xl mb-2">Write a Review</h2>
        <p className="text-gray-text mb-8">How was {order.mealId?.title || 'your meal'}?</p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex justify-center gap-2 mb-6">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                type="button"
                key={star}
                onClick={() => setRating(star)}
                className={`text-4xl transition-transform hover:scale-110 ${
                  star <= rating ? 'text-mustard' : 'text-gray-text/30'
                }`}
              >
                <i className="fas fa-star"></i>
              </button>
            ))}
          </div>

          <div>
            <label className="block text-sm font-bold text-dark mb-2 px-2">Your Experience</label>
            <textarea 
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Tell others what you loved about this meal..."
              className="w-full px-6 py-4 rounded-2xl bg-warm-white border-none focus:ring-2 focus:ring-mustard outline-none transition-all resize-none h-32"
              required
            ></textarea>
          </div>

          <button 
            type="submit" 
            disabled={isSubmitting}
            className="w-full bg-mustard hover:bg-mustard/90 disabled:opacity-50 text-dark py-4 rounded-full font-bold text-lg transition-transform active:scale-95 shadow-sm"
          >
            {isSubmitting ? 'Submitting...' : 'Post Review'}
          </button>
        </form>
      </div>
    </div>
  );
}
