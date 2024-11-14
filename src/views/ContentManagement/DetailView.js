import { useState, useEffect } from "react";
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
import { ContentType } from "config";
import { useTranslation } from "react-i18next";
import parser from "html-react-parser";

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
            <Row>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  width: "100%",
                }}
              >
                <img src={contentItem.files} alt="featured image" />
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
