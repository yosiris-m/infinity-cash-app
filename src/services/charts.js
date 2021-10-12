import getBaseUrl from "./common";

export function getExpenses({ from, to }) {
  const url = new URL(`${getBaseUrl()}/chart/expenses`);
  url.search = new URLSearchParams({ from, to }).toString();

  return fetch(url).then((res) => res.json());
}
