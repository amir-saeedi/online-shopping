import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
//
import { fetchProduct, fetchSomeProducts } from "../utils/api";
import Card from "./Card";
import Loading from "./Loading";

export default function Product() {
  const { id } = useParams();
  const [product, setProduct] = React.useState(null);
  const [error, SetError] = React.useState(null);
  const [someProducts, setSomeProducts] = React.useState(null);

  useEffect(() => {
    fetchProduct(id)
      .then((data) => setProduct(data))
      .catch((e) => SetError(e));

    fetchSomeProducts(id)
      .then((dataSome) => setSomeProducts(dataSome))
      .catch((e) => SetError(e));
  }, [id]);

  const isLoading = (data) => data === null && error === null;

  // console.log(product);
  // console.log(someProducts);
  return (
    <React.Fragment>
      {isLoading(product) && (
        <div>{<Loading text="loading Product" speed={300} />}</div>
      )}
      {error && <div>erorr:{error}</div>}
      {product && (
        <div className="container flex_column">
          <header className="product flex_row">
            <div className="product_title flex_column">
              <h3>{product.title}</h3>
            </div>
            <div className="product_image">
              <img src={product.image} className="card-img-top" alt="..." />
            </div>
          </header>
          <section className="someProducts">
            {isLoading(someProducts) && (
              <div>{<Loading text="loading some Products" speed={300} />}</div>
            )}
            {error && <div>erorr:{error}</div>}
            {someProducts && (
              <div className="flex_row">
                {someProducts
                  .filter((data) => data.id !== product.id)
                  .map((repo, i) => {
                    return (
                      i < 3 && (
                        <li key={repo.id}>
                          <Card repo={repo} />
                        </li>
                      )
                    );
                  })}
                <div>
                  <Link to={`/products/${someProducts[0].category}`}>next</Link>
                </div>
              </div>
            )}
          </section>
        </div>
      )}
    </React.Fragment>
  );
}
