/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
// reactstrap components
import {
  Col,
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
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "reactstrap";

import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { useCourseService } from "features/course/hooks/useCourseService";
import { TABLE_PAGE_LIMIT } from "config";
// core components
import Header from "components/Headers/Header.js";
import useAlert from "features/alert/hook/useAlert";
import { LoadingComponent } from "components/Loading";

// mode = 0// for view, 1 for add, 2 for update
const CourseModal = ({ isOpen, toggle, courseItem = {}, mode = 0 }) => {
  const [name, setName] = useState(courseItem.name);
  const [address, setAddress] = useState(courseItem.address);
  const [phone, setPhone] = useState(courseItem.phone);
  const { showErrorAlert } = useAlert();
  const { createCourse, updateCourse } = useCourseService();

  const { t } = useTranslation();

  const onAddCourse = () => {
    if (!name) {
      showErrorAlert(
        t("alert.titleError"),
        t("alert.msgGolfCourseNameFieldEmpty")
      );
      return;
    }
    createCourse({
      name,
      address,
      phone,
    });
  };

  const onUpdateCourse = () => {
    if (!name) {
      showErrorAlert(
        t("alert.titleError"),
        t("alert.msgGolfCourseNameFieldEmpty")
      );
      return;
    }
    updateCourse({
      id: courseItem._id,
      name,
      address,
      phone,
    });
  };

  useEffect(() => {
    if (mode === 1) {
      setName("");
      setAddress("");
      setPhone("");
    } else {
      setName(courseItem.name);
      setAddress(courseItem.address);
      setPhone(courseItem.phone);
    }
  }, [isOpen, mode]);

  return (
    <Modal isOpen={isOpen} toggle={toggle}>
      <ModalHeader toggle={toggle}>
        <h3>
          {mode === 1
            ? t("coursePage.golfCourse") + t("common.add")
            : t("coursePage.golfCourse") + t("common.edit")}
        </h3>
      </ModalHeader>
      <ModalBody
        style={{ borderTop: "1px solid #eee", borderBottom: "1px solid #eee" }}
      >
        <Row className="py-2 mt-2 align-items-center">
          <Col md="3">{t("coursePage.name")}:</Col>
          <Col md="">
            <FormGroup className="mb-0">
              <InputGroup>
                <Input
                  placeholder={t("coursePage.name")}
                  type="text"
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                  }}
                  disabled={mode === 0}
                />
              </InputGroup>
            </FormGroup>
          </Col>
        </Row>
        <Row className="py-2 mt-2 align-items-center">
          <Col md="3">{t("coursePage.address")}:</Col>
          <Col md="">
            <FormGroup className="mb-0">
              <InputGroup>
                <Input
                  placeholder={t("coursePage.address")}
                  type="text"
                  value={address}
                  onChange={(e) => {
                    setAddress(e.target.value);
                  }}
                  disabled={mode === 0}
                />
              </InputGroup>
            </FormGroup>
          </Col>
        </Row>
        <Row className="py-2 mt-2 align-items-center">
          <Col md="3">{t("coursePage.phone")}:</Col>
          <Col md="">
            <FormGroup className="mb-0">
              <InputGroup>
                <Input
                  placeholder={t("coursePage.phone")}
                  type="text"
                  value={phone}
                  onChange={(e) => {
                    setPhone(e.target.value);
                  }}
                  disabled={mode === 0}
                />
              </InputGroup>
            </FormGroup>
          </Col>
        </Row>
      </ModalBody>
      <ModalFooter>
        {mode === 1 && (
          <Button
            color="primary"
            onClick={() => {
              onAddCourse();
              toggle();
            }}
          >
            {t("common.add")}
          </Button>
        )}
        {mode === 2 && (
          <Button
            color="primary"
            onClick={() => {
              onUpdateCourse();
              toggle();
            }}
          >
            {t("common.edit")}
          </Button>
        )}
        <Button color="secondary" onClick={toggle}>
          {t("common.cancel")}
        </Button>
      </ModalFooter>
    </Modal>
  );
};

const CourseManagement = () => {
  const { fetchAllCourses, deleteCourse } = useCourseService();
  const { course, count, loading } = useSelector((state) => state.course);
  const { t } = useTranslation();
  const { showErrorAlert } = useAlert();
  const [courses, setCourses] = useState([]);
  // Pagination & Search
  const [currentPage, setCurrentPage] = useState(1);
  const [keyWord, setKeyword] = useState("");
  // For course modal
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [courseItem, setCourseItem] = useState({});
  const [modalMode, setModalMode] = useState(0);
  const onOpenCourseModal = ({ mode = 0, item = {} }) => {
    setCourseItem(item);
    setModalMode(mode);
    setIsOpenModal(true);
  };

  // For Search
  const onSearch = () => {
    setCurrentPage(1);
    fetchAllCourses({
      limit: TABLE_PAGE_LIMIT,
      skip: (currentPage - 1) * TABLE_PAGE_LIMIT,
      key: keyWord,
    });
  };

  const onAddCourse = () => {
    onOpenCourseModal({ mode: 1, item: {} });
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
    deleteCourse(selectedIds);
    setCurrentPage(1);
  };
  const onDelete = (id) => {
    deleteCourse([id]);
    setCurrentPage(1);
  };

  useEffect(() => {
    fetchAllCourses({
      limit: TABLE_PAGE_LIMIT,
      skip: (currentPage - 1) * TABLE_PAGE_LIMIT,
      key: keyWord,
    });
  }, [fetchAllCourses, currentPage]);

  useEffect(() => {
    if (course) {
      setCourses(course);
    }
  }, [course]);

  if (loading) {
    return (
      <>
        <LoadingComponent />
      </>
    );
  }

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
                <h3 className="mb-0">{t("coursePage.golfCourse")}</h3>
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
                    onClick={() => onAddCourse()}
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
                        <th scope="col">{t("coursePage.name")}</th>
                        <th scope="col">{t("coursePage.address")}</th>
                        <th scope="col">{t("coursePage.phone")}</th>
                        <th scope="col" />
                      </tr>
                    </thead>
                    <tbody>
                      {courses.map((item, idx) => (
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
                          <td>{item.name}</td>
                          <td>{item.address}</td>
                          <td>{item.phone}</td>
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
                                    onOpenCourseModal({
                                      mode: 2,
                                      item,
                                    });
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
      <CourseModal
        isOpen={isOpenModal}
        toggle={() => setIsOpenModal(!isOpenModal)}
        courseItem={courseItem}
        mode={modalMode}
      />
    </>
  );
};

export default CourseManagement;
