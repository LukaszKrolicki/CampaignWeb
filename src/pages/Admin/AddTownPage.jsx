import { useState, useEffect } from 'react';
import { useUser } from '../../contexts/UserContext';

const AddTownPage = () => {
  const [towns, setTowns] = useState([]);
  const [newTown, setNewTown] = useState('');
  const [error, setError] = useState('');
  const { token } = useUser();

  useEffect(() => {
    const fetchTowns = async () => {
      const response = await fetch('http://localhost:8080/api/util/towns', {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      const data = await response.json();
      setTowns(data);
    };
    fetchTowns();
  }, [token]);

  const handleAddTown = async () => {
    if (newTown.trim()) {
      try {
        const response = await fetch('http://localhost:8080/api/admin/towns', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
          body: JSON.stringify({ name: newTown }),
        });

        if (!response.ok) {
          const contentType = response.headers.get('content-type');
          if (contentType && contentType.includes('application/json')) {
            const errorData = await response.json();
            setError(errorData.message || 'Failed to add town1');
          } else {
            const errorText = await response.text();
            setError(errorText || 'Failed to add town2');
          }
        } else {
          setTowns(prevTowns => [...prevTowns, { name: newTown }]);
          setNewTown('');
          setError('');
        }
      } catch (error) {
        setError('Failed to add town3');
        console.error('Failed to add town:', error);
      }
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen mt-16 ml-16 mr-16">
      <h2 className="text-3xl font-bold mb-6">Add New Town</h2>
      <div className="mb-4">
        <input
          type="text"
          value={newTown}
          onChange={(e) => setNewTown(e.target.value)}
          placeholder="Enter town"
          className="w-full px-3 py-2 border rounded"
        />
        <button
          onClick={handleAddTown}
          className="mt-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
        >
          Add Town
        </button>
        {error && <p className="text-red-500 mt-2">{error}</p>}
      </div>
      <ul className="space-y-2">
        {towns.map(town => (
          <li key={town.id} className="flex justify-between items-center bg-white p-4 rounded shadow">
            {town.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AddTownPage;