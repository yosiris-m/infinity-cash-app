import getBaseUrl from "./common";

export function getCategories() {
  return fetch(`${getBaseUrl()}/categories`).then((response) => {
    return response.json();
  });
}
