import React, { useEffect } from "react";
import { Link } from "react-router-dom";

import { FaTimes } from "react-icons/fa";

import cart from "../contexts/cart";
export default function CartPage() {
  const { cartContext, setCart } = React.useContext(cart);
  // const [value, setValue] = React.useState("");
  const value = React.useRef([]);

  const deleteCart = (data) => {
    setCart((p) => {
      return p.filter((products) => products.id !== data.id);
    });
  };
  // useEffect(() => {
  cartContext.map((data) => value.current.push(data.price));
  // }, [cartContext]);
  // console.log(cartContext.length === 0 ? true : false);
  return (
    <React.Fragment>
      {cartContext.length === 0 && <div className="empty">empty product!</div>}
      <div className="container flex_column">
        <ul className="width-100">
          {cartContext &&
            cartContext.map((data, i) => (
              <li key={i} className="position">
                <div className="cart_row flex_row">
                  <div className="cart-image width-50">
                    <Link to={`../product/${data.id}`}>
                      <img src={data.image} />
                    </Link>
                  </div>
                  <div className="cart-title width-40 flex_column">
                    <h5>{data.title}</h5>
                    <div>
                      <span>price= {data.price}</span>
                      <input
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
                      />
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
        <Link to={""}>
          <div className="pay">
            The amount payable={" "}
            {cartContext.reduce((total, num) => total + num.price, 0)}
          </div>
        </Link>
        <hr />
      </div>
    </React.Fragment>
  );
}
