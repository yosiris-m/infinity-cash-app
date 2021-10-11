import getBaseUrl from "./common";

export function getCategories() {
  return fetch(`${getBaseUrl()}/categories`).then((response) => {
    return response.json();
  });
}

export function createdCategory(label, type, image) {
  console.log("category-label ->", label);
  console.log("category-type ->", type);
  console.log("category-image ->", image);

  const body = {
    label: label,
    type: type,
    image: "image",
  };

  console.log("body", body);

  return fetch(`${getBaseUrl()}/categories`, {
    method: "POST",
    body: JSON.stringify(body),
    headers: { "Content-Type": "application/json" },
  });
}
