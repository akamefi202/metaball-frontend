/* eslint-disable react-hooks/exhaustive-deps */
import { useState } from "react";
import {
  Container,
  Card,
  Row,
  Col,
  CardBody,
  CardHeader,
  Button,
  Input,
  FormGroup,
  InputGroup,
} from "reactstrap";
import { useTranslation } from "react-i18next";
import ImageUploader from "react-images-upload";
import Editor from "components/Editor";
import Header from "components/Headers/Header";
import { useContentService } from "features/content/hooks/useContentService";

import { ContentDetailModal, RoundingSelectModal } from "./DetailView";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { LoadingComponent } from "components/Loading";
import { ContentType } from "config";

const ContentAdd = () => {
  const [contentTitle, setContentTitle] = useState("");
  const [subType, setSubType] = useState("");
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [pictures, setPictures] = useState([]);
  const [picturesUri, setPicturesURI] = useState([]);
  const [contentData, setContentData] = useState("");
  const { createContent } = useContentService();
  const { contentType } = useParams();
  const { loading } = useSelector((state) => state.content);
  const [selectedRounding, setSelectedRounding] = useState();
  const [isOpenSelectRoundingModal, setIsOpenSelectRoundingModal] =
    useState(false);

  const onOpenSelectRoundingModal = () => {
    setIsOpenSelectRoundingModal(true);
  };

  const navigate = useNavigate();
  // Language translation
  const { t } = useTranslation();

  const onAdd = () => {
    if (contentType === ContentType.EVENT) {
      createContent({
        type: contentType,
        title: contentTitle,
        files: pictures[0],
        sub_type: subType,
        html: contentData,
        rounding: selectedRounding ? selectedRounding._id : null,
      });
    } else {
      createContent({
        type: contentType,
        title: contentTitle,
        files: pictures[0],
        sub_type: subType,
        html: contentData,
      });
    }
  };

  const onBack = () => {
    navigate("/admin/content_management");
  };
  // Image upload
  const onDrop = (pictureFiles, pictureDataURLs) => {
    setPictures(pictureFiles);
    setPicturesURI(pictureDataURLs);
  };
  // Content Change
  // const onChangeContent = (html) => {
  //   setContentData(html);
  // };

  // Preview
  const onOpenContentModal = () => {
    setIsOpenModal(true);
  };

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
      {/* Page content */}
      <Container fluid>
        <Card>
          <CardHeader>
            <h3>{t("contentPage." + contentType)}</h3>
          </CardHeader>
          <CardBody>
            <Row className="align-items-center mb-4">
              <Col md="2">
                <p>{t("common.title")}</p>
              </Col>
              <Col md="">
                <FormGroup className="mb-0">
                  <InputGroup>
                    <Input
                      placeholder={t("common.title")}
                      type="text"
                      value={contentTitle}
                      onChange={(e) => setContentTitle(e.target.value)}
                      // required
                    />
                  </InputGroup>
                </FormGroup>
              </Col>
            </Row>
            {contentType === ContentType.NEWS && (
              <Row className="align-items-center mb-4">
                <Col md="2">{t("common.type")}</Col>
                <Col md="">
                  <FormGroup className="mb-0">
                    <InputGroup>
                      <Input
                        placeholder={t("common.type")}
                        type="text"
                        value={subType}
                        onChange={(e) => setSubType(e.target.value)}
                        // required
                      />
                    </InputGroup>
                  </FormGroup>
                </Col>
              </Row>
            )}
            {contentType === ContentType.EVENT && (
              <Row className="align-items-center mb-4">
                <Col md="2">
                  <p>{t("roundingPage.rounding")}</p>
                </Col>
                {selectedRounding && (
                  <Col md="">
                    <p>{selectedRounding.title}</p>
                  </Col>
                )}
                <Col md="4">
                  <Button
                    color="secondary"
                    type="button"
                    onClick={() => onOpenSelectRoundingModal()}
                  >
                    {t("roundingPage.selectRounding")}
                  </Button>
                </Col>
              </Row>
            )}
            <Row className="align-items-center mb-4">
              <Col md="2">
                <p>{t("common.image")}</p>
              </Col>
              <Col>
                <div style={{ width: 250, height: 250, display: "flex" }}>
                  {picturesUri[0] && (
                    <img
                      alt="#"
                      src={picturesUri[0]}
                      style={{ width: "100%", objectFit: "cover" }}
                    />
                  )}
                </div>
              </Col>

              <Col md="">
                <ImageUploader
                  withIcon={true}
                  buttonText="Choose images"
                  onChange={onDrop}
                  imgExtension={[".jpg", ".gif", ".png", ".gif"]}
                  maxFileSize={5242880}
                  singleImage
                />
              </Col>
            </Row>
            <Row>
              <Col>
                <Editor
                  onChange={(html) => setContentData(html)}
                  editorHtml={contentData}
                />
              </Col>
            </Row>
            <Row className="justify-content-end mt-4">
              <Button color="primary" type="button" onClick={() => onAdd()}>
                {t("common.add")}
              </Button>
              <Button
                color="secondary"
                onClick={() => {
                  onOpenContentModal();
                }}
              >
                {t("common.preview")}
              </Button>
              <Button color="secondary" type="button" onClick={() => onBack()}>
                {t("common.back")}
              </Button>
            </Row>
          </CardBody>
        </Card>
      </Container>
      <ContentDetailModal
        isOpen={isOpenModal}
        toggle={() => {
          setIsOpenModal(!isOpenModal);
        }}
        contentItem={{
          title: contentTitle,
          html: contentData ? contentData : "",
          files: picturesUri[0],
          sub_type: subType,
        }}
        mode={0}
        title={t("contentPage." + contentType)}
        type=""
      />
      <RoundingSelectModal
        isOpen={isOpenSelectRoundingModal}
        toggle={() => {
          setIsOpenSelectRoundingModal(!isOpenSelectRoundingModal);
        }}
        onSelectRounding={(item) => setSelectedRounding(item)}
      />
    </>
  );
};

export default ContentAdd;
