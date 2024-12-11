/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
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
  Label,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  DropdownToggle,
} from "reactstrap";

// core components
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { useAdminService } from "features/admin/hooks/useAdminService";

import { TABLE_PAGE_LIMIT } from "config";
import Header from "components/Headers/Header.js";
import useAlert from "features/alert/hook/useAlert";

const AdminManagement = () => {
  const navigate = useNavigate();
  const { fetchAllAdmins, deleteAdmin } = useAdminService();
  const { loading, admin, count } = useSelector((state) => state.admin);
  // Language translation
  const { t } = useTranslation();
  // Pagination & Search
  const [currentPage, setCurrentPage] = useState(1);
  const [keyWord, setKeyword] = useState("");
  const { showErrorAlert } = useAlert();

  const onSearch = () => {
    setCurrentPage(1);
    fetchAllAdmins({
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
    deleteAdmin(selectedIds);
  };
  const onDelete = (id) => {
    deleteAdmin([id]);
  };

  const thData = [
    t("common.select"),
    "No",
    "ID",
    t("common.email"),
    t("common.action"),
  ];
  const [tblData, setTblData] = useState({ thData, tbData: [[]] });

  useEffect(() => {
    fetchAllAdmins({
      limit: TABLE_PAGE_LIMIT,
      skip: (currentPage - 1) * TABLE_PAGE_LIMIT,
      key: keyWord,
    });
  }, [fetchAllAdmins, currentPage]);

  useEffect(() => {
    const tbData = [];
    admin.map((item, index) => {
      tbData.push([
        (currentPage - 1) * TABLE_PAGE_LIMIT + index + 1,
        item._id,
        item.email,
      ]);
    });
    setTblData({ thData, tbData });
  }, [admin]);

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
                    <h3 className="mb-0 mr-2">{t("adminPage.admin")}</h3>
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
                          navigate("/admin/admin_management/add");
                        }}
                      >
                        <span className="btn-inner--icon">
                          <i className="ni ni-fat-add" />
                        </span>
                        <span className="btn-inner--text">
                          {t("common.add")}
                        </span>
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
                </>

                <Table className="align-items-center table-flush" responsive>
                  <thead className="thead-light">
                    <tr>
                      {tblData.thData.map((thItem, idx) => (
                        <th scope="col" key={"thitem" + idx}>
                          {thItem}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {tblData.tbData.map((tbItem, idx) => (
                      <tr key={"tbItem" + idx}>
                        <td>
                          <FormGroup check>
                            <Input
                              type="checkbox"
                              value={idCheckField[tbItem[0]]}
                              onChange={(e) => {
                                onChangeSelect(tbItem[1], e.target.checked);
                              }}
                            />
                            <Label check></Label>
                          </FormGroup>
                        </td>
                        {tbItem.map((tdItem, idx1) => (
                          <td className={"tdItem" + idx1}>{tdItem}</td>
                        ))}
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
                            <DropdownMenu className="dropdown-menu-arrow" right>
                              <DropdownItem
                                onClick={() => {
                                  navigate(
                                    `/admin/admin_management/update/${tbItem[1]}`
                                  );
                                }}
                              >
                                {t("common.edit")}
                              </DropdownItem>
                              <DropdownItem
                                onClick={() => {
                                  onDelete(tbItem[1]);
                                }}
                              >
                                {t("common.delete")}
                              </DropdownItem>
                              <DropdownItem
                                onClick={(e) => {
                                  e.preventDefault();
                                  navigate(
                                    `/admin/admin_management/detail/${tbItem[1]}`
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

export default AdminManagement;
