import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { Provider, useSelector } from "react-redux";

import "assets/plugins/nucleo/css/nucleo.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
// import "assets/scss/argon-dashboard-react.scss";
import "assets/css/argon-dashboard-react.min.css";
import "./App.css";

import AdminLayout from "layouts/Admin.js";
import AuthLayout from "layouts/Auth.js";
import "./locale/i18n.js";
import { history, store } from "store/store";
import { TOKEN_NAME } from "config/index.js";
import Login from "views/Auth/Login";

const root = ReactDOM.createRoot(document.getElementById("root"));

const App = () => {
  const { error, data } = useSelector((state) => state.auth);
  const [isLogin, setIsLogin] = useState(false);

  useEffect(() => {
    if (
      !data ||
      (error && error.status === 401) ||
      !localStorage.getItem(TOKEN_NAME)
    ) {
      setIsLogin(false);
    } else {
      setIsLogin(true);
    }
  }, [error, data]);

  return (
    <>
      <BrowserRouter>
        {isLogin && (
          <Routes>
            <Route path="/admin/*" element={<AdminLayout />} />
            <Route path="*" element={<Navigate to="/admin/index" replace />} />
          </Routes>
        )}
        {!isLogin && (
          <Routes>
            <Route path="/auth/*" element={<AuthLayout />} />
            <Route path="*" element={<Navigate to="/auth/login" replace />} />
            {/* <Route path="/login" element={<Login />} /> */}
          </Routes>
        )}
      </BrowserRouter>
    </>
  );
};

root.render(
  <Provider store={store} history={history}>
    <App />
  </Provider>
);
