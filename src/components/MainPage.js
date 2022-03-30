import React from "react";
import { Link } from "react-router-dom";
// import styles from "../styles/MainPage.module.scss";
//
import { fetchCategories } from "../utils/api";
import Card from "./Card";
import Loading from "./Loading";

export default function MainPage() {
  const [data, setData] = React.useState(null);
  const [error, SetError] = React.useState(null);

  React.useEffect(() => {
    fetchCategories()
      .then((products) => setData(products))
      .catch((e) => SetError(e));
  }, []);

  const isLoading = (data) => data === null && error === null;

  console.log(data);
  return (
    <div className="container flax_column">
      {isLoading(data) && (
        <div>
          <Loading text="loadingMainPage" speed={300} />
        </div>
      )}
      {error && <div>error:{error}</div>}
      {data &&
        data.map((dataCategory, i) => (
          <ul key={i}>
            <h3>{dataCategory[0].category}</h3>
            <div className="flex_row">
              {dataCategory.map((repo, z) => {
                return (
                  z < 3 && (
                    <li key={repo.id}>
                      <Card repo={repo} />
                    </li>
                  )
                );
              })}
              <div>
                <Link to={`/products/${dataCategory[0].category}`}>next</Link>
              </div>
            </div>
          </ul>
        ))}
    </div>
  );
}
