/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
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

import { ContentDetailModal } from "./DetailView";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { API_BASE_URL } from "config";
import { LoadingComponent } from "components/Loading";

const ContentUpdate = () => {
  const [contentTitle, setContentTitle] = useState("");
  const [subType, setSubType] = useState("");
  const [fileURI, setFileURI] = useState("");
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [pictures, setPictures] = useState([]);
  const [picturesUri, setPicturesURI] = useState([]);
  const [contentData, setContentData] = useState("");
  const { get: getContent, updateContent } = useContentService();
  const { selected: selectedContent, loading } = useSelector(
    (state) => state.content
  );
  const { contentType, id } = useParams();
  const navigate = useNavigate();
  // Language translation
  const { t } = useTranslation();

  const onUpdate = () => {
    updateContent({
      type: contentType,
      title: contentTitle,
      files: pictures[0],
      sub_type: subType,
      html: contentData,
      _id: id,
    });
  };

  const onBack = () => {
    navigate("/admin/content_management");
  };
  // Image upload
  const onDrop = (pictureFiles, pictureDataURLs) => {
    setPictures(pictureFiles);
    setPicturesURI(pictureDataURLs);
    setFileURI(pictureDataURLs[0]);
  };

  // Preview
  const onOpenContentModal = () => {
    setIsOpenModal(true);
  };

  useEffect(() => {
    getContent({ id });
  }, [id]);

  useEffect(() => {
    if (selectedContent) {
      setContentTitle(selectedContent.title);
      setSubType(selectedContent.sub_type);
      setFileURI(`${API_BASE_URL}/${selectedContent.file}`);
      setContentData(selectedContent.html);
    }
  }, [selectedContent]);

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
              <Col md="2">{t("common.title")}</Col>
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

            <Row className="align-items-center mb-4">
              <Col md="2">{t("common.image")}</Col>
              <Col>
                <div style={{ width: 250, height: 250, display: "flex" }}>
                  {fileURI && (
                    <img
                      alt="#"
                      src={fileURI}
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
              <Button color="primary" type="button" onClick={() => onUpdate()}>
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
          files: fileURI,
          sub_type: subType,
        }}
        mode={0}
        title={t("contentPage." + contentType)}
        type=""
      />
    </>
  );
};

export default ContentUpdate;
