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
} from "reactstrap";

import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { useRoundingService } from "features/rounding/hooks";

// core components
import Header from "components/Headers/Header.js";

const RoundingManagement = () => {
  const { fetchAllRoundings } = useRoundingService();
  const { loading, error, data } = useSelector((state) => state.rounding);
  const { t } = useTranslation();

  const [roundings, setRoundings] = useState([]);

  useEffect(() => {
    fetchAllRoundings();
  }, [fetchAllRoundings]);

  useEffect(() => {
    if (data.data && data.data.roundings) {
      setRoundings(data.data.roundings);
    }
  }, [data]);

  return (
    <>
      <Header />
      {/* Page content */}
      <Container className="mt--7" fluid>
        {/* Table */}
        <Row>
          <div className="col">
            <Card className="shadow">
              <CardHeader className="bg-transparent">
                <h3 className="mb-0">{t("roundingPage.rounding")}</h3>
              </CardHeader>
              <CardBody>
                <Row className="icon-examples">
                  <Table className="align-items-center table-flush" responsive>
                    <thead className="thead-light">
                      <tr>
                        <th scope="col"></th>
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
                        <tr className={`members-tbl-r-${idx}`}>
                          <td>
                            <FormGroup check>
                              <Input type="checkbox" />
                              <Label check></Label>
                            </FormGroup>
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
                                <DropdownItem
                                  onClick={(e) => e.preventDefault()}
                                >
                                  {t("common.edit")}
                                </DropdownItem>
                                <DropdownItem
                                  onClick={(e) => {
                                    e.preventDefault();
                                  }}
                                >
                                  {t("common.delete")}
                                </DropdownItem>
                                <DropdownItem
                                  onClick={(e) => {
                                    e.preventDefault();
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
            </Card>
          </div>
        </Row>
      </Container>
    </>
  );
};

export default RoundingManagement;
