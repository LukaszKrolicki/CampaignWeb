import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import MainPageLayout from '../../components/MainPageLayout.jsx';

const AdminMainPage = () => {
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
    if (location.pathname !== '/admin-main') {
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
    navigate('/admin-main');
  };

  if (!user) {
    return null;
  }

  const mainOptions = [
    { path: 'add-keyword', title: 'Add New Keyword', description: 'Add new keyword.' },
    { path: 'add-town', title: 'Add New Town', description: 'Add new town.' },
    { path: 'user-list', title: 'User List', description: 'Manage users.' },
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

export default AdminMainPage;