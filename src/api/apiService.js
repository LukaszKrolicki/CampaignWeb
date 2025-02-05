const API_URL = 'http://localhost:8080/api';

export const login = async (email, password) => {
  const response = await fetch(`${API_URL}/entry/login?email=${email}&password=${password}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error('Login failed');
  }

  return response.json();
};


