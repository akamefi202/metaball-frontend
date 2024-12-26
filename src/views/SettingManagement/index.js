/* eslint-disable react-hooks/exhaustive-deps */
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
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";
import { useTranslation } from "react-i18next";
import ImageUploader from "react-images-upload";
import Header from "components/Headers/Header";
import { useSettingService } from "features/setting/hooks/useSettingService";
import { TABLE_PAGE_LIMIT } from "config";
import { useSelector } from "react-redux";
import { API_BASE_URL } from "config";
import useAlert from "features/alert/hook/useAlert";
import { SettingType } from "config";
import { LoadingComponent } from "components/Loading";
// mode = 0// for view, 1 for add, 2 for update
const isShowImg = (type) => {
  if (type === SettingType.LOCATION || type === SettingType.THEME) {
    return true;
  }
  return false;
};

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

  const { t } = useTranslation();

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
        files: pictures[0],
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
        files: pictures[0],
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
        {mode === 0 && isShowImg(type) && (
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
                alt=""
              />
            </div>
          </Row>
        )}
        {mode === 2 && isShowImg(type) && (
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
                alt=""
              />
            </div>
          </Row>
        )}

        {mode === 1 && isShowImg(type) && pictures.length > 0 && (
          <Row className="justify-content-center my-2">
            <div style={{ display: "flex", width: 250, height: 250 }}>
              <img
                src={picturesUri[0]}
                style={{ width: "100%", objectFit: "cover" }}
                alt=""
              />
            </div>
          </Row>
        )}
        {mode !== 0 && isShowImg(type) && (
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
  const { setting: settings, loading } = useSelector((state) => state.setting);
  const [count, setCount] = useState(0);
  const [settingData, setSettingData] = useState([]);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [settingItem, setSettingItem] = useState({});
  const [modalMode, setModalMode] = useState(0);
  const [modalTitle, setModalTitle] = useState("");

  const { t } = useTranslation();
  const { showErrorAlert } = useAlert();

  const { fetchAllSettings, deleteSetting, updateStatus } = useSettingService();

  const onChangeTab = (k) => {
    setKeyword("");
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
      for (let [key] of Object.entries(prevState)) {
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
    if (selectedIds.length === 0) {
      showErrorAlert(t("alert.titleError"), t("alert.msgErrorNotSelected"));
      return;
    }
    deleteSetting({ ids: selectedIds, type: tabKey });
    setCurrentPage(1);
  };

  const onDeleteOne = (id) => {
    deleteSetting({ ids: [id], type: tabKey });
  };

  const onUpdateStatus = (item) => {
    if (settingData && settingData.data) {
      let numOfSelected = 0;
      for (let i = 0; i < settingData?.data?.length; i++) {
        if (settingData.data[i].active) {
          numOfSelected += 1;
        }
      }
      if (numOfSelected >= 2 && !item.active) {
        showErrorAlert(
          t("alert.titleError"),
          t("alert.msgCantSelectMoreThan2")
        );
      } else {
        updateStatus({ _id: item._id, type: item.type, active: !item.active });
      }
    }
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
                                alt=""
                              />
                            </div>
                          </td>
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
                                  onClick={() =>
                                    onOpenSettingModal({
                                      mode: 2,
                                      item,
                                      title: t("common.location"),
                                    })
                                  }
                                >
                                  {t("common.edit")}
                                </DropdownItem>
                                <DropdownItem
                                  onClick={() => onDeleteOne(item._id)}
                                >
                                  {t("common.delete")}
                                </DropdownItem>
                                <DropdownItem
                                  onClick={() =>
                                    onOpenSettingModal({
                                      mode: 0,
                                      item,
                                      title: t("common.location"),
                                    })
                                  }
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
                </CardBody>
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
                                  onClick={() =>
                                    onOpenSettingModal({
                                      mode: 2,
                                      item,
                                      title: t("common.location"),
                                    })
                                  }
                                >
                                  {t("common.edit")}
                                </DropdownItem>
                                <DropdownItem
                                  onClick={() => onDeleteOne(item._id)}
                                >
                                  {t("common.delete")}
                                </DropdownItem>
                                <DropdownItem
                                  onClick={() =>
                                    onOpenSettingModal({
                                      mode: 0,
                                      item,
                                      title: t("common.location"),
                                    })
                                  }
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
                </CardBody>
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
                        {/* <th scope="col">{t("settingPage.image")}</th> */}
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
                          {/* <td>
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
                                alt=""
                              />
                            </div>
                          </td> */}
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
                                  onClick={() =>
                                    onOpenSettingModal({
                                      mode: 2,
                                      item,
                                      title: t("common.location"),
                                    })
                                  }
                                >
                                  {t("common.edit")}
                                </DropdownItem>
                                <DropdownItem
                                  onClick={() => onDeleteOne(item._id)}
                                >
                                  {t("common.delete")}
                                </DropdownItem>
                                <DropdownItem
                                  onClick={() =>
                                    onOpenSettingModal({
                                      mode: 0,
                                      item,
                                      title: t("common.location"),
                                    })
                                  }
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
                </CardBody>
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
                        <th scope="col">{t("settingPage.image")}</th>
                        <th scope="col">{t("common.status")}</th>
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
                                alt=""
                              />
                            </div>
                          </td>
                          <td>
                            <input
                              type="checkbox"
                              checked={item.active}
                              onClick={() => {
                                onUpdateStatus(item);
                              }}
                            />
                          </td>
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
                                  onClick={() =>
                                    onOpenSettingModal({
                                      mode: 2,
                                      item,
                                      title: t("common.location"),
                                    })
                                  }
                                >
                                  {t("common.edit")}
                                </DropdownItem>
                                <DropdownItem
                                  onClick={() => onDeleteOne(item._id)}
                                >
                                  {t("common.delete")}
                                </DropdownItem>
                                <DropdownItem
                                  onClick={() =>
                                    onOpenSettingModal({
                                      mode: 0,
                                      item,
                                      title: t("common.location"),
                                    })
                                  }
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
                </CardBody>
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
                        {/* <th scope="col">{t("settingPage.image")}</th> */}
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
                          {/* <td>
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
                                alt=""
                              />
                            </div>
                          </td> */}
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
                                  onClick={() =>
                                    onOpenSettingModal({
                                      mode: 2,
                                      item,
                                      title: t("common.location"),
                                    })
                                  }
                                >
                                  {t("common.edit")}
                                </DropdownItem>
                                <DropdownItem
                                  onClick={() => onDeleteOne(item._id)}
                                >
                                  {t("common.delete")}
                                </DropdownItem>
                                <DropdownItem
                                  onClick={() =>
                                    onOpenSettingModal({
                                      mode: 0,
                                      item,
                                      title: t("common.location"),
                                    })
                                  }
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
                </CardBody>
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
