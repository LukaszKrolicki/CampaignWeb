import { useState, useEffect } from 'react';
import { useUser } from '../../contexts/UserContext';

const UserListPage = () => {
  const [users, setUsers] = useState([]);
  const { token, user: loggedInUser } = useUser();

  useEffect(() => {
    const fetchUsers = async () => {
      const response = await fetch('http://localhost:8080/api/admin/users', {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      const data = await response.json();
      setUsers(data);
    };
    fetchUsers();
  }, [token]);

  const handleDeleteUser = async (id) => {
    try {
      await fetch(`http://localhost:8080/api/admin/users?id=${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      setUsers(users.filter(user => user.id !== id));
    } catch (error) {
      console.error('Failed to delete user:', error);
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen mt-16 ml-16 mr-16">
      <h2 className="text-3xl font-bold mb-6">User List</h2>
      <ul className="space-y-2">
        {users.map(user => (
          user.email !== loggedInUser.email && (
            <li key={user.id} className="flex justify-between items-center bg-white p-4 rounded shadow">
              {user.email}
              <button
                onClick={() => handleDeleteUser(user.id)}
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
              >
                Delete
              </button>
            </li>
          )
        ))}
      </ul>
    </div>
  );
};

export default UserListPage;