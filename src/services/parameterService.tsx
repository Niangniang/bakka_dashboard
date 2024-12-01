export const baseUrl = 'http://bregitsonvm2.francecentral.cloudapp.azure.com:5661';

export const addParameter = async (parameter) => {
  const response = await fetch(`${baseUrl}/parameter/add`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(parameter),
  });

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || 'Erreur durant enregistrement');
  }
  return data;
};

export const getParameters = async () => {
  const response = await fetch(`${baseUrl}/parameter/all`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    // body: JSON.stringify(parameter),
  });

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || 'Erreur durant enregistrement');
  }
  return data;
};
