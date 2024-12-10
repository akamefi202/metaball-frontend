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
  CardBody,
  Form,
} from "reactstrap";

// core components
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";

import { TABLE_PAGE_LIMIT } from "config";
import Header from "components/Headers/Header.js";
import { ContentType } from "config";
import { API_BASE_URL } from "config";
import { useContentService } from "features/content/hooks/useContentService";
import { ContentDetailModal } from "./DetailView";
import useAlert from "features/alert/hook/useAlert";

const ContentManagement = () => {
  const navigate = useNavigate();
  const [tabKey, setTabKey] = useState(ContentType.NEWS);
  const [selected, setSelected] = useState({});
  const [contentData, setContentData] = useState({});
  const { fetchAllContents, deleteContent, updateStatus } = useContentService();
  const [isOpenModal, setIsOpenModal] = useState(false);
  const { loading, content } = useSelector((state) => state.content);
  const { showErrorAlert } = useAlert();
  const onChangeTab = (k) => {
    setTabKey(k);
    setCurrentPage(1);
  };
  // Language translation
  const { t } = useTranslation();
  // Pagination & Search
  const [currentPage, setCurrentPage] = useState(1);
  const [keyWord, setKeyword] = useState("");
  const onSearch = () => {
    setCurrentPage(1);
    fetchAllContents({
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
    deleteContent({ type: tabKey, ids: selectedIds });
    setCurrentPage(1);
  };
  const onDeleteOne = (id) => {
    deleteContent({ type: tabKey, ids: [id] });
    setCurrentPage(1);
  };

  const onAddContent = () => {
    navigate(`/admin/content_management/add/${tabKey}`);
  };

  const onUpdateContent = (id) => {
    navigate(`/admin/content_management/update/${tabKey}/${id}`);
  };

  const onUpdateStatus = (item) => {
    updateStatus({ _id: item._id, active: !item.active, type: item.type });
  };
  // Preview
  const onOpenContentModal = (item) => {
    setSelected(item);
    setIsOpenModal(true);
  };

  useEffect(() => {
    fetchAllContents({
      limit: TABLE_PAGE_LIMIT,
      skip: (currentPage - 1) * TABLE_PAGE_LIMIT,
      key: keyWord,
      type: tabKey,
    });
  }, [fetchAllContents, tabKey, currentPage]);

  useEffect(() => {
    setContentData(content);
  }, [content]);

  if (loading) {
    return <></>;
  }

  return (
    <>
      <Header />
      {/* Page content */}
      <Container className="mt--7" fluid>
        <Row>
          <div className="col">
            <Card className="shadow">
              <CardHeader className="border-0 d-flex justify-content-between align-items-center">
                <FormGroup className="mb-0">
                  <InputGroup className="align-items-center">
                    <Label for="content_type_select" className="mb-0 mr-4">
                      {t("common.type")}
                    </Label>
                    <Input
                      id="content_type_select"
                      name="select"
                      type="select"
                      style={{
                        border: "1px solid #eee",
                        borderRadius: "5px",
                        paddingLeft: "5px",
                      }}
                      onChange={(e) => onChangeTab(e.target.value)}
                    >
                      <option value={ContentType.NEWS}>
                        {t("contentPage.news")}
                      </option>
                      <option value={ContentType.EVENT}>
                        {t("contentPage.event")}
                      </option>
                      <option value={ContentType.ADVERTISING}>
                        {t("contentPage.advertising")}
                      </option>
                      <option value={ContentType.NOTIFICATION}>
                        {t("contentPage.notification")}
                      </option>
                      <option value={ContentType.NOTE}>
                        {t("contentPage.note")}
                      </option>
                    </Input>
                  </InputGroup>
                </FormGroup>
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
                    onClick={() => onAddContent()}
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
                    onClick={() => onDeleteArray("location")}
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
              <hr className="my-2"></hr>
              <CardBody>
                <Table className="align-items-center table-flush" responsive>
                  <thead className="thead-light">
                    <tr>
                      <th scope="col"></th>
                      <th scope="col">No</th>
                      <th scope="col">{t("settingPage.image")}</th>
                      <th scope="col">{t("common.title")}</th>
                      <th scope="col">{t("common.status")}</th>
                      <th scope="col" />
                    </tr>
                  </thead>
                  <tbody>
                    {contentData?.data?.map((item, idx) => (
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
                        <td>
                          <div
                            style={{
                              width: "50px",
                              height: "50px",
                              display: "flex",
                            }}
                          >
                            <img
                              alt="#"
                              src={`${API_BASE_URL}/${item.file}`}
                              style={{ width: "100%", objectFit: "cover" }}
                            />
                          </div>
                        </td>
                        <td>{item.title}</td>
                        <td>
                          <Form>
                            <div class="form-check form-switch">
                              <input
                                type="checkbox"
                                class="form-check-input"
                                checked={item.active}
                                onClick={() => {
                                  onUpdateStatus(item);
                                }}
                              />
                              <label class="form-check-label"></label>
                            </div>
                          </Form>
                        </td>
                        <td
                          style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "flex-end",
                          }}
                        >
                          <button
                            className="btn btn-icon btn-outline-primary btn-sm"
                            onClick={() => onOpenContentModal(item)}
                          >
                            <span className="btn-inner--icon">
                              <i className="ni ni-glasses-2"></i>
                            </span>
                          </button>
                          <button
                            className="btn btn-icon btn-secondary btn-sm"
                            onClick={() => onUpdateContent(item._id)}
                          >
                            <span className="btn-inner--icon">
                              <i className="ni ni-tag"></i>
                            </span>
                          </button>
                          <button
                            className="btn btn-icon btn-outline-danger btn-sm"
                            onClick={() => onDeleteOne(item._id)}
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
                      disabled={currentPage > content.count / TABLE_PAGE_LIMIT}
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
      <ContentDetailModal
        isOpen={isOpenModal}
        toggle={() => {
          setIsOpenModal(!isOpenModal);
        }}
        contentItem={{
          title: selected.title,
          html: selected.html ? selected.html : "",
          files: `${API_BASE_URL}/${selected.file}`,
          subType: selected.subType,
        }}
        title={t("contentPage." + tabKey)}
      />
    </>
  );
};

export default ContentManagement;
