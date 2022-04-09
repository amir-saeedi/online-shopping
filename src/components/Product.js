import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { FaBookmark, FaStar, FaArrowRight } from "react-icons/fa";
//
import { fetchProduct, fetchSomeProducts } from "../utils/api";
import Card from "./Card";
import Loading from "./Loading";
import themeContext from "../contexts/theme";
import likeProduct from "../contexts/likedProduct";
import cart from "../contexts/cart";

export default function Product() {
  const theme = React.useContext(themeContext);
  const { bookmark, setLikeProduct } = React.useContext(likeProduct);
  const { cartContext, setCart } = React.useContext(cart);
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

  if (document.querySelector(".color-icon-book"))
    document.querySelector(".color-icon-book").classList.remove("color_book");
  bookmark.map((data) => {
    if (data.id === product.id) {
      document.querySelector(".color-icon-book").classList.add("color_book");
    }
  });
  const handelSetBookmark = () => {
    setLikeProduct((p) => {
      if (p.some((products) => products.id === product.id)) {
        return p.filter((products) => products.id !== product.id);
      } else return [...p, product];
    });
  };
  const handelCart = () => {
    setCart((p) => {
      if (p.some((products) => products.id === product.id)) {
        return [...p];
      } else {
        return [...p, product];
      }
    });
  };
  const isLoading = (data) => data === null && error === null;

  function operations(e) {
    document
      .querySelectorAll(".details_des")
      .forEach((data, i) => data.classList.remove("active_operations"));
    let x = document.getElementById(
      `details_des_operations${e.target.dataset.operations}`
    );
    return x.classList.add("active_operations");
  }

  return (
    <React.Fragment>
      {isLoading(product) && (
        <div>{<Loading text="loading Product" speed={300} />}</div>
      )}
      {error && <div>erorr:{error}</div>}
      {product && (
        <div className="container flex_column">
          <header className={`product flex_row ${theme} flex_reverse`}>
            <div className="product_title flex_column width-50 ">
              <h3>{product.title}</h3>
              <div className="flex_row flex_nowrap">
                <div className="product_title_d flex_column ">
                  <div>price: {product.price}$</div>
                  <div className="icon_cart" onClick={handelCart}>
                    <button className="cart_market">add to market</button>
                  </div>
                </div>
                <div className="product_title_d flex_column">
                  <div className="icon_bookmark" onClick={handelSetBookmark}>
                    <FaBookmark size={22} className="color-icon-book" />
                  </div>
                  <div className="liked_product">
                    <FaStar color="gold" fontSize={20} /> {product.rating.rate}{" "}
                    <span>from: {product.rating.count}</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="product_image width-40">
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
                <Link
                  to={`/products/${someProducts[0].category}`}
                  className="more"
                >
                  <div className="more-bg"></div>
                  <p className="more-text">
                    More <FaArrowRight />
                  </p>
                </Link>
              </div>
            )}
          </section>
          <section className="product_details flex_column">
            <div className="details_operations flex_row">
              <button
                id="details_operations1"
                className="btn"
                data-operations="1"
                onClick={(e) => operations(e)}
              >
                Description
              </button>
              <button
                id="details_operations2"
                className="btn"
                data-operations="2"
                onClick={(e) => operations(e)}
              >
                Properties
              </button>
              <button
                id="details_operations3"
                className="btn"
                data-operations="3"
                onClick={(e) => operations(e)}
              >
                Comments
              </button>
            </div>
            <div
              className="details_des active_operations"
              id="details_des_operations1"
            >
              <p>Description product:{product.description}</p>
            </div>
            <div className="details_des" id="details_des_operations2">
              <p>Sorry, No information available at this time2</p>
            </div>
            <div className="details_des" id="details_des_operations3">
              <p>Sorry, No information available at this time3</p>
            </div>
          </section>
          <hr />
        </div>
      )}
    </React.Fragment>
  );
}
