import React from "react";
import { FaShoppingBag } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";

import { fetchProductsAll } from "../utils/api";
import { useNavigate } from "react-router-dom";

import { Link } from "react-router-dom";

import themeContext from "../contexts/theme";
import likeProduct from "../contexts/likedProduct";
import cart from "../contexts/cart";

import logo from "../logo.jpg";

export default function Nav({ toggleTheme }) {
  const navigation = useNavigate();
  const [all, setAll] = React.useState("");
  const theme = React.useContext(themeContext);
  const { bookmark } = React.useContext(likeProduct);
  const { cartContext } = React.useContext(cart);

  React.useEffect(() => {
    fetchProductsAll()
      .then((data) => setAll(data))
      .catch((e) => console.error(e));
  }, []);

  const navSearch = () => {
    if (document.querySelector(".form-control").value) {
      all.map((data) => {
        if (data.title === document.querySelector(".form-control").value) {
          navigation(`/product/${data.id}`);
        }
      });
    }
  };
  return (
    <div className="nav flex_row flex_nowrap">
      <ul className="nav_links">
        <li className="nav_link nav_home">
          <Link to={"/"}>
            <img src={logo} alt="logo website" />
          </Link>
        </li>
      </ul>
      <div className="nav_dashboard flex_row">
        <div className="search">
          <form
            id="na_search"
            onSubmit={(e) => {
              e.preventDefault();
              navSearch();
            }}
          >
            <input
              autoComplete="off"
              className="form-control"
              list="datalistOptions"
              id="exampleDataList"
              placeholder="Type to search..."
            />
            <datalist id="datalistOptions">
              {all &&
                all.map((data, i) => <option key={i} value={data.title} />)}
            </datalist>
          </form>
        </div>
        <div className="bookmark">
          <Link to={"/bookmark"}>
            {bookmark.length === 0 ? (
              <FaHeart size={22} color="#fff" />
            ) : (
              <FaHeart size={22} color="green" className="bookmark_icon" />
            )}

            {bookmark.length === 0 ? null : (
              <span className="bookmark_span">{bookmark.length}</span>
            )}
          </Link>
        </div>
        <div className="cart">
          <Link to={"/cart"}>
            <FaShoppingBag size={22} color="#fff" />
            {cartContext.length === 0 ? null : (
              <span className="cart_span">{cartContext.length}</span>
            )}
          </Link>
        </div>
        <div className="theme_toggle">
          <button className="btn" onClick={toggleTheme}>
            {theme === "light" ? <span>💡</span> : <span>🔦</span>}
          </button>
        </div>
      </div>
    </div>
  );
}
