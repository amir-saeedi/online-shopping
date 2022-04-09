import React from "react";
import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";
import themeContext from "../contexts/theme";
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
  const theme = React.useContext(themeContext);

  return (
    <div className={`body_theme ${theme}`}>
      <div className={`container flax_column `}>
        {isLoading(data) && (
          <div>
            <Loading text="loadingMainPage" speed={300} />
          </div>
        )}
        {error && <div>error:{error}</div>}
        {data &&
          data.map((dataCategory, i) => (
            <ul key={i}>
              <h1>{dataCategory[0].category}</h1>
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
                <Link
                  className="more"
                  to={`/products/${dataCategory[0].category}`}
                >
                  <div className="more-bg"></div>
                  <p className="more-text">
                    More <FaArrowRight />
                  </p>
                </Link>
              </div>
              <hr />
            </ul>
          ))}
      </div>
    </div>
  );
}
