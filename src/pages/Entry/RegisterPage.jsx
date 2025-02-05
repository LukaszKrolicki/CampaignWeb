import  { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import BackgroundWrapper from "../../components/BackgroundWrapper.jsx";
import FormInput from '../../components/FormInput.jsx';
import Button from '../../components/Button.jsx';

const RegisterPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    if (password === confirmPassword) {
      try {
        const response = await fetch('http://localhost:8080/api/entry/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email, password, balance: 100.00, role: 'USER' }),
        });

        if (response.ok) {
          navigate('/user-main');
        } else {
          const errorData = await response.json();
          alert(`Registration failed: ${errorData.message}`);
        }
      } catch (error) {
        console.error('Error during registration:', error);
        alert('An error occurred during registration. Please try again.');
      }
    } else {
      alert('Passwords do not match');
    }
  };

  return (
    <BackgroundWrapper imageUrl="/src/assets/background.svg">
      <div className="flex flex-col min-h-screen">
        <main className="flex-grow flex items-center justify-center">
          <form onSubmit={handleRegister} className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
            <h2 className="text-2xl font-bold mb-6 text-center">Register</h2>
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
            <FormInput
              label="Confirm Password"
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
            <Button type="submit" className="bg-green-600 text-white hover:bg-green-700">Register</Button>
            <div className="mt-4 text-center">
              <span>Already have an account? </span>
              <Link to="/login" className="text-blue-600 hover:underline">Login</Link>
            </div>
          </form>
        </main>
      </div>
    </BackgroundWrapper>
  );
};

export default RegisterPage;