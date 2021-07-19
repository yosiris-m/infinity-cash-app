export function getTransactions({ from, to }) {
  const url = new URL("http://localhost:8080/api/v1/transaction");
  url.search = new URLSearchParams({ from, to }).toString();

  return fetch(url).then((res) => res.json());
}
