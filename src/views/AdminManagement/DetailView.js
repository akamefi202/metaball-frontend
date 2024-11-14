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
} from "reactstrap";

import { useNavigate, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { useAdminService } from "features/admin/hooks/useAdminService";
import Header from "components/Headers/Header";

const AdminDetailView = () => {
  const navigate = useNavigate();
  const { getAdmin } = useAdminService();
  const { selected } = useSelector((state) => state.admin);
  const { id } = useParams();
  // Language translation
  const { t } = useTranslation();

  const onBack = () => {
    navigate("/admin/admin_management");
  };

  useEffect(() => {
    getAdmin({ id });
  }, [getAdmin]);

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
                    style={{ borderBottom: "1px solid #e9ecef" }}
                  >
                    <Col md="2">Email:</Col>
                    <Col md="8">{selected.email}</Col>
                  </Row>
                </CardBody>
                <CardFooter className="py-4">
                  <div className="d-flex justify-content-center">
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

export default AdminDetailView;
