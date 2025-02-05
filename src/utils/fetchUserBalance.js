export const fetchUserBalance = async (setUser, user, token) => {
  try {
    const response = await fetch('http://localhost:8080/api/user/balance', {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    const balance = await response.json();
    setUser({ ...user, balance });
  } catch (error) {
    console.error('Error fetching user balance:', error);
  }
};