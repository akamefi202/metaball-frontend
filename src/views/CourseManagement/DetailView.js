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
import useClubService from "features/club/hooks/useClubService";

const ClubDetailView = () => {
  const navigate = useNavigate();
  const { getClub } = useClubService();
  const { selected } = useSelector((state) => state.club);
  const [selectedUser, setSelectedUser] = useState({});
  const [selectedLocation, setSelectedLocation] = useState({});
  const { id } = useParams();
  // Language translation
  const { t } = useTranslation();

  const onBack = () => {
    navigate("/admin/club_management");
  };

  // const getAgeRange = () => {
  //   if (selected.start_age && selected.end_age) {
  //     return `${selected.start_age} ~ ${selected.end_age}`;
  //   } else if (selected.start_age && !selected.end_age) {
  //     return `${selected.start_age} ~ `;
  //   } else if (!selected.start_age && selected.end_age) {
  //     return `~ ${selected.end_age}`;
  //   } else {
  //     return "";
  //   }
  // };

  useEffect(() => {
    getClub({ id });
  }, [getClub]);

  useEffect(() => {
    if (selected.user) {
      setSelectedUser(selected.user);
      setSelectedLocation(selected.location);
    }
  }, [selected]);

  return (
    <>
      <UserHeader />
      {/* Page content */}
      <Container className="mt--7" fluid>
        <Row>
          <Col className="order-xl-1" xl="12">
            <Card className="bg-secondary shadow">
              <CardHeader className="bg-white border-0">
                <Row className="align-items-center">
                  <Col xs="8">
                    <h3 className="mb-0">{t("clubPage.club")}</h3>
                  </Col>
                  <Col className="text-right" xs="4">
                    <Button
                      color="secondary"
                      onClick={(e) => {
                        e.preventDefault();
                        navigate(`/admin/club_management/message/${id}`);
                      }}
                      size="sm"
                    >
                      {t("common.message")}
                    </Button>
                  </Col>
                </Row>
              </CardHeader>
              <CardBody>
                <div className="d-flex justify-content-center">
                  <div
                    style={{
                      display: "flex",
                      width: "180px",
                      height: "180px",
                      borderRadius: "50%",
                      overflow: "hidden",
                      backgroundColor: "#eee",
                    }}
                  >
                    <img
                      alt="#"
                      src={`${API_BASE_URL}/${selected.logo}`}
                      style={{ width: "100%", objectFit: "cover" }}
                    />
                  </div>
                </div>
                <Form>
                  <div className="pl-lg-4">
                    <Row>
                      <Col lg="6">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-username"
                          >
                            {t("common.name")}
                          </label>
                          <Input
                            className="form-control-alternative"
                            defaultValue={selected.name}
                            id="input-username"
                            placeholder={t("common.name")}
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
                            {t("memberPage.user")}
                          </label>
                          <Input
                            className="form-control-alternative"
                            id="input-email"
                            defaultValue={selectedUser.fullname}
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
                            {t("clubPage.qualification")}
                          </label>
                          <Input
                            className="form-control-alternative"
                            id="input-first-name"
                            defaultValue={selected.qualification}
                            placeholder={t("clubPage.qualification")}
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
                            {t("clubPage.members")}
                          </label>
                          <Input
                            className="form-control-alternative"
                            defaultValue={selected.member_ids?.length}
                            id="input-last-name"
                            placeholder={t("clubPage.members")}
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
                      <Col md="3">
                        <label
                          className="form-control-label"
                          htmlFor="input-address"
                        >
                          {t("common.location")} : {selectedLocation?.name}
                        </label>
                      </Col>
                      <Col md="3">
                        <div>
                          <img
                            alt="#"
                            src={`${API_BASE_URL}/${selectedLocation?.file}`}
                          />
                        </div>
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
                            defaultValue={selected.limit_age}
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

export default ClubDetailView;
