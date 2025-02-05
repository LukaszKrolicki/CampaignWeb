import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { UserProvider } from './contexts/UserContext';
import LoginPage from './pages/Entry/LoginPage.jsx';
import UserMainPage from './pages/User/UserMainPage.jsx';
import MainPage from './pages/Entry/MainPage.jsx';
import CreateProductPage from './pages/User/CreateProductPage.jsx';
import ListProductsPage from './pages/User/ListProductsPage.jsx';
import ListCampaignsPage from './pages/User/ListCampaignsPage.jsx';
import RegisterPage from "./pages/Entry/RegisterPage.jsx";
import AdminMainPage from "./pages/Admin/AdminMainPage.jsx";
import AddKeywordPage from "./pages/Admin/AddKeywordPage.jsx";
import AddTownPage from "./pages/Admin/AddTownPage.jsx";
import UserListPage from "./pages/Admin/UserListPage.jsx";

const App = () => (
  <UserProvider>
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/user-main" element={<UserMainPage />}>
          <Route path="create-product" element={<CreateProductPage />} />
          <Route path="list-products" element={<ListProductsPage />} />
          <Route path="list-campaigns" element={<ListCampaignsPage />} />
        </Route>
        <Route path="/admin-main" element={<AdminMainPage />}>
          <Route path="add-keyword" element={<AddKeywordPage />} />
          <Route path="add-town" element={<AddTownPage />} />
          <Route path="user-list" element={<UserListPage />} />
        </Route>
        <Route path="/" element={<MainPage />} />
      </Routes>
    </Router>
  </UserProvider>
);

export default App;