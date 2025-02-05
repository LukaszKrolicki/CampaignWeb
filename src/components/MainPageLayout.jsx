import { Link, Outlet } from 'react-router-dom';
import Header from './Header.jsx';
import Footer from './Footer.jsx';
import '../styles/styles.css';

const MainPageLayout = ({ user, onLogout, mainOptions, showMainOptions, handleBack }) => {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-r from-blue-100 to-purple-100">
      <Header user={user} onLogout={onLogout} />
      <main className="flex-grow flex items-center justify-center p-6 relative">
        {showMainOptions ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-6xl">
            {/* eslint-disable-next-line react/prop-types */}
            {mainOptions.map((option) => (
              <Link key={option.path} to={option.path} className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow transform hover:scale-105">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">{option.title}</h2>
                <p className="text-gray-600">{option.description}</p>
              </Link>
            ))}
          </div>
        ) : (
          <div className="w-full mx-auto">
            <button onClick={handleBack} className="back-button">Back</button>
            <Outlet />
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default MainPageLayout;