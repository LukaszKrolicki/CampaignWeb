import { Link } from 'react-router-dom';
import BackgroundWrapper from "../../components/BackgroundWrapper.jsx";
import Button from '../../components/Button.jsx';

const MainPage = () => {
  return (
    <BackgroundWrapper imageUrl="/src/assets/background.svg">
      <div className="flex items-center justify-center h-screen">
        <div className="text-center bg-white p-8 rounded-2xl shadow-lg w-full max-w-screen-lg">
          <h1 className="text-3xl font-bold mb-4 text-gray-800">CampaignSys</h1>
          <p className="text-gray-600 mb-6">Join us and manage your marketing campaigns.</p>
          <div className="flex gap-4 justify-center">
            <Link to="/login">
              <Button className="bg-blue-500 text-white hover:bg-blue-600"> 🔑 Login</Button>
            </Link>
            <Link to="/register">
              <Button className="bg-green-500 text-white hover:bg-green-600">🔐 Register</Button>
            </Link>
          </div>
        </div>
      </div>
    </BackgroundWrapper>
  );
};

export default MainPage;