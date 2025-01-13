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
import { LoadingComponent } from "components/Loading";

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
  const { selected, loading } = useSelector((state) => state.member);
  const { userMessageData } = useSelector((state) => state.message);
  const { follow } = useSelector((state) => state.follow);
  const [blogFollowing, setBlogFollowing] = useState({});
  const [roundFollowing, setRoundFollowing] = useState({});
  const [userFollowed, setUserFollowed] = useState({});
  const [userFollowing, setUserFollowing] = useState({});
  const [count, setCount] = useState(0);
  const { id } = useParams();
  // Language translation
  const { t } = useTranslation();

  // const onBack = () => {
  //   navigate("/admin/user_management");
  // };
  // Tab Implementation
  const [tabKey, setTabKey] = useState("userFollowed");
  // Pagination & Search
  const [currentPage, setCurrentPage] = useState(1);
  // const onSearch = () => {
  //   setCurrentPage(1);
  //   fetchUserMessage({
  //     id: id,
  //     limit: TABLE_PAGE_LIMIT,
  //     skip: (currentPage - 1) * TABLE_PAGE_LIMIT,
  //     key: keyWord,
  //   });
  // };
  // Pagination

  const [pageItem, SetPageItem] = useState({
    start: 0,
    end: TABLE_PAGE_LIMIT,
  });

  const onPageChangeEvent = (start, end) => {
    SetPageItem({
      start: start,
      end: end,
    });
  };

  // const OnPerPostChangeEvent = (e) => {
  //   SetPostPerPage(e.target.value);
  //   setCurrentPage(1);
  // };

  const numOfPages = Math.ceil(count / TABLE_PAGE_LIMIT);

  const numOfButtons = [];
  for (let i = 1; i <= numOfPages; i++) {
    numOfButtons.push(i);
  }

  const prevPageClick = () => {
    if (currentPage === 1) {
      setCurrentPage(currentPage);
    } else {
      setCurrentPage(currentPage - 1);
    }
  };

  const nextPageClick = () => {
    if (currentPage === numOfButtons.length) {
      setCurrentPage(currentPage);
    } else {
      setCurrentPage(currentPage + 1);
    }
  };

  const [arrOfCurrButtons, setArrOfCurrButtons] = useState([]);

  useEffect(() => {
    let tempNumberOfButtons = [...arrOfCurrButtons];

    let dotsInitial = "...";
    let dotsLeft = "... ";
    let dotsRight = " ...";

    if (numOfButtons.length < 6) {
      tempNumberOfButtons = numOfButtons;
    } else if (currentPage >= 1 && currentPage <= 3) {
      tempNumberOfButtons = [1, 2, 3, 4, dotsInitial, numOfButtons.length];
    } else if (currentPage === 4) {
      const sliced = numOfButtons.slice(0, 5);
      tempNumberOfButtons = [...sliced, dotsInitial, numOfButtons.length];
    } else if (currentPage > 4 && currentPage < numOfButtons.length - 2) {
      // from 5 to 8 -> (10 - 2)
      const sliced1 = numOfButtons.slice(currentPage - 2, currentPage);
      // sliced1 (5-2, 5) -> [4,5]
      const sliced2 = numOfButtons.slice(currentPage, currentPage + 1);
      // sliced1 (5, 5+1) -> [6]
      tempNumberOfButtons = [
        1,
        dotsLeft,
        ...sliced1,
        ...sliced2,
        dotsRight,
        numOfButtons.length,
      ];
      // [1, '...', 4, 5, 6, '...', 10]
    } else if (currentPage > numOfButtons.length - 3) {
      // > 7
      const sliced = numOfButtons.slice(numOfButtons.length - 4);
      // slice(10-4)
      tempNumberOfButtons = [1, dotsLeft, ...sliced];
    } else if (currentPage === dotsInitial) {
      // [1, 2, 3, 4, "...", 10].length = 6 - 3  = 3
      // arrOfCurrButtons[3] = 4 + 1 = 5
      // or
      // [1, 2, 3, 4, 5, "...", 10].length = 7 - 3 = 4
      // [1, 2, 3, 4, 5, "...", 10][4] = 5 + 1 = 6
      setCurrentPage(arrOfCurrButtons[arrOfCurrButtons.length - 3] + 1);
    } else if (currentPage === dotsRight) {
      setCurrentPage(arrOfCurrButtons[3] + 2);
    } else if (currentPage === dotsLeft) {
      setCurrentPage(arrOfCurrButtons[3] - 2);
    }

    setArrOfCurrButtons(tempNumberOfButtons);
  }, [currentPage, TABLE_PAGE_LIMIT, numOfPages]);

  useEffect(() => {
    if (follow) {
      if (follow.bolgFollowing) setBlogFollowing(follow.bolgFollowing);
      if (follow.roundFollowing) setRoundFollowing(follow.roundFollowing);
      if (follow.userFollowed) setUserFollowed(follow.userFollowed);
      if (follow.userFollowing) setUserFollowing(follow.userFollowing);
    }
    if (tabKey === "bolgFollowing") {
      setCount(follow?.bolgFollowing.count ? follow?.bolgFollowing.count : 0);
    } else if (tabKey === "roundFollowing") {
      setCount(follow?.roundFollowing.count ? follow?.roundFollowing.count : 0);
    } else if (tabKey === "userFollowing") {
      setCount(follow?.userFollowing.count ? follow?.userFollowing.count : 0);
    } else if (tabKey === "userFollowed") {
      setCount(follow?.userFollowed.count ? follow?.userFollowed.count : 0);
    } else {
      setCount(0);
    }
  }, [follow, tabKey]);

  useEffect(() => {
    getMember({ id });
    fetchUserMessage({
      id: id,
      limit: TABLE_PAGE_LIMIT,
      skip: (currentPage - 1) * TABLE_PAGE_LIMIT,
      key: tabKey,
    });
  }, [getMember, fetchUserMessage, currentPage]);

  useEffect(() => {
    if (tabKey === "userFollowed") {
      fetchUserFollowed({
        id: id,
        limit: TABLE_PAGE_LIMIT,
        skip: (currentPage - 1) * TABLE_PAGE_LIMIT,
        key: tabKey,
      });
    } else if (tabKey === "userFollowing") {
      fetchUserFollowing({
        id: id,
        limit: TABLE_PAGE_LIMIT,
        skip: (currentPage - 1) * TABLE_PAGE_LIMIT,
        key: tabKey,
      });
    } else if (tabKey === "roundFollowing") {
      fetchRoundFollowing({
        id: id,
        limit: TABLE_PAGE_LIMIT,
        skip: (currentPage - 1) * TABLE_PAGE_LIMIT,
        key: tabKey,
      });
    } else if (tabKey === "bolgFollowing") {
      fetchBlogFollowing({
        id: id,
        limit: TABLE_PAGE_LIMIT,
        skip: (currentPage - 1) * TABLE_PAGE_LIMIT,
        key: tabKey,
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
                          {selected.experience ? selected.experience : 0}
                        </span>
                        <span className="description">
                          {t("memberPage.experience")}
                        </span>
                      </div>
                      <div>
                        <span className="heading">
                          {selected.hit ? selected.hit : 0}
                        </span>
                        <span className="description">
                          {t("memberPage.averageScore")}
                        </span>
                      </div>
                      <div>
                        <span className="heading">
                          {selected.month_average_score
                            ? selected.month_average_score
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
                  <Tab eventKey="userFollowed" title="Followed by">
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
                  <Tab eventKey="userFollowing" title="Following">
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
                  <Tab eventKey="roundFollowing" title="Rounding">
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
                  <Tab eventKey="bolgFollowing" title="Blog">
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
                      <PaginationLink onClick={prevPageClick} tabIndex="-1">
                        <i className="fas fa-angle-left" />
                        <span className="sr-only">Previous</span>
                      </PaginationLink>
                    </PaginationItem>
                    {arrOfCurrButtons.map((data, index) => {
                      return (
                        <PaginationItem
                          key={index}
                          className={currentPage === data ? "active" : ""}
                        >
                          <PaginationLink
                            className="dt-link"
                            onClick={() => setCurrentPage(data)}
                          >
                            {data}
                          </PaginationLink>
                        </PaginationItem>
                      );
                    })}
                    <PaginationItem disabled={currentPage > numOfPages}>
                      <PaginationLink onClick={nextPageClick}>
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
