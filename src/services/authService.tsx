const API_URL = 'http://localhost:5661'; // Remplacez par l'URL de votre API

const login = async (userName, password) => {
  const response = await fetch(`${API_URL}/admin/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ userName, password }),
  });

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || 'Erreur de connexion');
  }
  return data;
};

export default { login };
