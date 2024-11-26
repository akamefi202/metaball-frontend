/* eslint-disable react-hooks/exhaustive-deps */
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
} from "reactstrap";

import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import Header from "components/Headers/Header";
import useAdminService from "features/admin/hooks/useAdminService";

const MyPage = () => {
  const { data } = useSelector((state) => state.auth);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [myInfo, setMyInfo] = useState({});
  const { updateAdmin } = useAdminService();
  // Language translation
  const { t } = useTranslation();

  const onUpdate = () => {
    updateAdmin({ id: myInfo._id, email, password });
  };

  useEffect(() => {
    if (data && data.manager) {
      setMyInfo(data.manager);
      setEmail(data.manager.email);
    }
  }, [data]);

  return (
    <>
      {" "}
      <Header />
      {/* Page content */}
      <Container className="mt--7" fluid>
        <>
          <Row>
            <div className="col">
              <Card className="shadow">
                <CardHeader className="border-0 d-flex justify-content-between align-items-center">
                  <h3 className="mb-0 mr-2">{t("sideMenu.mypage")}</h3>
                </CardHeader>
                <CardBody style={{ borderTop: "1px solid #e9ecef" }}>
                  <Row
                    className="py-2 mt-2 align-items-center"
                    style={{ borderBottom: "1px solid #e9ecef" }}
                  >
                    <Col md="2">{t("common.email")} : </Col>
                    <Col md="8">
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
                    className="py-2 mt-2 align-items-center"
                    style={{ borderBottom: "1px solid #e9ecef" }}
                  >
                    <Col md="2">{t("common.password")} : </Col>
                    <Col md="8">
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
                  <Row className="justify-content-center">
                    <Button className="btn btn-primary" onClick={onUpdate}>
                      {t("common.update")}
                    </Button>
                  </Row>
                </CardFooter>
              </Card>
            </div>
          </Row>
        </>
      </Container>
    </>
  );
};

export default MyPage;
