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
import moment from "moment";
import { useMemberService } from "features/member/hooks/useMemberService";
import UserHeader from "components/Headers/UserHeader";

const MemberUpdate = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({});
  const { getMember, updateMember } = useMemberService();
  const { selected } = useSelector((state) => state.member);
  const { id } = useParams();
  // Language translation
  const { t } = useTranslation();

  const onBack = () => {
    navigate("/admin/user_management");
  };

  const onChangeFormData = (name, value) => {
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const onUpdate = () => {
    updateMember(formData);
  };

  useEffect(() => {
    getMember({ id });
  }, [getMember]);

  useEffect(() => {
    setFormData(selected);
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
                    <h3 className="mb-0">{t("memberPage.user")}</h3>
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
                            htmlFor="input-username"
                          >
                            {t("common.nickname")}
                          </label>
                          <Input
                            className="form-control-alternative"
                            onChange={(e) =>
                              onChangeFormData(e.target.name, e.target.value)
                            }
                            value={formData.nickname}
                            name="nickname"
                            id="input-username"
                            placeholder={t("common.nickname")}
                            type="text"
                          />
                        </FormGroup>
                      </Col>
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
                            name="email"
                            onChange={(e) =>
                              onChangeFormData(e.target.name, e.target.value)
                            }
                            value={formData.email}
                            placeholder={t("common.email")}
                            type="email"
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
                            {t("common.fullname")}
                          </label>
                          <Input
                            className="form-control-alternative"
                            id="input-first-name"
                            name="fullname"
                            onChange={(e) =>
                              onChangeFormData(e.target.name, e.target.value)
                            }
                            value={formData.fullname}
                            placeholder={t("common.fullname")}
                            type="text"
                          />
                        </FormGroup>
                      </Col>
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
                            onChange={(e) =>
                              onChangeFormData(e.target.name, e.target.value)
                            }
                            value={formData.occupation}
                            id="input-last-name"
                            name="occupation"
                            placeholder={t("memberPage.occupation")}
                            type="text"
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
                            {t("common.birthday")}
                          </label>
                          <Input
                            className="form-control-alternative"
                            id="input-first-name"
                            name="birthday"
                            onChange={(e) =>
                              onChangeFormData(e.target.name, e.target.value)
                            }
                            value={moment(new Date(formData.birthday)).format(
                              "YYYY-MM-DD"
                            )}
                            placeholder={t("common.birthday")}
                            type="date"
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
                            onChange={(e) =>
                              onChangeFormData(e.target.name, e.target.value)
                            }
                            value={formData.address}
                            name="address"
                            id="input-address"
                            placeholder={t("common.address")}
                            type="text"
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
                            onChange={(e) =>
                              onChangeFormData(e.target.name, e.target.value)
                            }
                            value={formData.phone}
                            name="phone"
                            id="input-city"
                            placeholder={t("common.phone")}
                            type="text"
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
                        name="introduction"
                        placeholder={t("memberPage.introduction")}
                        rows="4"
                        onChange={(e) =>
                          onChangeFormData(e.target.name, e.target.value)
                        }
                        value={formData.introduction}
                        type="textarea"
                      />
                    </FormGroup>
                  </div>
                </Form>
              </CardBody>
              <CardFooter>
                <div className="d-flex justify-content-center">
                  <Button color="primary" type="button" onClick={onUpdate}>
                    {t("common.update")}
                  </Button>
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

export default MemberUpdate;
