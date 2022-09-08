import React from "react";
import { FaShoppingBag, FaHeart } from "react-icons/fa";
import { fetchProductsAll } from "../utils/api";
import { FaUser, FaMoon, FaSun } from "react-icons/fa";
import { IoLogOutOutline } from "react-icons/io5"

import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

import themeContext from "../contexts/theme";
import likeProductContext from "../contexts/likedProduct";
import userContext from "../contexts/user"

import logo from "../logo.jpg";

export default function Nav({ toggleTheme }) {
  const navigation = useNavigate();
  const [all, setAll] = React.useState("");
  const theme = React.useContext(themeContext);
  const { likeProduct } = React.useContext(likeProductContext);
  const { user, setUser } = React.useContext(userContext)

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
  function openNav() {
    document.getElementById("mySidenav").style.width === "225px"
      ? document.getElementById("mySidenav").style.width = "0px"
      : document.getElementById("mySidenav").style.width = "225px";
    // document.getElementById("main").style.marginLeft = "250px";
  }

  // function closeNav() {
  //   document.getElementById("mySidenav").style.width = "0";
  //   // document.getElementById("main").style.marginLeft = "0";
  // }
  return (
    <React.Fragment>
      <div id="mySidenav" className="sidenav">
        <div className="closebtn flex_row flex_nowrap">
          <Link to={"/"}>
            <img src={logo} className="logo" alt="logo website" />
          </Link>
          {/* <Link to="#" className="" onClick={closeNav}>&times;</Link> */}
        </div>
        <Link to="#" style={{ paddingTop: "40px" }}>
          <button className="togglebtn" onClick={toggleTheme}>
            {theme === "light" && (
              <span>
                <FaMoon /> Dark
              </span>
            )}
            {theme === "dark" && (
              <span>
                <FaSun /> Light
              </span>
            )}
          </button>
        </Link>
        <div className="search">
          <form
            id="na_search"
            className="flex_row"
            style={{ justifyContent: "start" }}
            onSubmit={(e) => {
              e.preventDefault();
              navSearch();
            }}
          >
            <input
              type="text"
              placeholder="Type to search..."
              autoComplete="off"
              className="form-control"
              id="exampleDataList"
              list="datalistOptions"
            ></input>
            <datalist id="datalistOptions">
              {all &&
                all.map((data, i) => <option key={i} value={data.title} />)}
            </datalist>
          </form>
        </div>
        <Link to="/bookmark">
          <FaHeart
            className={likeProduct.bookmark.length === 0 ? "" : "bookmark_icon"}
          />
          {likeProduct.bookmark.length === 0 ? null : (
            <span className="num_span">{likeProduct.bookmark.length}</span>
          )}
          <span>Bookmark</span>
        </Link>
        <Link to="/cart">
          <FaShoppingBag
            className={likeProduct.cart.length === 0 ? "" : "cart_icon"}
          />
          {likeProduct.cart.length === 0 ? null : (
            <span className="num_span">{likeProduct.cart.length}</span>
          )}
          <span>Cart</span>
        </Link>
        <Link to="/profile"><FaUser /><span>Profile</span></Link>
        <Link to="/login" onClick={() => setUser(null)}><IoLogOutOutline /><span>{user ? "Logout" : "login"}</span></Link>
        <h5 className="welcomeUser">{user ? `Welcome ${user.name}` : "Please login"}</h5>
      </div>
      <div id="navbar">
        <section className={`nav flex_row flex_nowrap`}>
          <ul className="nav_links">
            <li className="nav_link nav_home">
              <Link to={"/"}>
                <img src={logo} className="logo" alt="logo website" />
              </Link>
            </li>
          </ul>
          <div className="nav_dashboard">
            <Link to="/">Products</Link>
            <Link to="#">About</Link>
            <Link to="#">Contact us</Link>
            <div style={{ position: "relative" }}>
              <span onClick={openNav}>
                <input className="hamburger-checkbox" type="checkbox" />
                <div className="hamburger-lines">
                  <span className="line line1"></span>
                  <span className="line line2"></span>
                  <span className="line line3"></span>
                </div>
              </span>
            </div>
          </div>
        </section>
      </div>
    </React.Fragment>
  );
}
