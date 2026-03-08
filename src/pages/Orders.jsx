import { useApp } from '../context/AppContext';

export default function Orders() {
  const { meals } = useApp();
  
  // Mocking active orders for demonstration
  const myOrders = [
    { id: 'ord1', meal: meals[0], status: 'Confirmed', date: 'March 10, 2026' },
    { id: 'ord2', meal: meals[2], status: 'Pending', date: 'March 11, 2026' }
  ];

  return (
    <div className="px-4 sm:px-6 lg:px-8 xl:px-[7vw] py-12">
      <h1 className="text-4xl mb-8">My Orders</h1>
      
      <div className="space-y-4">
        {myOrders.map(order => (
          <div key={order.id} className="bg-white p-6 rounded-2xl border border-dark/10 flex flex-col sm:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-4">
              <img src={order.meal.images[0]} className="w-20 h-20 rounded-xl object-cover" alt={order.meal.title} />
              <div>
                <h3 className="font-display text-lg">{order.meal.title}</h3>
                <p className="text-sm text-gray-text">Pickup: {order.date}</p>
              </div>
            </div>
            <div className="text-right">
              <span className={`px-4 py-1 rounded-full text-xs font-bold ${order.status === 'Confirmed' ? 'bg-basil/10 text-basil' : 'bg-mustard/10 text-mustard'}`}>
                {order.status}
              </span>
              <p className="mt-2 font-display text-lg">₹{order.meal.price}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}