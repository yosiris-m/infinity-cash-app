const getBaseUrl = () => {
  const prodUrl = "https://family-cash-api.herokuapp.com/api/v1";
  const localUrl = "http://localhost:8080/api/v1";
  const baseUrl = process.env.NODE_ENV === "production" ? prodUrl : localUrl;
  return baseUrl;
};

export default getBaseUrl;
