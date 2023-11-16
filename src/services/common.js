const getBaseUrl = () => {
  const baseUrl = process.env.API_BASE_URL || "http://localhost:8000/api/v1";
  return baseUrl;
};

export default getBaseUrl;
