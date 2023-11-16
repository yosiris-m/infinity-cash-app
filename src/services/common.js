const getBaseUrl = () => {
  const prodUrl = "https://infinty-cashdb-production.up.railway.app/api/v1";
  const localUrl = "http://localhost:8000/api/v1";
  const baseUrl = process.env.NODE_ENV === "production" ? prodUrl : localUrl;
  return baseUrl;
};

export default getBaseUrl;
