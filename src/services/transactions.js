import getBaseUrl from "./common";

export function getTransactions({ from, to }) {
  const url = new URL(`${getBaseUrl()}/transaction`);
  url.search = new URLSearchParams({ from, to }).toString();

  return fetch(url).then((res) => res.json());
}
