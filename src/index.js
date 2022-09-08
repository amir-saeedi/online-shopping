import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route, Routes, useNavigate } from "react-router-dom";
import { ThemeProvider } from "./contexts/theme";
import { LikeProductProvider } from "./contexts/likedProduct";
import { UserProvider } from "./contexts/user"
import 'antd/dist/antd.css'
import "./styles/main.scss";

import Nav from "./components/Nav";
const Login = React.lazy(() => import("./components/auth/Login"));
const MainPage = React.lazy(() => import("./components/MainPage"));
const Product = React.lazy(() => import("./components/Product"));
const Products = React.lazy(() => import("./components/Products"));
const CartPage = React.lazy(() => import("./components/CartPage"));
const BookmarksPage = React.lazy(() => import("./components/BookmarksPage"));
const Profile =React.lazy(()=>import("./components/profile/Profile"))
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
                    <Route path="/bookmark" element={<BookmarksPage />} />
                    {/* <Route path="/login" element={<Navigate replace to="/" />} /> */}
                    <Route path="/login" element={<Login />} />
                    <Route path="/profile" element={<Profile />} />
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
