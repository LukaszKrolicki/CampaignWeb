import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import MainPageLayout from '../../components/MainPageLayout.jsx';

const UserMainPage = () => {
  const [user, setUser] = useState(null);
  const [showMainOptions, setShowMainOptions] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    } else {
      navigate('/login');
    }
  }, [navigate]);

  useEffect(() => {
    if (location.pathname !== '/user-main') {
      setShowMainOptions(false);
    } else {
      setShowMainOptions(true);
    }
  }, [location]);

  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    navigate('/login');
  };

  const handleBack = () => {
    navigate('/user-main');
  };

  if (!user) {
    return null;
  }

  const mainOptions = [
    { path: 'create-product', title: 'Create Product', description: 'Add new product.' },
    { path: 'list-products', title: 'List of Products', description: 'Create campaigns for your products.' },
    { path: 'list-campaigns', title: 'List of Campaigns', description: 'Manage your marketing campaigns.' },
  ];

  return (
    <MainPageLayout
      user={user}
      onLogout={handleLogout}
      mainOptions={mainOptions}
      showMainOptions={showMainOptions}
      handleBack={handleBack}
    />
  );
};

export default UserMainPage;