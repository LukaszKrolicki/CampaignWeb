import { useState } from 'react';
import { useUser } from '../../contexts/UserContext.jsx';

const CreateProductPage = () => {
  const [name, setName] = useState('');
  const [showPopup, setShowPopup] = useState(false);
  const { token } = useUser();


  const handleCreateProduct = async (e) => {
    e.preventDefault();

    console.log("Token before request:", token);

    if (!token) {
      console.error("No token available. User might not be logged in.");
      return;
    }

    try {
      const response = await fetch('http://localhost:8080/api/user/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ name }),
      });

      if (response.ok) {
        setShowPopup(true);
        setTimeout(() => setShowPopup(false), 1500);
        setName('');
      } else {
        console.error('Failed to create product:', await response.text());
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center mt-5">
      <form onSubmit={handleCreateProduct} className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6">Create Product</h2>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="name">Product Name</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-3 py-2 border rounded"
            required
          />
        </div>
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded w-full">Create</button>
      </form>
      {showPopup && (
        <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-4 rounded shadow-md">
            <p className="text-green-600">Product created successfully!</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default CreateProductPage;
