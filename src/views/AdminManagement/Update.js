import { useState, useEffect } from "react";
import {
  Container,
  Row,
  Card,
  CardHeader,
  Button,
  CardFooter,
  CardBody,
  Col,
  FormGroup,
  InputGroup,
  Input,
  InputGroupAddon,
  InputGroupText,
} from "reactstrap";

import { useNavigate, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { useAdminService } from "features/admin/hooks/useAdminService";
import Header from "components/Headers/Header";

const AdminUpdate = () => {
  const navigate = useNavigate();
  const { updateAdmin, getAdmin } = useAdminService();
  const { selected } = useSelector((state) => state.admin);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { id } = useParams();
  // Language translation
  const {
    t,
    i18n: { changeLanguage, language },
  } = useTranslation();

  const onBack = () => {
    navigate("/admin/admin_management");
  };

  const onUpdate = () => {
    updateAdmin({ id, email, password });
  };

  useEffect(() => {
    getAdmin({ id });
  }, [getAdmin]);

  useEffect(() => {
    setEmail(selected.email);
  }, [selected]);

  return (
    <>
      <Header />
      {/* Page content */}
      <Container className="mt--7" fluid>
        <>
          <Row>
            <div className="col">
              <Card className="shadow">
                <CardHeader className="border-0 d-flex justify-content-between align-items-center">
                  <h3 className="mb-0 mr-2">{t("adminPage.admin")}</h3>
                </CardHeader>
                <CardBody style={{ borderTop: "1px solid #e9ecef" }}>
                  <Row
                    className="py-2 mt-2"
                    style={{
                      borderBottom: "1px solid #e9ecef",
                      alignItems: "center",
                    }}
                  >
                    <Col md="2">{t("common.email")}:</Col>
                    <Col md="">
                      <FormGroup className="mb-0">
                        <InputGroup>
                          <Input
                            placeholder={t("common.email")}
                            type="text"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                          />
                        </InputGroup>
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row
                    className="py-2 mt-2"
                    style={{
                      borderBottom: "1px solid #e9ecef",
                      alignItems: "center",
                    }}
                  >
                    <Col md="2">{t("common.password")}:</Col>
                    <Col md="">
                      <FormGroup className="mb-0">
                        <InputGroup>
                          <Input
                            placeholder={t("common.password")}
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                          />
                        </InputGroup>
                      </FormGroup>
                    </Col>
                  </Row>
                </CardBody>
                <CardFooter className="py-4">
                  <div className="d-flex justify-content-center">
                    <Button color="primary" type="button" onClick={onUpdate}>
                      {t("common.edit")}
                    </Button>
                    <Button color="secondary" type="button" onClick={onBack}>
                      {t("common.back")}
                    </Button>
                  </div>
                </CardFooter>
              </Card>
            </div>
          </Row>
        </>
      </Container>
    </>
  );
};

export default AdminUpdate;