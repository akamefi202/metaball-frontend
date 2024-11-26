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
  Form,
  FormGroup,
  Input,
} from "reactstrap";

import { useNavigate, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import UserHeader from "components/Headers/UserHeader";
import { API_BASE_URL } from "config";
import useRoundingService from "features/rounding/hooks/useRoundingService";

const RoundingDetailView = () => {
  const navigate = useNavigate();
  const { getRounding } = useRoundingService();
  const { selected } = useSelector((state) => state.rounding);
  const [selectedUser, setSelectedUser] = useState({});
  const { id } = useParams();
  // Language translation
  const { t } = useTranslation();

  const onBack = () => {
    navigate("/admin/round_management");
  };

  const getAgeRange = () => {
    if (selected.start_age && selected.end_age) {
      return `${selected.start_age} ~ ${selected.end_age}`;
    } else if (selected.start_age && !selected.end_age) {
      return `${selected.start_age} ~ `;
    } else if (!selected.start_age && selected.end_age) {
      return `~ ${selected.end_age}`;
    } else {
      return "";
    }
  };

  useEffect(() => {
    getRounding({ id });
  }, [getRounding]);

  useEffect(() => {
    if (selected.user) {
      setSelectedUser(selected.user);
    }
  }, [selected]);

  return (
    <>
      <UserHeader />
      {/* Page content */}
      <Container className="mt--7" fluid>
        <Row>
          <Col className="order-xl-2 mb-5 mb-xl-0" xl="4">
            <Card className="card-profile shadow">
              <Row className="justify-content-center">
                <Col className="order-lg-2" lg="3">
                  <div style={{ position: "relative" }}>
                    <div
                      style={{
                        position: "absolute",
                        width: "180px",
                        height: "180px",
                        left: "-60px",
                        top: "-60px",
                        objectFit: "contain",
                        display: "flex",
                        borderRadius: "50%",
                        overflow: "hidden",
                        backgroundColor: "#eee",
                      }}
                    >
                      <img
                        alt="..."
                        src={`${API_BASE_URL}/${selectedUser.logo}`}
                        style={{ width: "100%", objectFit: "cover" }}
                      />
                    </div>
                  </div>
                </Col>
              </Row>
              <CardHeader className="text-center border-0 pt-8 pt-md-4 pb-0 pb-md-4">
                <div className="d-flex justify-content-between"></div>
              </CardHeader>
              <CardBody className="pt-0 pt-md-4">
                <Row>
                  <div className="col">
                    <div className="card-profile-stats d-flex justify-content-center mt-md-5">
                      <div>
                        <span className="heading">
                          {selectedUser.experience_years}
                        </span>
                        <span className="description">
                          {t("memberPage.experience")}
                        </span>
                      </div>
                      <div>
                        <span className="heading">
                          {selectedUser.average_score}
                        </span>
                        <span className="description">
                          {t("memberPage.averageScore")}
                        </span>
                      </div>
                      <div>
                        <span className="heading">
                          {selectedUser.month_average_score}
                        </span>
                        <span className="description">
                          {t("memberPage.monthAverageScore")}
                        </span>
                      </div>
                    </div>
                  </div>
                </Row>
                <div className="text-center">
                  <h3>
                    {selectedUser.fullname}
                    <span className="font-weight-light">
                      ,{" "}
                      {selectedUser.birthday
                        ? new Date().getFullYear() -
                          new Date(selectedUser.birthday).getFullYear()
                        : ""}
                    </span>
                  </h3>
                </div>
              </CardBody>
            </Card>
          </Col>
          <Col className="order-xl-1" xl="8">
            <Card className="bg-secondary shadow">
              <CardHeader className="bg-white border-0">
                <Row className="align-items-center">
                  <Col xs="8">
                    <h3 className="mb-0">{t("roundingPage.rounding")}</h3>
                  </Col>
                  <Col className="text-right" xs="4">
                    {/* <Button
                      color="primary"
                      onClick={(e) => {
                        e.preventDefault();
                        navigate(`/admin/user_management/update/${id}`);
                      }}
                      size="sm"
                    >
                      {t("common.edit")}
                    </Button> */}
                  </Col>
                </Row>
              </CardHeader>
              <CardBody>
                <Form>
                  <div className="pl-lg-4">
                    <Row>
                      <Col lg="6">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-username"
                          >
                            {t("common.title")}
                          </label>
                          <Input
                            className="form-control-alternative"
                            defaultValue={selected.title}
                            id="input-username"
                            placeholder={t("common.title")}
                            type="text"
                            disabled
                          />
                        </FormGroup>
                      </Col>
                      <Col lg="6">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-email"
                          >
                            {t("common.type")}
                          </label>
                          <Input
                            className="form-control-alternative"
                            id="input-email"
                            defaultValue={t("common." + selected.type)}
                            placeholder={t("common.email")}
                            type="text"
                            disabled
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col lg="6">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-first-name"
                          >
                            {t("roundingPage.sexOption")}
                          </label>
                          <Input
                            className="form-control-alternative"
                            id="input-first-name"
                            defaultValue={t(
                              "roundingPage." + selected.sex_option
                            )}
                            placeholder={t("roundingPage.sexOption")}
                            type="text"
                            disabled
                          />
                        </FormGroup>
                      </Col>
                      <Col lg="6">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-last-name"
                          >
                            {t("roundingPage.maxOption")}
                          </label>
                          <Input
                            className="form-control-alternative"
                            defaultValue={selected.max_members}
                            id="input-last-name"
                            placeholder={t("roundingPage.maxOption")}
                            type="text"
                            disabled
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                  </div>
                  <hr className="my-4" />
                  {/* Address */}
                  <div className="pl-lg-4">
                    <Row>
                      <Col md="12">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-address"
                          >
                            {t("roundingPage.address")}
                          </label>
                          <Input
                            className="form-control-alternative"
                            defaultValue={selected.address}
                            id="input-address"
                            placeholder={t("common.address")}
                            type="text"
                            disabled
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col lg="6">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-city"
                          >
                            {t("roundingPage.ageOption")}
                          </label>
                          <Input
                            className="form-control-alternative"
                            defaultValue={getAgeRange()}
                            id="input-city"
                            placeholder={t("roundingPage.ageOption")}
                            type="text"
                            disabled
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                  </div>
                  <hr className="my-4" />
                  {/* Description */}
                  <h6 className="heading-small text-muted mb-4">
                    {t("memberPage.introduction")}
                  </h6>
                  <div className="pl-lg-4">
                    <FormGroup>
                      <label></label>
                      <Input
                        className="form-control-alternative"
                        placeholder={t("memberPage.introduction")}
                        rows="4"
                        defaultValue={selected.introduction}
                        type="textarea"
                        disabled
                      />
                    </FormGroup>
                  </div>
                </Form>
              </CardBody>
              <CardFooter>
                <div className="d-flex justify-content-center">
                  <Button color="secondary" type="button" onClick={onBack}>
                    {t("common.back")}
                  </Button>
                </div>
              </CardFooter>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default RoundingDetailView;
