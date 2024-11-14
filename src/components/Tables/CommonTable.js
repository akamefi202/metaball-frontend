import { useState } from "react";
// reactstrap components
import {
  Card,
  CardFooter,
  Pagination,
  PaginationItem,
  PaginationLink,
  Table,
  Row,
  FormGroup,
  Input,
  Label,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";
import { useTranslation } from "react-i18next";
import TableCardHeader from "./TableCardHeader";
import CommonAddEditModal from "components/Modals/CommonAddEditModal";

// core components

const CommonTables = ({ data }) => {
  const [isOpenAddModal, setIsOpenAddModal] = useState(false);
  const [isEditable, setIsEditable] = useState(false);
  const [modalData, setModalData] = useState({
    title: "",
    toggle: () => {},
    formValue: {},
    formFields: [],
  });
  const {
    t,
    i18n: { changeLanguage, language },
  } = useTranslation();
  const { thData, tbData } = data;

  // Modal data
  const toggleAddModal = () => {
    setIsOpenAddModal(!isOpenAddModal);
  };

  const headerData = {
    toggleAddModal,
  };

  return (
    <>
      <Row>
        <div className="col">
          <Card className="shadow">
            <TableCardHeader data={headerData} />
            <Table className="align-items-center table-flush" responsive>
              <thead className="thead-light">
                <tr>
                  {thData.map((thItem, idx) => (
                    <th scope="col" className={"thItem" + idx}>
                      {thItem}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {tbData.map((tbItem, idx) => (
                  <tr className={"tbItem" + idx}>
                    <td>
                      <FormGroup check>
                        <Input type="checkbox" />
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
                          <DropdownItem onClick={(e) => e.preventDefault()}>
                            {t("common.edit")}
                          </DropdownItem>
                          <DropdownItem
                            onClick={(e) => {
                              e.preventDefault();
                              setIsEditable(false);
                              setIsOpenAddModal(true);
                            }}
                          >
                            {t("common.delete")}
                          </DropdownItem>
                          <DropdownItem
                            onClick={(e) => {
                              e.preventDefault();
                              setModalData({
                                title: "Admin",
                                toggle: toggleAddModal,
                                formValue: tbItem,
                                formFields: thData,
                              });
                              setIsEditable(true);
                              setIsOpenAddModal(true);
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
                  <PaginationItem className="disabled">
                    <PaginationLink
                      onClick={(e) => e.preventDefault()}
                      tabIndex="-1"
                    >
                      <i className="fas fa-angle-left" />
                      <span className="sr-only">Previous</span>
                    </PaginationLink>
                  </PaginationItem>
                  <PaginationItem className="active">
                    <PaginationLink onClick={(e) => e.preventDefault()}>
                      1
                    </PaginationLink>
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationLink onClick={(e) => e.preventDefault()}>
                      2 <span className="sr-only">(current)</span>
                    </PaginationLink>
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationLink onClick={(e) => e.preventDefault()}>
                      3
                    </PaginationLink>
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationLink onClick={(e) => e.preventDefault()}>
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
      <CommonAddEditModal
        open={isOpenAddModal}
        data={modalData}
        isEditable={isEditable}
      />
    </>
  );
};

export default CommonTables;
