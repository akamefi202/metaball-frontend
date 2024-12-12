/* eslint-disable react-hooks/exhaustive-deps */
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
import { useMemberService } from "features/member/hooks";
import { TABLE_PAGE_LIMIT } from "config";
// core components
import Header from "components/Headers/Header.js";
import useAlert from "features/alert/hook/useAlert";

const MemberManagement = () => {
  const navigate = useNavigate();
  const { fetchAllMembers, deleteMember } = useMemberService();
  const { member, count } = useSelector((state) => state.member);
  const { t } = useTranslation();
  const { showErrorAlert } = useAlert();
  const [members, setMembers] = useState([]);

  // Pagination & Search
  const [currentPage, setCurrentPage] = useState(1);
  const [keyWord, setKeyword] = useState("");
  const onSearch = () => {
    setCurrentPage(1);
    fetchAllMembers({
      limit: TABLE_PAGE_LIMIT,
      skip: (currentPage - 1) * TABLE_PAGE_LIMIT,
      key: keyWord,
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
    if (selectedIds.length === 0) {
      showErrorAlert(t("alert.titleError"), t("alert.msgErrorNotSelected"));
      return;
    }
    deleteMember(selectedIds);
    setCurrentPage(1);
  };
  const onDelete = (id) => {
    deleteMember([id]);
    setCurrentPage(1);
  };

  useEffect(() => {
    fetchAllMembers({
      limit: TABLE_PAGE_LIMIT,
      skip: (currentPage - 1) * TABLE_PAGE_LIMIT,
      key: keyWord,
    });
  }, [fetchAllMembers, currentPage]);

  useEffect(() => {
    if (member) {
      setMembers(member);
    }
  }, [member]);

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
                <h3 className="mb-0">{t("memberPage.user")}</h3>
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
                    color="primary"
                    type="button"
                    onClick={() => {
                      navigate("/admin/user_management/add");
                    }}
                  >
                    <span className="btn-inner--icon">
                      <i className="ni ni-fat-add" />
                    </span>
                    <span className="btn-inner--text">{t("common.add")}</span>
                  </Button>
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
                        <th scope="col">{t("common.fullname")}</th>
                        <th scope="col">{t("common.email")}</th>
                        <th scope="col">{t("memberPage.age")}</th>
                        <th scope="col">{t("memberPage.gender")}</th>
                        <th scope="col">{t("memberPage.experience")}</th>
                        <th scope="col">{t("memberPage.averageScore")}</th>
                        <th scope="col">{t("memberPage.monthAverageScore")}</th>
                        <th scope="col">{t("memberPage.location")}</th>
                        <th scope="col">{t("memberPage.theme")}</th>
                        <th scope="col" />
                      </tr>
                    </thead>
                    <tbody>
                      {members.map((item, idx) => (
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
                          <td>{item.fullname}</td>
                          <td>{item.email}</td>
                          <td>
                            {item.birthday
                              ? new Date().getFullYear() -
                                new Date(item.birthday).getFullYear()
                              : ""}
                          </td>
                          <td>{item.sex ? t("memberPage." + item.sex) : ""}</td>
                          <td>{item.experience}</td>
                          <td>
                            {item.average_score ? item.average_score : ""}
                          </td>
                          <td>
                            {item.month_average_score
                              ? item.month_average_score
                              : ""}
                          </td>
                          <td>{item.location ? item.location.name : ""}</td>
                          <td>{item.theme ? item.theme.join(",") : ""}</td>
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
                                <DropdownItem
                                  onClick={(e) => {
                                    e.preventDefault();
                                    navigate(
                                      `/admin/user_management/update/${item._id}`
                                    );
                                  }}
                                >
                                  {t("common.edit")}
                                </DropdownItem>
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
                                      `/admin/user_management/detail/${item._id}`
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

export default MemberManagement;
