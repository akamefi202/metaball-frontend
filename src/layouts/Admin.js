import React, { useCallback, useEffect, useState } from "react";
import {
  useLocation,
  Route,
  Routes,
  BrowserRouter,
  Navigate,
  useNavigate,
} from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
// reactstrap components
import { Container } from "reactstrap";
// core components
import AdminNavbar from "components/Navbars/AdminNavbar.js";
import AdminFooter from "components/Footers/AdminFooter.js";
import Sidebar from "components/Sidebar/Sidebar.js";
import { TOKEN_NAME } from "config/index.js";
import { useAuthService } from "features/auth/hooks/useAuthService";
import { LoadingComponent } from "components/Loading";

import routes from "routes.js";
import Login from "views/Auth/Login";

const RouteChangeTracker = ({ onChangeBrandText, onChangeCurrentLocation }) => {
  const location = useLocation();

  useEffect(() => {
    onChangeBrandText(location);
    onChangeCurrentLocation(location);
    localStorage.setItem("lastVisitedRoute", location.pathname);
  }, [location]); // Runs every time the location changes

  return null;
};

const RedirectToLastVisitedPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Get the last visited route from localStorage
    const lastVisitedRoute = localStorage.getItem("lastVisitedRoute");
    if (lastVisitedRoute) {
      navigate(lastVisitedRoute, { replace: true }); // Navigate to the last visited route
    }
  }, [navigate]);

  return null; // This component doesn't render anything
};

const Admin = (props) => {
  const mainContent = React.useRef(null);
  // const location = useLocation();
  const { t } = useTranslation();
  const [brandText, setBrandText] = useState("");
  const [currentLocation, setCurrentLocation] = useState("");
  const { loading, error, data } = useSelector((state) => state.auth);
  const { verifyToken } = useAuthService();
  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const onChangeCurrentLocation = (location) => {
    setCurrentLocation(location.pathname);
  };

  useEffect(() => {
    if (!error && data) {
      setIsLogin(true);
    } else {
      setIsLogin(false);
    }
  }, [error, data]);

  useEffect(() => {
    const token = localStorage.getItem(TOKEN_NAME);
    if (token) {
      verifyToken({ token });
    } else {
      setIsLogin(false);
    }
  }, [verifyToken]);

  useEffect(() => {
    setIsLoading(loading);
  }, [loading]);

  const getRoutes = useCallback(
    (routes) => {
      return routes.map((prop, key) => {
        if (prop.layout === "/admin") {
          return (
            <Route
              path={`${prop.path}`}
              // element={prop.component}
              element={
                isLogin ? (
                  prop.component
                ) : (
                  <Navigate
                    to="/login"
                    state={{ from: currentLocation }} // Pass the current location to the login page
                    replace
                  />
                )
              }
              key={key}
              exact
            />
          );
        } else {
          return null;
        }
      });
    },
    [isLogin, currentLocation]
  );

  // useEffect(() => {
  //   document.documentElement.scrollTop = 0;
  //   document.scrollingElement.scrollTop = 0;
  //   mainContent.current.scrollTop = 0;
  // }, [location]);

  if (isLoading) {
    return (
      <>
        <LoadingComponent />
      </>
    );
  }

  const getBrandText = (location) => {
    for (let i = 0; i < routes.length; i++) {
      if (location.pathname.indexOf(routes[i].pathName) !== -1) {
        setBrandText(t(routes[i].name));
      }
    }
    return "Brand";
  };

  return (
    <>
      {!isLoading ? (
        <BrowserRouter>
          <RouteChangeTracker
            onChangeBrandText={getBrandText}
            onChangeCurrentLocation={onChangeCurrentLocation}
          />
          {/* <RedirectToLastVisitedPage /> */}
          {/* {!isLogin && <Navigate to={"/login"} />} */}
          {isLogin && (
            <Sidebar
              {...props}
              routes={routes}
              logo={{
                innerLink: "/admin/index",
                imgSrc: require("../assets/img/ic_launcher.png"),
                imgAlt: "...",
              }}
            />
          )}
          <div className="main-content" ref={mainContent}>
            {isLogin && <AdminNavbar {...props} brandText={brandText} />}
            <Routes>
              {getRoutes(routes)}
              <Route path="/login" element={<Login />} />
              <Route
                path="*"
                element={<Navigate to="/admin/index" replace />}
              />
            </Routes>
            <Container fluid>{/* <AdminFooter /> */}</Container>
          </div>
        </BrowserRouter>
      ) : (
        <LoadingComponent />
      )}
    </>
  );
};

export default Admin;
