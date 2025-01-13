/* eslint-disable react-hooks/exhaustive-deps */
import {
  Row,
  Col,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "reactstrap";
import { useTranslation } from "react-i18next";
import parser from "html-react-parser";

export const ServiceDetailModal = ({
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
        <h3>{contentItem.title}</h3>
      </ModalHeader>
      <ModalBody
        style={{ borderTop: "1px solid #eee", borderBottom: "1px solid #eee" }}
      >
        <Row className="py-2 mt-2 align-items-center">
          <Col>
            {/* <Row>
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
            </Row> */}
            <Row>
              <h3
                style={{ textAlign: "center", width: "100%", marginBottom: 30 }}
              >
                {contentItem.title}
              </h3>
            </Row>
            <Row>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  width: "100%",
                }}
              >
                {contentItem.icon && (
                  <img src={contentItem.icon} alt="featured image" />
                )}
              </div>
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
