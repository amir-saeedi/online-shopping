import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import { ThemeProvider } from "./contexts/theme";
import { LikeProductProvider } from "./contexts/likedProduct";
import { UserProvider } from "./contexts/user"

// import "bootstrap/dist/css/bootstrap.min.css";
import "./styles/main.scss";

import Nav from "./components/Nav";
const Login = React.lazy(() => import("./components/Login"));
const MainPage = React.lazy(() => import("./components/MainPage"));
const Product = React.lazy(() => import("./components/Product"));
const Products = React.lazy(() => import("./components/Products"));
const CartPage = React.lazy(() => import("./components/CartPage"));
const BookmarkPage = React.lazy(() => import("./components/BookmarkPage"));
/////////////////////////////////////////////////

function App() {
  const [theme, setTheme] = React.useState("light");
  const toggleTheme = () =>
    setTheme((theme) => (theme === "light" ? "dark" : "light"));
  const [likeProduct, setLikeProduct] = React.useState({
    cart: [],
    bookmark: []
  });
  const [user, setUser] = React.useState(null)

  return (
    <React.StrictMode>
      <Router>
        <UserProvider value={{ user, setUser }}>
          <LikeProductProvider
            value={{
              likeProduct,
              setLikeProduct,
            }}
          >
            <ThemeProvider value={theme}>
              <Nav toggleTheme={toggleTheme} />
              <React.Suspense fallback={"loading!"}>
                <Routes>
                  <React.Fragment>
                    <Route path="/" element={<MainPage />} />
                    <Route path="/products/:id" element={<Products />} />
                    <Route path="/product/:id" element={<Product />} />
                    <Route path="/cart" element={<CartPage />} />
                    <Route path="/bookmark" element={<BookmarkPage />} />
                    {/* <Route path="/login" element={<Navigate replace to="/" />} /> */}
                  </React.Fragment>
                </Routes>
              </React.Suspense>
            </ThemeProvider>
          </LikeProductProvider>
        </UserProvider>
      </Router>
    </React.StrictMode>
  );
}
ReactDOM.render(<App />, document.getElementById("root"));
