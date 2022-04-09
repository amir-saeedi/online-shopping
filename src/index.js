import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ThemeProvider } from "./contexts/theme";
import { LikeProductProvider } from "./contexts/likedProduct";
import { CartProvider } from "./contexts/cart";
import "bootstrap/dist/css/bootstrap.min.css";
import "./styles/main.scss";
//
import Nav from "./components/Nav";
import MainPage from "./components/MainPage";
import Product from "./components/Product";
import Products from "./components/Products";
import CartPage from "./components/CartPage";
import BookmarkPage from "./components/bookmarkPage";
//

function App() {
  const [theme, setTheme] = React.useState("light");
  const toggleTheme = () =>
    setTheme((theme) => (theme === "light" ? "dark" : "light"));
  const [bookmark, setLikeProduct] = React.useState([]);
  const [cartContext, setCart] = React.useState([]);

  return (
    <React.StrictMode>
      <Router>
        <LikeProductProvider
          value={{
            bookmark,
            setLikeProduct,
          }}
        >
          <CartProvider
            value={{
              cartContext,
              setCart,
            }}
          >
            <ThemeProvider value={theme}>
              <Nav toggleTheme={toggleTheme} />
              <React.Suspense fallback={"loading!"}>
                <Routes>
                  <Route path="/" element={<MainPage />} />
                  <Route path="/products/:id" element={<Products />} />
                  <Route path="/product/:id" element={<Product />} />
                  <Route path="/cart" element={<CartPage />} />
                  <Route path="/bookmark" element={<BookmarkPage />} />
                </Routes>
              </React.Suspense>
            </ThemeProvider>
          </CartProvider>
        </LikeProductProvider>
      </Router>
    </React.StrictMode>
  );
}
ReactDOM.render(<App />, document.getElementById("root"));
