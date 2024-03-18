// api.js
const BASE_URL = 'https://jsonplaceholder.typicode.com/todos';

export const fetchData = async () => {
  try {
    const response = await fetch(`${BASE_URL}`);
    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error('Failed to fetch data');
  }
};