/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
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
import { useMemberService } from "features/member/hooks/useMemberService";
import UserHeader from "components/Headers/UserHeader";
import { API_BASE_URL } from "config";
import { LoadingComponent } from "components/Loading";

const MemberDetailView = () => {
  const navigate = useNavigate();
  const { getMember } = useMemberService();
  const { selected, loading } = useSelector((state) => state.member);
  const { id } = useParams();
  const [selectedItem, setSelectedItem] = useState({});
  // Language translation
  const { t } = useTranslation();

  const onBack = () => {
    navigate("/admin/user_management");
  };

  useEffect(() => {
    getMember({ id });
  }, [getMember]);

  useEffect(() => {
    setSelectedItem(selected);
  }, [selected]);
  // if (loading) {
  //   return (
  //     <>
  //       <LoadingComponent />
  //     </>
  //   );
  // }

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
                        src={`${API_BASE_URL}/${selectedItem.logo}`}
                        style={{ width: "100%", objectFit: "cover" }}
                      />
                    </div>
                  </div>{" "}
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
                          {selectedItem.experience
                            ? selectedItem.experience
                            : 0}
                        </span>
                        <span className="description">
                          {t("memberPage.experience")}
                        </span>
                      </div>
                      <div>
                        <span className="heading">
                          {selectedItem.hit ? selectedItem.hit : 0}
                        </span>
                        <span className="description">
                          {t("memberPage.averageScore")}
                        </span>
                      </div>
                      <div>
                        <span className="heading">
                          {selectedItem.month_average_score
                            ? selectedItem.month_average_score
                            : 0}
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
                    {selectedItem.fullname}
                    <span className="font-weight-light">
                      ,{" "}
                      {selectedItem.birthday
                        ? new Date().getFullYear() -
                          new Date(selectedItem.birthday).getFullYear()
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
                  <Col xs="6">
                    <h3 className="mb-0">{t("memberPage.user")}</h3>
                  </Col>
                  <Col className="text-right" xs="6">
                    <Button
                      color="primary"
                      onClick={(e) => {
                        e.preventDefault();
                        navigate(`/admin/user_management/update/${id}`);
                      }}
                      size="sm"
                    >
                      {t("common.edit")}
                    </Button>
                    <Button
                      color="secondary"
                      onClick={(e) => {
                        e.preventDefault();
                        navigate(`/admin/user_management/message/${id}`);
                      }}
                      size="sm"
                    >
                      {t("common.message")}
                    </Button>
                    <Button
                      color="warning"
                      onClick={(e) => {
                        e.preventDefault();
                        navigate(`/admin/user_management/follow/${id}`);
                      }}
                      size="sm"
                    >
                      {t("memberPage.followInfo")}
                    </Button>
                  </Col>
                </Row>
              </CardHeader>
              <CardBody>
                <Form>
                  <h6 className="heading-small text-muted mb-4">
                    {t("memberPage.userInfo")}
                  </h6>
                  <div className="pl-lg-4">
                    <Row>
                      <Col lg="6">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-email"
                          >
                            {t("common.email")}
                          </label>
                          <Input
                            className="form-control-alternative"
                            id="input-email"
                            defaultValue={selectedItem.email}
                            placeholder={""}
                            type="email"
                            disabled
                          />
                        </FormGroup>
                      </Col>
                      <Col lg="6">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-first-name"
                          >
                            {t("common.fullname")}
                          </label>
                          <Input
                            className="form-control-alternative"
                            id="input-first-name"
                            defaultValue={selectedItem.fullname}
                            placeholder={""}
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
                            htmlFor="input-last-name"
                          >
                            {t("memberPage.occupation")}
                          </label>
                          <Input
                            className="form-control-alternative"
                            defaultValue={selectedItem.occupation}
                            id="input-last-name"
                            placeholder={""}
                            type="text"
                            disabled
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                  </div>
                  <hr className="my-4" />
                  {/* Address */}
                  <h6 className="heading-small text-muted mb-4">
                    {t("memberPage.contactInfo")}
                  </h6>
                  <div className="pl-lg-4">
                    <Row>
                      <Col md="12">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-address"
                          >
                            {t("common.address")}
                          </label>
                          <Input
                            className="form-control-alternative"
                            defaultValue={selectedItem.address}
                            id="input-address"
                            placeholder={""}
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
                            {t("common.phone")}
                          </label>
                          <Input
                            className="form-control-alternative"
                            defaultValue={selectedItem.phone}
                            id="input-city"
                            placeholder={""}
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
                        placeholder={""}
                        rows="4"
                        defaultValue={selectedItem.introduction}
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

export default MemberDetailView;
