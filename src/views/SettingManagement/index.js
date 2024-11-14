import { useEffect, useState } from "react";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import {
  Row,
  Col,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Table,
  Pagination,
  PaginationItem,
  PaginationLink,
  Button,
  FormGroup,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Input,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Label,
  Container,
} from "reactstrap";
import { useTranslation } from "react-i18next";
import ImageUploader from "react-images-upload";
import Header from "components/Headers/Header";
import { useSettingService } from "features/setting/hooks/useSettingService";
import { TABLE_PAGE_LIMIT } from "config";
import { useSelector } from "react-redux";
import { API_BASE_URL } from "config";
// mode = 0// for view, 1 for add, 2 for update
const SettingModal = ({
  isOpen,
  toggle,
  settingItem = {},
  mode = 0,
  title = "Location",
  type = "location",
}) => {
  const [pictures, setPictures] = useState([]);
  const [picturesUri, setPicturesURI] = useState([]);
  const [name, setName] = useState(
    type === "location" ? settingItem.name : settingItem.title
  );
  const { createSetting, updateSetting } = useSettingService();

  const {
    t,
    i18n: { changeLanguage, language },
  } = useTranslation();

  const onDrop = (pictureFiles, pictureDataURLs) => {
    setPictures(pictureFiles);
    setPicturesURI(pictureDataURLs);
  };

  const onAddSetting = () => {
    if (type === "location") {
      createSetting({
        name,
        files: pictures[0],
        type,
      });
    } else {
      createSetting({
        title: name,
        type,
      });
    }
  };

  const onUpdateSetting = () => {
    if (type === "location") {
      updateSetting({
        _id: settingItem._id,
        name,
        files: pictures[0],
        type,
      });
    } else {
      updateSetting({
        _id: settingItem._id,
        title: name,
        type,
      });
    }
  };

  useEffect(() => {
    if (mode === 1) {
      setName("");
    } else {
      setName(type === "location" ? settingItem.name : settingItem.title);
    }
    setPictures([]);
    setPicturesURI([]);
  }, [isOpen]);

  return (
    <Modal isOpen={isOpen} toggle={toggle}>
      <ModalHeader toggle={toggle}>
        <h3>{title}</h3>
      </ModalHeader>
      <ModalBody
        style={{ borderTop: "1px solid #eee", borderBottom: "1px solid #eee" }}
      >
        <Row className="py-2 mt-2 align-items-center">
          <Col md="3">{t("common.name")}:</Col>
          <Col md="">
            <FormGroup className="mb-0">
              <InputGroup>
                <Input
                  placeholder={t("common.name")}
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
        {mode === 0 && type === "location" && (
          <Row className="justify-content-center mt-2">
            <div
              style={{
                width: 250,
                height: 250,
                display: "flex",
              }}
            >
              <img
                src={`${API_BASE_URL}/${settingItem?.file}`}
                style={{ width: "100%", objectFit: "cover" }}
              />
            </div>
          </Row>
        )}
        {mode === 2 && type === "location" && (
          <Row className="justify-content-center mt-2">
            <div
              style={{
                width: 250,
                height: 250,
                display: "flex",
              }}
            >
              <img
                src={`${
                  picturesUri.length === 0
                    ? API_BASE_URL + "/" + settingItem?.file
                    : picturesUri[0]
                }`}
                style={{ width: "100%", objectFit: "cover" }}
              />
            </div>
          </Row>
        )}

        {mode === 1 && type === "location" && pictures.length > 0 && (
          <Row className="justify-content-center my-2">
            <div style={{ display: "flex", width: 250, height: 250 }}>
              <img
                src={picturesUri[0]}
                style={{ width: "100%", objectFit: "cover" }}
              />
            </div>
          </Row>
        )}
        {mode !== 0 && type === "location" && (
          <ImageUploader
            withIcon={true}
            buttonText="Choose images"
            onChange={onDrop}
            imgExtension={[".jpg", ".gif", ".png", ".gif"]}
            maxFileSize={5242880}
            singleImage
          />
        )}
      </ModalBody>
      <ModalFooter>
        {mode === 1 && (
          <Button
            color="primary"
            onClick={() => {
              onAddSetting();
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
              onUpdateSetting();
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

const SettingManagement = () => {
  const [tabKey, setTabKey] = useState("location");
  const [selected, setSelected] = useState({});
  const { setting: settings } = useSelector((state) => state.setting);
  const [count, setCount] = useState(0);
  const [settingData, setSettingData] = useState([]);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [settingItem, setSettingItem] = useState({});
  const [modalMode, setModalMode] = useState(0);
  const [modalTitle, setModalTitle] = useState("");

  const {
    t,
    i18n: { changeLanguage, language },
  } = useTranslation();

  const {
    get: getSetting,
    createSetting,
    updateSetting,
    fetchAllSettings,
    deleteSetting,
  } = useSettingService();

  const onChangeTab = (k) => {
    setTabKey(k);
    setCurrentPage(1);
  };

  const onAddSetting = (title) => {
    onOpenSettingModal({ mode: 1, item: {}, title });
  };

  const onOpenSettingModal = ({ mode = 0, item = {}, title = "" }) => {
    setSettingItem(item);
    setModalMode(mode);
    setModalTitle(title);
    setIsOpenModal(true);
  };

  // Pagination & Search
  const [currentPage, setCurrentPage] = useState(1);
  const [keyWord, setKeyword] = useState("");
  const onSearch = () => {
    setCurrentPage(1);
    fetchAllSettings({
      limit: TABLE_PAGE_LIMIT,
      skip: (currentPage - 1) * TABLE_PAGE_LIMIT,
      key: keyWord,
      type: tabKey,
    });
  };

  // For Delete
  const [idCheckField, setIdCheckField] = useState({});
  const cleanIdCheckField = () => {
    setIdCheckField((prevState) => {
      for (let [key, value] of Object.entries(prevState)) {
        prevState[key] = false;
      }
      return { ...prevState };
    });
  };
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
    deleteSetting({ ids: selectedIds, type: tabKey });
    setCurrentPage(1);
  };

  const onDeleteOne = (id) => {
    deleteSetting({ ids: [id], type: tabKey });
  };

  useEffect(() => {
    if (settings) {
      setSettingData(settings);
      setCount(settings.count);
    }
    cleanIdCheckField();
  }, [settings]);

  useEffect(() => {
    fetchAllSettings({
      limit: TABLE_PAGE_LIMIT,
      skip: (currentPage - 1) * TABLE_PAGE_LIMIT,
      key: keyWord,
      type: tabKey,
    });
  }, [fetchAllSettings, tabKey, currentPage]);

  return (
    <>
      <Header />
      <Tabs
        id="controlled-tab-example"
        activeKey={tabKey}
        onSelect={(k) => onChangeTab(k)}
        className="mb-3"
      >
        <Tab eventKey="location" title={t("common.location")}>
          <Row>
            <div className="col">
              <Card className="shadow">
                <CardHeader className="border-0 d-flex justify-content-between align-items-center">
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
                      onClick={() => onAddSetting(t("common.location"))}
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
                        <th scope="col">ID</th>
                        <th scope="col">{t("common.name")}</th>
                        <th scope="col">{t("settingPage.image")}</th>
                        <th scope="col" />
                      </tr>
                    </thead>
                    <tbody>
                      {settingData?.data?.map((item, idx) => (
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
                          <td>{item._id}</td>
                          <td>{item.name}</td>
                          <td>
                            <div
                              style={{
                                width: "50px",
                                height: "50px",
                                display: "flex",
                              }}
                            >
                              <img
                                src={`${API_BASE_URL}/${item.file}`}
                                style={{ width: "100%", objectFit: "cover" }}
                              />
                            </div>
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
                              onClick={() =>
                                onOpenSettingModal({
                                  mode: 0,
                                  item,
                                  title: t("common.location"),
                                })
                              }
                            >
                              <span className="btn-inner--icon">
                                <i className="ni ni-glasses-2"></i>
                              </span>
                            </button>
                            <button
                              className="btn btn-icon btn-secondary btn-sm"
                              onClick={() =>
                                onOpenSettingModal({
                                  mode: 2,
                                  item,
                                  title: t("common.location"),
                                })
                              }
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
        </Tab>
        <Tab eventKey="hit" title={t("settingPage.averageScore")}>
          <Row>
            <div className="col">
              <Card className="shadow">
                <CardHeader className="border-0 d-flex justify-content-between align-items-center">
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
                      onClick={() =>
                        onAddSetting(t("settingPage.averageScore"))
                      }
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
                      onClick={() => onDeleteArray("hit")}
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
                        <th scope="col">ID</th>
                        <th scope="col">{t("common.title")}</th>
                        <th scope="col" />
                      </tr>
                    </thead>
                    <tbody>
                      {settingData?.data?.map((item, idx) => (
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
                          <td>{item._id}</td>
                          <td>{item.title}</td>
                          <td
                            style={{
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "flex-end",
                            }}
                          >
                            <button
                              className="btn btn-icon btn-outline-primary btn-sm"
                              onClick={() =>
                                onOpenSettingModal({
                                  mode: 0,
                                  item,
                                  title: t("settingPage.averageScore"),
                                })
                              }
                            >
                              <span className="btn-inner--icon">
                                <i className="ni ni-glasses-2"></i>
                              </span>
                            </button>
                            <button
                              className="btn btn-icon btn-secondary btn-sm"
                              onClick={() =>
                                onOpenSettingModal({
                                  mode: 2,
                                  item,
                                  title: t("settingPage.averageScore"),
                                })
                              }
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
        </Tab>
        <Tab eventKey="experience" title={t("settingPage.experience")}>
          <Row>
            <div className="col">
              <Card className="shadow">
                <CardHeader className="border-0 d-flex justify-content-between align-items-center">
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
                      onClick={() => onAddSetting(t("settingPage.experience"))}
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
                      onClick={() => onDeleteArray("experience")}
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
                        <th scope="col">ID</th>
                        <th scope="col">{t("common.title")}</th>
                        <th scope="col" />
                      </tr>
                    </thead>
                    <tbody>
                      {settingData?.data?.map((item, idx) => (
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
                          <td>{item._id}</td>
                          <td>{item.title}</td>
                          <td
                            style={{
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "flex-end",
                            }}
                          >
                            <button
                              className="btn btn-icon btn-outline-primary btn-sm"
                              onClick={() =>
                                onOpenSettingModal({
                                  mode: 0,
                                  item,
                                  title: t("settingPage.experience"),
                                })
                              }
                            >
                              <span className="btn-inner--icon">
                                <i className="ni ni-glasses-2"></i>
                              </span>
                            </button>
                            <button
                              className="btn btn-icon btn-secondary btn-sm"
                              onClick={() =>
                                onOpenSettingModal({
                                  mode: 2,
                                  item,
                                  title: t("settingPage.experience"),
                                })
                              }
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
        </Tab>
        <Tab eventKey="theme" title={t("settingPage.theme")}>
          <Row>
            <div className="col">
              <Card className="shadow">
                <CardHeader className="border-0 d-flex justify-content-between align-items-center">
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
                      onClick={() => onAddSetting(t("settingPage.theme"))}
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
                      onClick={() => onDeleteArray("theme")}
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
                        <th scope="col">ID</th>
                        <th scope="col">{t("common.title")}</th>
                        <th scope="col" />
                      </tr>
                    </thead>
                    <tbody>
                      {settingData?.data?.map((item, idx) => (
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
                          <td>{item._id}</td>
                          <td>{item.title}</td>
                          <td
                            style={{
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "flex-end",
                            }}
                          >
                            <button
                              className="btn btn-icon btn-outline-primary btn-sm"
                              onClick={() =>
                                onOpenSettingModal({
                                  mode: 0,
                                  item,
                                  title: t("settingPage.theme"),
                                })
                              }
                            >
                              <span className="btn-inner--icon">
                                <i className="ni ni-glasses-2"></i>
                              </span>
                            </button>
                            <button
                              className="btn btn-icon btn-secondary btn-sm"
                              onClick={() =>
                                onOpenSettingModal({
                                  mode: 2,
                                  item,
                                  title: t("settingPage.theme"),
                                })
                              }
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
        </Tab>
        <Tab eventKey="blog" title={t("settingPage.blogTheme")}>
          <Row>
            <div className="col">
              <Card className="shadow">
                <CardHeader className="border-0 d-flex justify-content-between align-items-center">
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
                      onClick={() => onAddSetting(t("settingPage.blogTheme"))}
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
                      onClick={() => onDeleteArray("blog")}
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
                        <th scope="col">ID</th>
                        <th scope="col">{t("common.title")}</th>
                        <th scope="col" />
                      </tr>
                    </thead>
                    <tbody>
                      {settingData?.data?.map((item, idx) => (
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
                          <td>{item._id}</td>
                          <td>{item.title}</td>
                          <td
                            style={{
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "flex-end",
                            }}
                          >
                            <button
                              className="btn btn-icon btn-outline-primary btn-sm"
                              onClick={() =>
                                onOpenSettingModal({
                                  mode: 0,
                                  item,
                                  title: t("settingPage.blogTheme"),
                                })
                              }
                            >
                              <span className="btn-inner--icon">
                                <i className="ni ni-glasses-2"></i>
                              </span>
                            </button>
                            <button
                              className="btn btn-icon btn-secondary btn-sm"
                              onClick={() =>
                                onOpenSettingModal({
                                  mode: 2,
                                  item,
                                  title: t("settingPage.blogTheme"),
                                })
                              }
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
        </Tab>
      </Tabs>
      <SettingModal
        isOpen={isOpenModal}
        toggle={() => setIsOpenModal(!isOpenModal)}
        settingItem={settingItem}
        mode={modalMode}
        title={modalTitle}
        type={tabKey}
      />
    </>
  );
};

export default SettingManagement;
