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
  Pagination,
  PaginationItem,
  PaginationLink,
  Table,
} from "reactstrap";

import { useNavigate, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import UserHeader from "components/Headers/UserHeader";
import useClubService from "features/club/hooks/useClubService";
import useMessageService from "features/message/hooks/useMessageService";
import { TABLE_PAGE_LIMIT } from "config";
import { LoadingComponent } from "components/Loading";
const MessageDetailView = () => {
  const navigate = useNavigate();
  const { getClub } = useClubService();
  const { fetchClubMessage } = useMessageService();
  const { selected, loading } = useSelector((state) => state.club);
  const { clubMessagedata } = useSelector((state) => state.message);
  const [selectedUser, setSelectedUser] = useState({});
  const [selectedLocation, setSelectedLocation] = useState({});
  const { id } = useParams();
  // Language translation
  const { t } = useTranslation();

  // Pagination & Search
  const [currentPage, setCurrentPage] = useState(1);
  const [keyWord, setKeyword] = useState("");

  useEffect(() => {
    getClub({ id });
    fetchClubMessage({
      id: id,
      limit: TABLE_PAGE_LIMIT,
      skip: (currentPage - 1) * TABLE_PAGE_LIMIT,
      key: keyWord,
    });
  }, [getClub, fetchClubMessage, currentPage]);

  useEffect(() => {
    if (selected.user) {
      setSelectedUser(selected.user);
      setSelectedLocation(selected.location);
    }
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
          <Col className="order-xl-1" xl="12">
            <Card className="bg-secondary shadow">
              <CardHeader className="bg-white border-0">
                <Row className="align-items-center">
                  <Col xs="8">
                    <h3 className="mb-0">{t("clubPage.club")}</h3>
                  </Col>
                  <Col className="text-right" xs="4">
                    <Button
                      color="primary"
                      onClick={(e) => {
                        e.preventDefault();
                        navigate(`/admin/club_management/detail/${id}`);
                      }}
                      size="sm"
                    >
                      {t("common.back")}
                    </Button>
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
                <Row className="icon-examples">
                  <Table className="align-items-center table-flush" responsive>
                    <thead className="thead-light">
                      <tr>
                        <th scope="col">No</th>
                        <th scope="col">{t("common.message")}</th>
                        <th scope="col">{t("common.from")}</th>
                        <th scope="col">{t("common.date")}</th>
                        <th scope="col" />
                      </tr>
                    </thead>
                    <tbody>
                      {clubMessagedata.data.messages.map((item, idx) => (
                        <tr key={`members-tbl-r-${idx}`}>
                          <td>
                            {(currentPage - 1) * TABLE_PAGE_LIMIT + idx + 1}
                          </td>
                          <td>{item.msg}</td>
                          <td>{item.from_user.fullname}</td>
                          <td>{item.created_at}</td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </Row>
              </CardBody>
              <CardFooter>
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
                      clubMessagedata.data.count / TABLE_PAGE_LIMIT
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
              </CardFooter>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default MessageDetailView;
