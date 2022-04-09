import React from "react";
import { Link } from "react-router-dom";

import { FaTimes } from "react-icons/fa";

import likedProduct from "../contexts/likedProduct";
export default function CartPage() {
  const { bookmark, setLikeProduct } = React.useContext(likedProduct);

  const deleteCart = (data) => {
    setLikeProduct((p) => {
      return p.filter((products) => products.id !== data.id);
    });
  };
  return (
    <React.Fragment>
      <div className="container flex_column">
        <ul className="width-100">
          {bookmark &&
            bookmark.map((data, i) => (
              <li key={i} className="position">
                <div className="cart_row flex_row">
                  <div className="cart-image width-50">
                    <Link to={`product/${data.id}`}>
                      <img src={data.image} />
                    </Link>
                  </div>
                  <div className="cart-title width-40 flex_column">
                    <h5>{data.title}</h5>
                    <div>
                      <span>price= {data.price}</span>
                      {/* <input
                        value={data.price / value.current[i] || 1}
                        min="1"
                        max="10"
                        type={"number"}
                        onChange={(e) => {
                          setCart((v) => {
                            const newValue = [...v];
                            newValue[i].price =
                              value.current[i] * e.target.value;
                            return newValue;
                          });
                        }}
                      /> */}
                    </div>
                  </div>
                </div>
                <hr />
                <button
                  className="btn delete_btn"
                  onClick={() => deleteCart(data)}
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
