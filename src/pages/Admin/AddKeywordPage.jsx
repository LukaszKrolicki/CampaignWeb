import { useState, useEffect } from 'react';
import { useUser } from '../../contexts/UserContext';

const AddKeywordPage = () => {
  const [keywords, setKeywords] = useState([]);
  const [newKeyword, setNewKeyword] = useState('');
  const [error, setError] = useState('');
  const { token } = useUser();

  useEffect(() => {
    const fetchKeywords = async () => {
      const response = await fetch('http://localhost:8080/api/util/keywords', {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      const data = await response.json();
      setKeywords(data);
    };
    fetchKeywords();
  }, [token]);

  const handleAddKeyword = async () => {
    if (newKeyword.trim()) {
      try {
        const response = await fetch('http://localhost:8080/api/admin/keywords', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
          body: JSON.stringify({ cvalue: newKeyword }),
        });

        if (!response.ok) {
          const contentType = response.headers.get('content-type');
          if (contentType && contentType.includes('application/json')) {
            const errorData = await response.json();
            setError(errorData.message || 'Failed to add keyword1');
          } else {
            const errorText = await response.text();
            setError(errorText || 'Failed to add keyword2');
          }
        } else {
          setKeywords(prevKeywords => [...prevKeywords, { cvalue: newKeyword }]);
          setNewKeyword('');
          setError('');
        }
      } catch (error) {
        setError('Failed to add keyword3');
        console.error('Failed to add keyword:', error);
      }
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen mt-16 ml-16 mr-16">
      <h2 className="text-3xl font-bold mb-6">Add New Keyword</h2>
      <div className="mb-4">
        <input
          type="text"
          value={newKeyword}
          onChange={(e) => setNewKeyword(e.target.value)}
          placeholder="Enter keyword"
          className="w-full px-3 py-2 border rounded"
        />
        <button
          onClick={handleAddKeyword}
          className="mt-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
        >
          Add Keyword
        </button>
        {error && <p className="text-red-500 mt-2">{error}</p>}
      </div>
      <ul className="space-y-2">
        {keywords.map(keyword => (
          <li key={keyword.id} className="flex justify-between items-center bg-white p-4 rounded shadow">
            {keyword.cvalue}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AddKeywordPage;