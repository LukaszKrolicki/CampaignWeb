import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useUser } from '../../contexts/UserContext';
import { login as loginUser } from '../../api/apiService';
import BackgroundWrapper from '../../components/BackgroundWrapper.jsx';
import FormInput from '../../components/FormInput.jsx';
import Button from '../../components/Button.jsx';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { login } = useUser();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const userData = await loginUser(email, password);
      console.log("User Data from API:", userData);
      if (!userData || !userData.normalUser.balance) {
        throw new Error("Invalid user data");
      }
      login(userData);
      console.log("User Logged In:", userData.normalUser.role);
      if (userData.normalUser.role === 'ADMIN') {
        navigate('/admin-main');
      } else {
        navigate('/user-main');
      }
    } catch (error) {
      console.error('Login Error:', error);
    }
  };

  return (
    <BackgroundWrapper imageUrl="/src/assets/background.svg">
      <div className="flex flex-col min-h-screen">
        <main className="flex-grow flex items-center justify-center">
          <form onSubmit={handleLogin} className="bg-white p-8 rounded shadow-md w-full max-w-md">
            <h2 className="text-2xl font-bold mb-6">Login</h2>
            <FormInput
              label="Email"
              type="text"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <FormInput
              label="Password"
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <Button type="submit" className="bg-blue-600 text-white">Login</Button>
            <div className="mt-4 text-center">
              <span>Don&#39;t have an account? </span>
              <Link to="/register" className="text-blue-600 hover:underline">Register</Link>
            </div>
          </form>
        </main>
      </div>
    </BackgroundWrapper>
  );
};

export default LoginPage;