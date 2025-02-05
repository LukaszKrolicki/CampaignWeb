import 'react';
import { useUser } from '../contexts/UserContext';

// eslint-disable-next-line react/prop-types
const Header = ({ onLogout }) => {
  const { user } = useUser();

  return (
    <header className="bg-white shadow-md py-4">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">
          {user?.role === 'ADMIN' ? `Welcome, admin ${user.email} 👋` : `Welcome, ${user?.email || 'Guest'} 👋`}
        </h1>
        <div className="flex items-center space-x-4">
          {user?.role !== 'ADMIN' && (
            <span className="text-gray-600">
              💸 Balance: ${user?.balance ? user.balance.toFixed(2) : '0.00'}
            </span>
          )}
          <button
            onClick={onLogout}
            className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
          >
            ✖️ Logout
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;