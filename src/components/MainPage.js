import React from "react";
import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";
import themeContext from "../contexts/theme";
//
import { fetchCategories } from "../utils/api";
import Card from "./Card";
import Loading from "./Loading";

import mainImg from "../nav_img.jpg";
import onlineShop from "../onlineshop2.png";

const initialState = {
  loading: true,
  error: null,
  data: null,
};

export default function MainPage() {
  const [state, dispatch] = React.useReducer(reducer, initialState);

  React.useEffect(() => {
    fetchCategories()
      .then((products) => dispatch({ type: "SUCCESS", payload: products }))
      .catch(() => dispatch({ type: "ERROR" }));
  }, []);

  const theme = React.useContext(themeContext);

  function reducer(state, action) {
    switch (action.type) {
      case "SUCCESS":
        return {
          loading: null,
          error: null,
          data: action.payload,
        };
      case "ERROR": {
        return {
          loading: null,
          error: true,
          data: null,
        };
      }
      default:
        return state;
    }
  }

  return (
    <div className={`body_theme ${theme}`}>
      <div className={`flax_column `}>
        {state.loading && (
          <div>
            <Loading text="loadingMainPage" speed={300} />
          </div>
        )}
        {state.error && (
          <div>
            <h1>error:Failed to fetch</h1>
          </div>
        )}
        {state.data && (
          <div>
            <header className="main_header">
              <section className="main-img">
                <img src={mainImg} alt="mainImage" />
              </section>
              <section className="online_shop-img">
                <img src={onlineShop} alt="onlineShop" />
              </section>
              <section className="main-btn">
                <Link to={"/products/women's%20clothing"}>
                  <button>
                    View Collection <FaArrowRight color={"black"} />
                  </button>
                </Link>
              </section>
            </header>
            <section className="container">
              {state.data.map((dataCategory, i) => (
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
            </section>
          </div>
        )}
      </div>
    </div>
  );
}
