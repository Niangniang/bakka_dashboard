// import { baseUrl } from './settings';

const API_URL = 'http://localhost:5661'; // Remplacez par l'URL de votre API

const signup = async (nom, prenom, userName, password, telephone) => {
  const response = await fetch(`${API_URL}/admin/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ nom, prenom, userName, password, telephone }),
  });

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || 'Erreur de connexion');
  }
  return data;
};

export default { signup };
