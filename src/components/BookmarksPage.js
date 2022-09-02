import React from "react";
import { Link } from "react-router-dom";

import { FaTimes } from "react-icons/fa";

import likeProductContext from "../contexts/likedProduct";
export default function BookmarksPage() {
  const { likeProduct, setLikeProduct } = React.useContext(likeProductContext);

  const deleteBookmark = (data) => {
    let newLikeProduct = likeProduct;
    newLikeProduct = newLikeProduct.bookmark.some((products) => products.id === data.id)
      ? { cart: [...newLikeProduct.cart], bookmark: newLikeProduct.bookmark.filter((products) => products.id !== data.id) }
      : newLikeProduct
    setLikeProduct(newLikeProduct)
  };
  return (
    <React.Fragment>
      {likeProduct.bookmark.length === 0 && <div className="empty">empty product!</div>}
      <div className="container flex_column">
        <ul className="width-100">
          {likeProduct.bookmark &&
            likeProduct.bookmark.map((data, i) => (
              <li key={i} className="position">
                <div className="cart_row flex_row">
                  <div className="cart-image width-50">
                    <Link to={`../product/${data.id}`}>
                      <img src={data.image} alt={data.title} />
                    </Link>
                  </div>
                  <div className="cart-title width-40 flex_column">
                    <h5>{data.title}</h5>
                    <div>
                      <span>price= {data.price}</span>
                    </div>
                  </div>
                </div>
                <hr />
                <button
                  className="btn delete_btn"
                  onClick={() => deleteBookmark(data)}
                >
                  <FaTimes size={22} color={"red"} />
                </button>
              </li>
            ))}
        </ul>
      </div>
    </React.Fragment>
  );
}
