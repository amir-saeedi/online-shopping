import React from "react";
import { useParams } from "react-router-dom";

import { fetchCategory } from "../utils/api";

import Loading from "./Loading";
import Card from "./Card";
import themeContext from "../contexts/theme";
//

//
export default function Products() {
  const { id } = useParams();
  const [products, setProducts] = React.useState(null);
  const [error, SetError] = React.useState(null);
  const theme = React.useContext(themeContext);

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
        <div className={`${theme}`}>
          <div className="container flex_column ">
            <h2>{products[0].category}</h2>
            <div className="flex_row">
              {products.map((repo, i) => (
                <li key={i}>
                  <Card repo={repo} />
                </li>
              ))}
            </div>
          </div>
        </div>
      )}
    </React.Fragment>
  );
}
