import getBaseUrl from "./common";

export function getCategories() {
  return fetch(`${getBaseUrl()}/categories`).then((response) => {
    return response.json();
  });
}

export function createCategory(label, type, image) {
  const body = {
    label,
    type,
    image,
  };

  console.log("body", body);

  return fetch(`${getBaseUrl()}/categories`, {
    method: "POST",
    body: JSON.stringify(body),
    headers: { "Content-Type": "application/json" },
  });
}
