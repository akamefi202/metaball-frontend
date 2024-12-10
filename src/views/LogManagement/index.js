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

  if (loading) {
    return <></>;
  }

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
                      <th scope="col">{t("common.user")} ID</th>
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
                        <td>{tbItem?.user?._id}</td>
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
                        disabled={currentPage > count / TABLE_PAGE_LIMIT_LARGE}
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
