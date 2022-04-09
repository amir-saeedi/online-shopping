import React from "react";
import { FaShoppingBag } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";

import { fetchProductsAll } from "../utils/api";
import { useNavigate } from "react-router-dom";

import { Link } from "react-router-dom";

import themeContext from "../contexts/theme";

export default function Nav({ toggleTheme }) {
  const navigation = useNavigate();
  const [all, setAll] = React.useState("");
  const theme = React.useContext(themeContext);
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
  // console.log(all);
  return (
    <div className="nav flex_row flex_nowrap">
      <ul className="nav_links">
        <Link to={"/"}>
          <li className="nav_link nav_home">Online Shop</li>
        </Link>
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
            <div className="bookmark_icon">
              <FaHeart size={22} color="#fff" />
            </div>
          </Link>
        </div>
        <div className="cart">
          <Link to={"/cart"}>
            <div className="cart_icon">
              <FaShoppingBag size={22} color="#fff" />
            </div>
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
