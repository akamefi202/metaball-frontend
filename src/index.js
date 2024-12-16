import React from "react";
import ReactDOM from "react-dom/client";
import { Provider, useSelector } from "react-redux";

import "assets/plugins/nucleo/css/nucleo.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
// import "assets/scss/argon-dashboard-react.scss";
import "assets/css/argon-dashboard-react.min.css";
import "./App.css";

import AdminLayout from "layouts/Admin.js";
import "./locale/i18n.js";
import { history, store } from "store/store";

const root = ReactDOM.createRoot(document.getElementById("root"));

const App = () => {
  return (
    <>
      <AdminLayout />
      {/* {!isLogin && (
          <BrowserRouter>
          <Routes>
            <Route path="/auth/*" element={<AuthLayout />} />
            <Route path="*" element={<Navigate to="/auth/login" replace />} />
          </Routes>
          </BrowserRouter>

        )} */}
    </>
  );
};

root.render(
  <Provider store={store} history={history}>
    <App />
  </Provider>
);
