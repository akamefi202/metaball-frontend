// reactstrap components
import { Card, CardBody, CardTitle, Container, Row, Col } from "reactstrap";
import { useTranslation } from "react-i18next";

const Header = () => {
  const {
    t,
    i18n: { changeLanguage, language },
  } = useTranslation();

  return (
    <>
      <div className="header bg-gradient-info pb-8 pt-5 pt-md-8">
        <Container fluid>
          <div className="header-body">{/* Card stats */}</div>
        </Container>
      </div>
    </>
  );
};

export default Header;
