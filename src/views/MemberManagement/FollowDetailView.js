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
  Table,
  Pagination,
  PaginationItem,
  PaginationLink,
} from "reactstrap";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import { useNavigate, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { useMemberService } from "features/member/hooks/useMemberService";
import UserHeader from "components/Headers/UserHeader";
import { API_BASE_URL } from "config";
import useMessageService from "features/message/hooks/useMessageService";
import { TABLE_PAGE_LIMIT } from "config";
import useFollowService from "features/following/hooks/useFollowService";

const FollowDetailView = () => {
  const navigate = useNavigate();
  const { getMember } = useMemberService();
  const { fetchUserMessage } = useMessageService();
  const {
    fetchUserFollowed,
    fetchUserFollowing,
    fetchRoundFollowing,
    fetchBlogFollowing,
  } = useFollowService();
  const { selected } = useSelector((state) => state.member);
  const { userMessageData } = useSelector((state) => state.message);
  const { follow } = useSelector((state) => state.follow);
  const [blogFollowing, setBlogFollowing] = useState({});
  const [roundFollowing, setRoundFollowing] = useState({});
  const [userFollowed, setUserFollowed] = useState({});
  const [userFollowing, setUserFollowing] = useState({});
  const { id } = useParams();
  // Language translation
  const {
    t,
    i18n: { changeLanguage, language },
  } = useTranslation();

  const onBack = () => {
    navigate("/admin/user_management");
  };
  // Tab Implementation
  const [tabKey, setTabKey] = useState("followed_by");
  // Pagination & Search
  const [currentPage, setCurrentPage] = useState(1);
  const [keyWord, setKeyword] = useState("");
  const onSearch = () => {
    setCurrentPage(1);
    fetchUserMessage({
      id: id,
      limit: TABLE_PAGE_LIMIT,
      skip: (currentPage - 1) * TABLE_PAGE_LIMIT,
      key: keyWord,
    });
  };

  useEffect(() => {
    if (follow) {
      if (follow.bolgFollowing) setBlogFollowing(follow.bolgFollowing);
      if (follow.roundFollowing) setRoundFollowing(follow.roundFollowing);
      if (follow.userFollowed) setUserFollowed(follow.userFollowed);
      if (follow.userFollowing) setUserFollowing(follow.userFollowing);
    }
  }, [follow]);

  useEffect(() => {
    getMember({ id });
    fetchUserMessage({
      id: id,
      limit: TABLE_PAGE_LIMIT,
      skip: (currentPage - 1) * TABLE_PAGE_LIMIT,
      key: keyWord,
    });
  }, [getMember, fetchUserMessage, currentPage]);

  useEffect(() => {
    if (tabKey === "followed_by") {
      fetchUserFollowed({
        id: id,
        limit: TABLE_PAGE_LIMIT,
        skip: (currentPage - 1) * TABLE_PAGE_LIMIT,
        key: keyWord,
      });
    } else if (tabKey === "following") {
      fetchUserFollowing({
        id: id,
        limit: TABLE_PAGE_LIMIT,
        skip: (currentPage - 1) * TABLE_PAGE_LIMIT,
        key: keyWord,
      });
    } else if (tabKey === "round") {
      fetchRoundFollowing({
        id: id,
        limit: TABLE_PAGE_LIMIT,
        skip: (currentPage - 1) * TABLE_PAGE_LIMIT,
        key: keyWord,
      });
    } else if (tabKey === "blog") {
      fetchBlogFollowing({
        id: id,
        limit: TABLE_PAGE_LIMIT,
        skip: (currentPage - 1) * TABLE_PAGE_LIMIT,
        key: keyWord,
      });
    }
  }, [
    tabKey,
    currentPage,
    fetchUserFollowed,
    fetchUserFollowing,
    fetchRoundFollowing,
    fetchBlogFollowing,
  ]);

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
                        src={`${API_BASE_URL}/${selected.logo}`}
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
                          {selected.experience_years}
                        </span>
                        <span className="description">
                          {t("memberPage.experience")}
                        </span>
                      </div>
                      <div>
                        <span className="heading">
                          {selected.average_score}
                        </span>
                        <span className="description">
                          {t("memberPage.averageScore")}
                        </span>
                      </div>
                      <div>
                        <span className="heading">
                          {selected.month_average_score}
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
                    {selected.fullname}
                    <span className="font-weight-light">
                      ,{" "}
                      {selected.birthday
                        ? new Date().getFullYear() -
                          new Date(selected.birthday).getFullYear()
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
                    <h3 className="mb-0">
                      {t("memberPage.user")}
                      {t("memberPage.followInfo")}
                    </h3>
                  </Col>
                  <Col className="text-right" xs="6">
                    <Button
                      color="primary"
                      onClick={(e) => {
                        e.preventDefault();
                        navigate(`/admin/user_management/detail/${id}`);
                      }}
                      size="sm"
                    >
                      {t("common.back")}
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
                        navigate(`/admin/user_management/following/${id}`);
                      }}
                      size="sm"
                    >
                      {t("common.follow")}
                    </Button>
                  </Col>
                </Row>
              </CardHeader>
              <CardBody>
                <Tabs
                  id="controlled-tab-example"
                  activeKey={tabKey}
                  onSelect={(k) => {
                    setTabKey(k);
                    setCurrentPage(1);
                  }}
                  className="mb-3"
                >
                  <Tab eventKey="followed_by" title="Followed by">
                    <Row className="icon-examples">
                      <Table
                        className="align-items-center table-flush"
                        responsive
                      >
                        <thead className="thead-light">
                          <tr>
                            <th scope="col">No</th>
                            <th scope="col">{t("common.user")}</th>
                            <th scope="col" />
                          </tr>
                        </thead>
                        <tbody>
                          {userFollowed.users?.map((item, idx) => (
                            <tr key={`members-tbl-r-${idx}`}>
                              <td>
                                {(currentPage - 1) * TABLE_PAGE_LIMIT + idx + 1}
                              </td>
                              <td>{item.fullname}</td>
                            </tr>
                          ))}
                        </tbody>
                      </Table>
                    </Row>
                  </Tab>
                  <Tab eventKey="following" title="Following">
                    <Row className="icon-examples">
                      <Table
                        className="align-items-center table-flush"
                        responsive
                      >
                        <thead className="thead-light">
                          <tr>
                            <th scope="col">No</th>
                            <th scope="col">{t("common.user")}</th>
                            <th scope="col" />
                          </tr>
                        </thead>
                        <tbody>
                          {userFollowing.users?.map((item, idx) => (
                            <tr key={`members-tbl-r-${idx}`}>
                              <td>
                                {(currentPage - 1) * TABLE_PAGE_LIMIT + idx + 1}
                              </td>
                              <td>{item.fullname}</td>
                            </tr>
                          ))}
                        </tbody>
                      </Table>
                    </Row>
                  </Tab>
                  <Tab eventKey="round" title="Rounding">
                    <Row className="icon-examples">
                      <Table
                        className="align-items-center table-flush"
                        responsive
                      >
                        <thead className="thead-light">
                          <tr>
                            <th scope="col">No</th>
                            <th scope="col">{t("common.user")}</th>
                            <th scope="col" />
                          </tr>
                        </thead>
                        <tbody>
                          {roundFollowing.users?.map((item, idx) => (
                            <tr key={`members-tbl-r-${idx}`}>
                              <td>
                                {(currentPage - 1) * TABLE_PAGE_LIMIT + idx + 1}
                              </td>
                              <td>{item.fullname}</td>
                            </tr>
                          ))}
                        </tbody>
                      </Table>
                    </Row>
                  </Tab>
                  <Tab eventKey="blog" title="Blog">
                    <Row className="icon-examples">
                      <Table
                        className="align-items-center table-flush"
                        responsive
                      >
                        <thead className="thead-light">
                          <tr>
                            <th scope="col">No</th>
                            <th scope="col">{t("common.user")}</th>
                            <th scope="col" />
                          </tr>
                        </thead>
                        <tbody>
                          {blogFollowing.users?.map((item, idx) => (
                            <tr key={`members-tbl-r-${idx}`}>
                              <td>
                                {(currentPage - 1) * TABLE_PAGE_LIMIT + idx + 1}
                              </td>
                              <td>{item.fullname}</td>
                            </tr>
                          ))}
                        </tbody>
                      </Table>
                    </Row>
                  </Tab>
                </Tabs>
              </CardBody>
              <CardFooter className="py-4">
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
                      disabled={
                        currentPage >
                        userMessageData.data.count / TABLE_PAGE_LIMIT
                      }
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
              </CardFooter>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default FollowDetailView;
