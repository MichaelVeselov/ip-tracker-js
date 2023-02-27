const API_KEY = import.meta.env.VITE_GEO_API_KEY;

export async function getData(ip = '8.8.8.8') {
  const response = await fetch(`https://geo.ipify.org/api/v2/country,city?apiKey=${API_KEY}&ipAddress=${ip}`);

  return await response.json();
}
