const prodUrl = "https://family-cash-api.herokuapp.com/api/v1";
const localUrl = "http://localhost:8080/api/v1";

const baseUrl = process.env.NODE_ENV === "production" ? prodUrl : localUrl;

export function getTransactions({ from, to }) {
  const url = new URL(`${baseUrl}/transaction`);
  url.search = new URLSearchParams({ from, to }).toString();

  return fetch(url).then((res) => res.json());
}
