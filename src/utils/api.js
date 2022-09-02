export function fetchProductsAll() {
  const endpoint = window.encodeURI(`https://fakestoreapi.com/products`);
  return fetch(endpoint)
    .then((res) => res.json())
    .then((data) => {
      if (!data) {
        throw new Error("dosn't exist products!!!");
      }
      return data;
    })
    .catch((e) => {
      console.error(e.message);
    });
}
export function fetchCategory(id) {
  return fetch(`https://fakestoreapi.com/products/category/${id}`)
    .then((res) => res.json())
    .catch((e) => console.error(e));
}
export function fetchProduct(id) {
  return fetch(`https://fakestoreapi.com/products/${id}`)
    .then((res) => res.json())
    .catch((e) => console.error(e));
}
export function fetchSomeProducts(id) {
  return fetch(`https://fakestoreapi.com/products/${id}`)
    .then((res) => res.json())
    .then((data) => {
      return fetchCategory(data.category);
    })
    .catch((e) => console.error(e));
}

export function fetchCategories() {
  return fetch("https://fakestoreapi.com/products/categories")
    .then((res) => res.json())
    .then((ids) => {
      if (!ids) {
        throw new Error("dosn't exist products!!!");
      }
      return Promise.all(ids.map((id) => fetchCategory(id)));
    })
    .catch((e) => {
      console.error(e.message);
    });
}
