/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import {
  Row,
  Col,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Pagination,
  PaginationItem,
  PaginationLink,
  DropdownToggle,
  DropdownItem,
  DropdownMenu,
  Table,
  FormGroup,
  Input,
  Label,
  UncontrolledDropdown,
} from "reactstrap";
import { useTranslation } from "react-i18next";
import parser from "html-react-parser";
// import { TABLE_PAGE_LIMIT } from "config";
import { useNavigate } from "react-router-dom";
import useRoundingService from "features/rounding/hooks/useRoundingService";
import { useSelector } from "react-redux";
import useAlert from "features/alert/hook/useAlert";
import { getFormatString } from "libs/utils";

export const ContentDetailModal = ({
  isOpen,
  toggle,
  contentItem = {},
  title,
}) => {
  // Language translation
  const { t } = useTranslation();

  return (
    <Modal
      className="editor-preview"
      id="editor-preview"
      isOpen={isOpen}
      toggle={toggle}
    >
      <ModalHeader toggle={toggle}>
        <h3>{title}</h3>
      </ModalHeader>
      <ModalBody
        style={{ borderTop: "1px solid #eee", borderBottom: "1px solid #eee" }}
      >
        <Row className="py-2 mt-2 align-items-center">
          <Col>
            <Row>
              <p
                style={{
                  textAlign: "left",
                  border: "1px solid #999",
                  padding: "0px 10px",
                  borderRadius: 5,
                }}
              >
                {contentItem.sub_type}
              </p>
            </Row>
            <Row>
              <h3
                style={{ textAlign: "center", width: "100%", marginBottom: 30 }}
              >
                {contentItem.title}
              </h3>
            </Row>
            <Row className="justify-content-center">
              {contentItem.files && (
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    width: "80%",
                  }}
                >
                  <img
                    src={contentItem.files}
                    alt="#"
                    style={{ width: "100%" }}
                  />
                </div>
              )}
            </Row>
            <div className="editor-render" id="editor-render">
              {parser(contentItem.html)}
            </div>
          </Col>
        </Row>
      </ModalBody>
      <ModalFooter>
        <Button color="secondary" onClick={toggle}>
          {t("common.cancel")}
        </Button>
      </ModalFooter>
    </Modal>
  );
};

const TABLE_PAGE_LIMIT = 10;
export const RoundingSelectModal = ({ isOpen, toggle, onSelectRounding }) => {
  const navigate = useNavigate();
  const { fetchAllRoundings, deleteRounding } = useRoundingService();
  const { rounding, count, loading } = useSelector((state) => state.rounding);
  const { t } = useTranslation();
  const { showErrorAlert } = useAlert();
  const [roundings, setRoundings] = useState([]);
  const [idCheckField, setIdCheckField] = useState({});

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
  const onChangeSelect = (item) => {
    setIdCheckField(item);
  };
  const onResetSelect = () => {
    setIdCheckField("");
  };

  const onOK = () => {
    toggle();
    onSelectRounding(idCheckField);
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
    deleteRounding(selectedIds);
    setCurrentPage(1);
  };
  const onDelete = (id) => {
    deleteRounding([id]);
    setCurrentPage(1);
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
    <Modal
      className="editor-preview"
      id="editor-preview"
      isOpen={isOpen}
      toggle={toggle}
    >
      <ModalHeader toggle={toggle}>
        <h3>{t("roundingPage.selectRounding")}</h3>
      </ModalHeader>
      <ModalBody
        style={{ borderTop: "1px solid #eee", borderBottom: "1px solid #eee" }}
      >
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
              </tr>
            </thead>
            <tbody>
              {roundings.map((item, idx) => (
                <tr key={`members-tbl-r-${idx}`}>
                  <td>
                    <FormGroup check>
                      <input
                        type="checkbox"
                        checked={idCheckField._id === item._id}
                        onChange={(e) => {
                          onChangeSelect(item);
                        }}
                      />
                      <Label check></Label>
                    </FormGroup>
                  </td>
                  <td>{(currentPage - 1) * TABLE_PAGE_LIMIT + idx + 1}</td>
                  <td>{item.title}</td>
                  <td>{item.user.fullname}</td>
                  <td>{getFormatString(item.opening_date)}</td>
                  <td>{item.address ? item.address.address : ""}</td>
                  <td>{item.cost}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Row>
        <Row className="justify-content-end">
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
        </Row>
      </ModalBody>
      <ModalFooter>
        <Button color="primary" onClick={onOK}>
          {t("common.ok")}
        </Button>
        <Button color="default" onClick={onResetSelect}>
          {t("common.reset")}
        </Button>
        <Button color="secondary" onClick={toggle}>
          {t("common.cancel")}
        </Button>
      </ModalFooter>
    </Modal>
  );
};
