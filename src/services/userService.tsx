// import { baseUrl } from '../services/settings';

const API_URL = 'http://localhost:5661'; // Remplacez par l'URL de votre API

export const getUsers = async () => {
  const response = await fetch(`${API_URL}/admin/all`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || 'Erreur de connexion');
  }
  return data;
};

export default { getUsers };
