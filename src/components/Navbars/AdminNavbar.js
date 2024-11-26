import { useState, useEffect } from "react";
import { useAuthService } from "features/auth/hooks/useAuthService";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import ReactCountryFlag from "react-country-flag";

// reactstrap components
import {
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  DropdownToggle,
  Navbar,
  Nav,
  Container,
  Media,
} from "reactstrap";
import { useSelector } from "react-redux";
import { LanguageOption } from "config";

const AdminNavbar = (props) => {
  const { t, i18n } = useTranslation();

  const { logout } = useAuthService();
  const { data } = useSelector((state) => state.auth);
  const [email, setEmail] = useState("");
  const [lang, setLang] = useState(LanguageOption.en.name);

  const changeLanguageHandler = (lang) => {
    i18n.changeLanguage(lang);
    setLang(LanguageOption[lang].name);
  };

  useEffect(() => {
    if (data && data.manager) {
      setEmail(data.manager.email);
    }
  }, [data]);

  return (
    <>
      <Navbar className="navbar-top navbar-dark" expand="md" id="navbar-main">
        <Container fluid>
          <Link
            className="h4 mb-0 text-white text-uppercase d-none d-lg-inline-block"
            to="/"
          >
            {props.brandText}
          </Link>

          <Nav className="align-items-center d-none d-md-flex" navbar>
            <UncontrolledDropdown nav>
              <DropdownToggle className="pr-0" nav>
                <Media className="align-items-center">
                  <Media className="ml-2 d-none d-lg-block">
                    <i className="ni ni-world mr-2" />
                    <span className="mb-0 text-sm font-weight-bold">
                      {lang}
                    </span>
                  </Media>
                </Media>
              </DropdownToggle>
              <DropdownMenu className="dropdown-menu-arrow" right>
                <DropdownItem
                  onClick={() => changeLanguageHandler(LanguageOption.en.id)}
                >
                  <ReactCountryFlag className="mr-3" countryCode="us" svg />
                  <span>{LanguageOption.en.name}</span>
                </DropdownItem>
                <DropdownItem
                  onClick={() => changeLanguageHandler(LanguageOption.jp.id)}
                >
                  <ReactCountryFlag className="mr-3" countryCode="jp" svg />
                  <span>{LanguageOption.jp.name}</span>
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
            <UncontrolledDropdown nav>
              <DropdownToggle className="pr-0" nav>
                <Media className="align-items-center">
                  <Media className="ml-2 d-none d-lg-block">
                    <span className="mb-0 text-sm font-weight-bold">
                      {email}
                    </span>
                  </Media>
                </Media>
              </DropdownToggle>
              <DropdownMenu className="dropdown-menu-arrow" right>
                <DropdownItem to="/admin/user-profile" tag={Link}>
                  <i className="ni ni-single-02" />
                  <span>My profile</span>
                </DropdownItem>
                <DropdownItem to="/admin/setting_management" tag={Link}>
                  <i className="ni ni-settings-gear-65" />
                  <span>Settings</span>
                </DropdownItem>
                <DropdownItem to="/admin/service_management" tag={Link}>
                  <i className="ni ni-support-16" />
                  <span>Support</span>
                </DropdownItem>
                <DropdownItem divider />
                <DropdownItem
                  onClick={(e) => {
                    logout();
                    e.preventDefault();
                  }}
                >
                  <i className="ni ni-user-run" />
                  <span>Logout</span>
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
          </Nav>
        </Container>
      </Navbar>
    </>
  );
};

export default AdminNavbar;
