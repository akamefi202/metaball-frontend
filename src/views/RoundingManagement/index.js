import { useState, useEffect } from "react";
// reactstrap components
import {
  Card,
  CardHeader,
  CardBody,
  Table,
  Container,
  Row,
  FormGroup,
  Input,
  Label,
  DropdownToggle,
  DropdownItem,
  DropdownMenu,
  UncontrolledDropdown,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Button,
  CardFooter,
  Pagination,
  PaginationItem,
  PaginationLink,
} from "reactstrap";

import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useRoundingService } from "features/rounding/hooks";
import { TABLE_PAGE_LIMIT } from "config";

// core components
import Header from "components/Headers/Header.js";

const RoundingManagement = () => {
  const navigate = useNavigate();
  const { fetchAllRoundings, deleteRounding } = useRoundingService();
  const { loading, error, rounding, count } = useSelector(
    (state) => state.rounding
  );
  const {
    t,
    i18n: { changeLanguage, language },
  } = useTranslation();

  const [roundings, setRoundings] = useState([]);

  // Pagination & Search
  const [currentPage, setCurrentPage] = useState(1);
  const [keyWord, setKeyword] = useState("");
  const onSearch = () => {
    setCurrentPage(1);
    fetchAllRoundings({
      limit: TABLE_PAGE_LIMIT,
      skip: (currentPage - 1) * TABLE_PAGE_LIMIT,
      key: keyWord,
      start_date: "",
      end_date: "",
    });
  };

  // For delete
  const [idCheckField, setIdCheckField] = useState({});
  const onChangeSelect = (name, value) => {
    setIdCheckField((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  const onDeleteArray = () => {
    const selectedIds = [];
    for (let [key, value] of Object.entries(idCheckField)) {
      if (value) selectedIds.push(key);
    }
    deleteRounding(selectedIds);
    setCurrentPage(1);
  };
  const onDelete = (id) => {
    deleteRounding([id]);
    setCurrentPage(1);
  };

  useEffect(() => {
    fetchAllRoundings({
      limit: TABLE_PAGE_LIMIT,
      skip: (currentPage - 1) * TABLE_PAGE_LIMIT,
      key: keyWord,
      start_date: "",
      end_date: "",
    });
  }, [fetchAllRoundings, currentPage]);

  useEffect(() => {
    if (rounding) {
      setRoundings(rounding);
    }
  }, [rounding]);

  return (
    <>
      <Header />
      {/* Page content */}
      <Container className="mt--7" fluid>
        {/* Table */}
        <Row>
          <div className="col">
            <Card className="shadow">
              <CardHeader className="border-0 d-flex justify-content-between align-items-center">
                <h3 className="mb-0">{t("roundingPage.rounding")}</h3>
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
                <div className="d-flex">
                  <Button
                    className="btn-icon btn-3"
                    color="danger"
                    type="button"
                    onClick={onDeleteArray}
                  >
                    <span className="btn-inner--icon">
                      <i className="ni ni-fat-delete" />
                    </span>
                    <span className="btn-inner--text">
                      {t("common.delete")}
                    </span>
                  </Button>
                </div>
              </CardHeader>
              <CardBody>
                <Row className="icon-examples">
                  <Table className="align-items-center table-flush" responsive>
                    <thead className="thead-light">
                      <tr>
                        <th scope="col"></th>
                        <th scope="col">No</th>
                        <th scope="col">{t("common.title")}</th>
                        <th scope="col">{t("common.user")}</th>
                        <th scope="col">{t("common.date")}</th>
                        <th scope="col">{t("common.address")}</th>
                        <th scope="col">{t("common.cost")}</th>
                        <th scope="col" />
                      </tr>
                    </thead>
                    <tbody>
                      {roundings.map((item, idx) => (
                        <tr key={`members-tbl-r-${idx}`}>
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
                          <td>{item.title}</td>
                          <td>{item.user.fullname}</td>
                          <td>{item.opening_date}</td>
                          <td>{item.address}</td>
                          <td>{item.cost}</td>
                          <td className="text-left">
                            <UncontrolledDropdown>
                              <DropdownToggle
                                className="btn-icon-only text-light"
                                role="button"
                                size="sm"
                                color=""
                                onClick={(e) => e.preventDefault()}
                              >
                                <i className="fas fa-ellipsis-v" />
                              </DropdownToggle>
                              <DropdownMenu
                                className="dropdown-menu-arrow"
                                right
                              >
                                {/* <DropdownItem
                                  onClick={(e) => e.preventDefault()}
                                >
                                  {t("common.edit")}
                                </DropdownItem> */}
                                <DropdownItem
                                  onClick={(e) => {
                                    e.preventDefault();
                                    onDelete(item._id);
                                  }}
                                >
                                  {t("common.delete")}
                                </DropdownItem>
                                <DropdownItem
                                  onClick={(e) => {
                                    e.preventDefault();
                                    navigate(
                                      `/admin/round_management/detail/${item._id}`
                                    );
                                  }}
                                >
                                  {t("common.view")}
                                </DropdownItem>
                              </DropdownMenu>
                            </UncontrolledDropdown>
                          </td>
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
                      disabled={currentPage > count / TABLE_PAGE_LIMIT}
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
      </Container>
    </>
  );
};

export default RoundingManagement;
