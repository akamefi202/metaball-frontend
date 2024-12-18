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

import { useNavigate, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { useMemberService } from "features/member/hooks/useMemberService";
import UserHeader from "components/Headers/UserHeader";
import { API_BASE_URL } from "config";
import useMessageService from "features/message/hooks/useMessageService";
import { TABLE_PAGE_LIMIT } from "config";
import { LoadingComponent } from "components/Loading";

const MessageDetailView = () => {
  const navigate = useNavigate();
  const { getMember } = useMemberService();
  const { fetchUserMessage } = useMessageService();
  const { selected, loading } = useSelector((state) => state.member);
  const { userMessageData } = useSelector((state) => state.message);
  const { id } = useParams();
  // Language translation
  const { t } = useTranslation();

  // const onBack = () => {
  //   navigate("/admin/user_management");
  // };

  // Pagination & Search
  const [currentPage, setCurrentPage] = useState(1);
  const [keyWord, setKeyword] = useState("");
  // const onSearch = () => {
  //   setCurrentPage(1);
  //   fetchUserMessage({
  //     id: id,
  //     limit: TABLE_PAGE_LIMIT,
  //     skip: (currentPage - 1) * TABLE_PAGE_LIMIT,
  //     key: keyWord,
  //   });
  // };

  useEffect(() => {
    getMember({ id });
    fetchUserMessage({
      id: id,
      limit: TABLE_PAGE_LIMIT,
      skip: (currentPage - 1) * TABLE_PAGE_LIMIT,
      key: keyWord,
    });
  }, [getMember, fetchUserMessage, currentPage]);

  if (loading) {
    return (
      <>
        <LoadingComponent />
      </>
    );
  }

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
                      {t("common.message")}
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
                        navigate(`/admin/user_management/follow/${id}`);
                      }}
                      size="sm"
                    >
                      {t("common.follow")}
                    </Button>
                  </Col>
                </Row>
              </CardHeader>
              <CardBody>
                <Row className="icon-examples">
                  <Table className="align-items-center table-flush" responsive>
                    <thead className="thead-light">
                      <tr>
                        <th scope="col">No</th>
                        <th scope="col">{t("common.message")}</th>
                        <th scope="col">{t("common.from")}</th>
                        <th scope="col">{t("common.to")}</th>
                        <th scope="col">{t("common.date")}</th>
                        <th scope="col" />
                      </tr>
                    </thead>
                    <tbody>
                      {userMessageData.data.messages.map((item, idx) => (
                        <tr key={`members-tbl-r-${idx}`}>
                          <td>
                            {(currentPage - 1) * TABLE_PAGE_LIMIT + idx + 1}
                          </td>
                          <td>{item.msg}</td>
                          <td>{item.from_user.fullname}</td>
                          <td>{item.to_user.fullname}</td>
                          <td>{item.created_at}</td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </Row>
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

export default MessageDetailView;
