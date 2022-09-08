import React from "react";
import { Link } from "react-router-dom";

import { FaTimes } from "react-icons/fa";

import likeProductContext from "../contexts/likedProduct";
export default function CartPage() {
  const { likeProduct, setLikeProduct } = React.useContext(likeProductContext);
  const value = React.useRef([]);

  const deleteCart = (data) => {
    let newLikeProduct = likeProduct;
    newLikeProduct = newLikeProduct.cart.some((products) => products.id === data.id)
      ? { cart: newLikeProduct.cart.filter((products) => products.id !== data.id), bookmark: [...newLikeProduct.bookmark] }
      : newLikeProduct
    setLikeProduct(newLikeProduct)
  };

  likeProduct.cart.map((data) => value.current.push(data.price));
  return (
    <React.Fragment>
      {likeProduct.cart.length === 0 && <div className="empty">empty product!</div>}
      <div className="container flex_column">
        <ul className="width-100">
          {likeProduct.cart &&
            likeProduct.cart.map((data, i) => (
              <li key={i} className="position">
                <div className="cart_row flex_row">
                  <div className="cart-image width-50">
                    <Link to={`../product/${data.id}`}>
                      <img src={data.image} alt="" />
                    </Link>
                  </div>
                  <div className="cart-title width-40 flex_column">
                    <h5>{data.title}</h5>
                    <div>
                      <span>price= {data.price}</span>
                      <input
                        value={(data.price / value.current[i]) || 1}
                        min="1"
                        max="10"
                        type={"number"}
                        onChange={(e) => {
                          let newValue = likeProduct.cart
                          newValue[i].price = value.current[i] * e.target.value;
                          setLikeProduct(d => {
                            return {
                              cart: newValue,
                              bookmark: d.bookmark
                            }
                          })
                        }}
                      />
                    </div>
                  </div>
                </div>
                <hr />
                <button
                  className="delete_btn"
                  onClick={() => deleteCart(data)}
                >
                  <FaTimes size={22} color={"red"} />
                </button>
              </li>
            ))}
        </ul>
        <Link to={""}>
          <div className="pay">
            The amount payable={" "}
            {likeProduct.cart.reduce((total, num) => total + num.price, 0)}
          </div>
        </Link>
        <hr />
      </div>
    </React.Fragment>
  );
}
