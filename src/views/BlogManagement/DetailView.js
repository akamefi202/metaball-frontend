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
  Table,
  Label,
  Pagination,
  PaginationItem,
  PaginationLink,
} from "reactstrap";

import { useNavigate, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import UserHeader from "components/Headers/UserHeader";
import { API_BASE_URL } from "config";
import useBlogService from "features/blog/hooks/useBlogService";
import { TABLE_PAGE_LIMIT } from "config";
import { useSettingService } from "features/setting/hooks/useSettingService";
import { LoadingComponent } from "components/Loading";
import { getFileType } from "libs/utils";

const BlogDetailView = () => {
  const navigate = useNavigate();
  const { getBlog, fetchReviews, deleteReview } = useBlogService();
  const { fetchAllSettings } = useSettingService();
  const { selected, review, reviewCount, loading } = useSelector(
    (state) => state.blog
  );
  const { setting: settings } = useSelector((state) => state.setting);
  const [selectedUser, setSelectedUser] = useState({});
  const [reviewData, setReviewData] = useState([]);
  const [themeData, setThemeData] = useState([]);
  const { id } = useParams();
  // Language translation
  const { t } = useTranslation();

  const onBack = () => {
    navigate("/admin/blog_management");
  };

  // Pagination & Search
  const [currentPage, setCurrentPage] = useState(1);
  const [keyWord, setKeyword] = useState("");

  // For Delete
  const [idCheckField, setIdCheckField] = useState({});
  // const cleanIdCheckField = () => {
  //   setIdCheckField((prevState) => {
  //     for (let [key, value] of Object.entries(prevState)) {
  //       prevState[key] = false;
  //     }
  //     return { ...prevState };
  //   });
  // };

  const onChangeSelect = (name, value) => {
    setIdCheckField((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const onDeleteReview = (id) => {
    deleteReview([id]);
  };

  const getThemeItem = (id) => {
    if (themeData) {
      for (let i = 0; i < themeData.length; i++) {
        if (themeData[i]._id === id) {
          return themeData[i];
        }
      }
    } else {
      return {};
    }
  };

  useEffect(() => {
    getBlog({ id });
  }, [getBlog]);

  useEffect(() => {
    fetchReviews({
      id: id,
      limit: TABLE_PAGE_LIMIT,
      skip: (currentPage - 1) * TABLE_PAGE_LIMIT,
      key: keyWord,
    });
  }, [fetchReviews]);

  useEffect(() => {
    if (selected.user) {
      setSelectedUser(selected.user);
    }
  }, [selected]);

  useEffect(() => {
    if (review) setReviewData(review);
  }, [review]);

  useEffect(() => {
    fetchAllSettings({
      limit: Number.MAX_SAFE_INTEGER,
      skip: 0,
      key: "",
      type: "blog",
    });
  }, [fetchAllSettings]);

  useEffect(() => {
    if (settings && settings.data) {
      setThemeData(settings.data);
    }
  }, [settings]);
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
                          {selectedUser.experience
                            ? selectedUser.experience
                            : 0}
                        </span>
                        <span className="description">
                          {t("memberPage.experience")}
                        </span>
                      </div>
                      <div>
                        <span className="heading">
                          {selectedUser.hit ? selectedUser.hit : 0}
                        </span>
                        <span className="description">
                          {t("memberPage.averageScore")}
                        </span>
                      </div>
                      <div>
                        <span className="heading">
                          {selectedUser.month_average_score
                            ? selectedUser.month_average_score
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
                    <h3 className="mb-0">{t("sideMenu.blogManagement")}</h3>
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
                  <h6 className="heading-small text-muted">
                    {t("common.title")}
                  </h6>
                  <div className="pl-lg-4">
                    <Row>
                      <Col lg="12">
                        <FormGroup>
                          <label></label>
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
                    </Row>
                  </div>
                  <hr className="my-4" />
                  {/* Images */}
                  <h6 className="heading-small text-muted">
                    {t("common.image")}
                  </h6>
                  <div
                    className="pl-lg-4"
                    style={{
                      display: "flex",
                      flexWrap: "wrap",
                      justifyContent: "center",
                    }}
                  >
                    {selected?.files?.map((file, idx) => {
                      if (getFileType(file) !== "image") {
                        return null;
                      }
                      return (
                        <div
                          key={"blog-img-" + idx}
                          style={{
                            display: "flex",
                            width: "30%",
                            height: 250,
                            padding: "0.5%",
                          }}
                        >
                          <img
                            alt="#"
                            src={`${API_BASE_URL}/${file}`}
                            style={{ width: "100%", objectFit: "cover" }}
                          />
                        </div>
                      );
                    })}
                  </div>
                  <hr className="my-4" />
                  {/* Description */}
                  <h6 className="heading-small text-muted">
                    {t("blogPage.content")}
                  </h6>
                  <div className="pl-lg-4">
                    <FormGroup>
                      <label></label>
                      <Input
                        className="form-control-alternative"
                        placeholder={t("blogPage.content")}
                        rows="4"
                        defaultValue={selected.introduction}
                        type="textarea"
                        disabled
                      />
                    </FormGroup>
                  </div>
                </Form>
                <h6 className="heading-small text-muted">
                  {t("blogPage.review")}
                </h6>
                <Row>
                  <Col>
                    <Table
                      className="align-items-center table-flush"
                      responsive
                    >
                      <thead className="thead-light">
                        <tr>
                          <th scope="col"></th>
                          <th scope="col">No</th>
                          <th scope="col">{t("blogPage.review")}</th>
                          <th scope="col">{t("common.user")}</th>
                          <th scope="col" />
                        </tr>
                      </thead>
                      <tbody>
                        {reviewData.map((item, idx) => (
                          <tr key={`tbl-r-${idx}`}>
                            <td>
                              <FormGroup check>
                                <Input
                                  type="checkbox"
                                  value={idCheckField[item._id]}
                                  onChange={(e) => {
                                    onChangeSelect(item._id, e.target.checked);
                                  }}
                                />
                                <Label check></Label>
                              </FormGroup>
                            </td>
                            <td>
                              {(currentPage - 1) * TABLE_PAGE_LIMIT + idx + 1}
                            </td>
                            <td>{item.content}</td>
                            <td>{item.user?.fullname}</td>
                            <td
                              style={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "flex-end",
                              }}
                            >
                              <button
                                className="btn btn-icon btn-outline-danger btn-sm"
                                onClick={() => onDeleteReview(item._id)}
                              >
                                <span className="btn-inner--icon">
                                  <i className="ni ni-fat-remove"></i>
                                </span>
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </Table>
                  </Col>
                </Row>
                <nav aria-label="...">
                  <Pagination
                    className="pagination justify-content-end mb-0"
                    listClassName="justify-content-end mb-0"
                  >
                    <PaginationItem disabled={currentPage === 1}>
                      <PaginationLink
                        onClick={() => setCurrentPage(currentPage - 1)}
                        tabIndex="-1"
                      >
                        <i className="fas fa-angle-left" />
                        <span className="sr-only">Previous</span>
                      </PaginationLink>
                    </PaginationItem>
                    <PaginationItem className="active">
                      <PaginationLink>{currentPage}</PaginationLink>
                    </PaginationItem>
                    <PaginationItem
                      disabled={currentPage > reviewCount / TABLE_PAGE_LIMIT}
                    >
                      <PaginationLink
                        onClick={() => setCurrentPage(currentPage + 1)}
                      >
                        <i className="fas fa-angle-right" />
                        <span className="sr-only">Next</span>
                      </PaginationLink>
                    </PaginationItem>
                  </Pagination>
                </nav>
                <h6 className="heading-small text-muted">
                  {t("blogPage.theme")}
                </h6>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    flexWrap: "wrap",
                  }}
                >
                  {selected?.theme_ids?.map((idx, index) => {
                    const tmpData = getThemeItem(idx);
                    return (
                      <div
                        key={"theme-item" + index}
                        style={{ width: "30%", margin: "0.5%" }}
                      >
                        <p>{tmpData?.title}</p>
                        {tmpData?.file && (
                          <div
                            style={{ width: 250, height: 250, display: "flex" }}
                          >
                            <img
                              alt="#"
                              src={`${API_BASE_URL}/${tmpData?.file}`}
                              style={{ width: "100%", objectFit: "cover" }}
                            />
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
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

export default BlogDetailView;
