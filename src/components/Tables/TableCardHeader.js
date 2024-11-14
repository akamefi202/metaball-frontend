import {
  Button,
  CardHeader,
  FormGroup,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
} from "reactstrap";
import { useTranslation } from "react-i18next";

const TableCardHeader = ({ data }) => {
  const { t } = useTranslation();
  const { toggleAddModal } = data;

  return (
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
              <Input placeholder={t("common.searchPlaceholder")} type="text" />
            </InputGroup>
          </FormGroup>
          <Button className="btn-icon btn-3" color="primary" type="button">
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
            onClick={toggleAddModal}
          >
            <span className="btn-inner--icon">
              <i className="ni ni-fat-add" />
            </span>
            <span className="btn-inner--text">{t("common.add")}</span>
          </Button>
          <Button className="btn-icon btn-3" color="danger" type="button">
            <span className="btn-inner--icon">
              <i className="ni ni-fat-delete" />
            </span>
            <span className="btn-inner--text">{t("common.delete")}</span>
          </Button>
        </div>
      </CardHeader>
    </>
  );
};

export default TableCardHeader;
