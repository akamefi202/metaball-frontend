/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
// reactstrap components
import {
  Container,
  Table,
  Row,
  Card,
  CardHeader,
  FormGroup,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Input,
  Button,
  CardFooter,
  Pagination,
  PaginationItem,
  PaginationLink,
} from "reactstrap";

// core components
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";

import { TABLE_PAGE_LIMIT_LARGE } from "config";
import Header from "components/Headers/Header.js";
import useSyslogService from "features/syslog/hooks/useSyslogService";
import { getFormatString } from "libs/utils";
import { LoadingComponent } from "components/Loading";
import { TABLE_PAGE_LIMIT } from "config";

const LogManagement = () => {
  // const navigate = useNavigate();
  const { fetchAllSyslog } = useSyslogService();
  const { loading, syslog, count } = useSelector((state) => state.syslog);
  const [tblData, setTblData] = useState([]);
  // Language translation
  const { t } = useTranslation();
  // Pagination & Search
  const [currentPage, setCurrentPage] = useState(1);
  const [keyWord, setKeyword] = useState("");
  const [code, setCode] = useState("");
  const [type, setType] = useState("");
  const [action, setAction] = useState("");

  const onSearch = () => {
    setCurrentPage(1);
    fetchAllSyslog({
      limit: TABLE_PAGE_LIMIT_LARGE,
      skip: (currentPage - 1) * TABLE_PAGE_LIMIT_LARGE,
      key: keyWord,
      code,
      type,
      action,
    });
  };

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
    fetchAllSyslog({
      limit: TABLE_PAGE_LIMIT_LARGE,
      skip: (currentPage - 1) * TABLE_PAGE_LIMIT_LARGE,
      key: keyWord,
      code,
      type,
      action,
    });
  }, [fetchAllSyslog, currentPage]);

  useEffect(() => {
    if (syslog && syslog.length > 0) setTblData(syslog);
  }, [syslog]);

  // if (loading) {
  //   return (
  //     <>
  //       <LoadingComponent />
  //     </>
  //   );
  // }

  return (
    <>
      <Header />
      {/* Page content */}
      <Container className="mt--7" fluid>
        <>
          <Row>
            <div className="col">
              <Card className="shadow">
                <>
                  <CardHeader className="border-0 d-flex justify-content-between align-items-center">
                    <h3 className="mb-0 mr-2">{t("sideMenu.logManagement")}</h3>
                    <div className="d-flex align-items-center">
                      <FormGroup className="mb-0 mr-2">
                        <InputGroup className="input-group-alternative">
                          <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                              <i className="fas fa-search" />
                            </InputGroupText>
                          </InputGroupAddon>
                          <Input
                            placeholder={t("common.searchPlaceholder")}
                            type="text"
                            onChange={(e) => setKeyword(e.target.value)}
                          />
                        </InputGroup>
                      </FormGroup>
                      <FormGroup className="mb-0 mr-2">
                        <InputGroup className="input-group-alternative">
                          <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                              <i className="fas fa-search" />
                            </InputGroupText>
                          </InputGroupAddon>
                          <Input
                            placeholder={t("common.searchPlaceholderCode")}
                            type="text"
                            onChange={(e) => setCode(e.target.value)}
                          />
                        </InputGroup>
                      </FormGroup>
                      <FormGroup className="mb-0 mr-2">
                        <InputGroup className="input-group-alternative">
                          <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                              <i className="fas fa-search" />
                            </InputGroupText>
                          </InputGroupAddon>
                          <Input
                            placeholder={t("common.searchPlaceholderAction")}
                            type="text"
                            onChange={(e) => setAction(e.target.value)}
                          />
                        </InputGroup>
                      </FormGroup>
                      <FormGroup className="mb-0 mr-2">
                        <InputGroup className="input-group-alternative">
                          <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                              <i className="fas fa-search" />
                            </InputGroupText>
                          </InputGroupAddon>
                          <Input
                            placeholder={t("common.searchPlaceholderType")}
                            type="text"
                            onChange={(e) => setType(e.target.value)}
                          />
                        </InputGroup>
                      </FormGroup>
                      <Button
                        className="btn-icon btn-3"
                        color="primary"
                        type="button"
                        onClick={onSearch}
                      >
                        <span className="btn-inner--icon">
                          <i className="fas fa-search" />
                        </span>
                      </Button>
                    </div>
                  </CardHeader>
                </>

                <Table className="align-items-center table-flush" responsive>
                  <thead className="thead-light">
                    <tr>
                      <th scope="col">No</th>
                      <th scope="col">{t("common.user")}</th>
                      <th scope="col">Type</th>
                      <th scope="col">Action</th>
                      <th scope="col">Code</th>
                      <th scope="col">Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {tblData.map((tbItem, idx) => (
                      <tr key={"tbItem" + idx}>
                        <td>
                          {(currentPage - 1) * TABLE_PAGE_LIMIT_LARGE + idx + 1}
                        </td>
                        <td>{tbItem?.user?.email}</td>
                        <td>{tbItem.type}</td>
                        <td>{tbItem.action}</td>
                        <td>{tbItem.code}</td>
                        <td>{getFormatString(tbItem.created_at)}</td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
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
            </div>
          </Row>
          {/* <CommonAddEditModal
            open={isOpenAddModal}
            data={modalData}
            isEditable={isEditable}
          /> */}
        </>
      </Container>
    </>
  );
};

export default LogManagement;
