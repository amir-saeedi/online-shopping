import React from "react";
import { useParams } from "react-router-dom";

import { fetchCategory } from "../utils/api";

import Loading from "./Loading";

export default function Products() {
  const { id } = useParams();
  const [products, setProducts] = React.useState(null);
  const [error, SetError] = React.useState(null);

  React.useEffect(() => {
    fetchCategory(id)
      .then((data) => setProducts(data))
      .catch((e) => SetError(e));
  }, [id]);

  const isLoading = (data) => data === null && error === null;
  console.log(products);
  return (
    <React.Fragment>
      {isLoading(products) && <Loading text="Loading Products" speed={300} />}
      {error && <div>erorr:{error}</div>}
      {products && (
        <div className="container flex_column">
          {products.map((data, i) => (
            <li key={i} className="products flex_row">
              <div className="products_text">
                <h3>{data.title}</h3>
              </div>
              <div className="products_image">
                <img src={data.image} />
              </div>
            </li>
          ))}
        </div>
      )}
    </React.Fragment>
  );
}
