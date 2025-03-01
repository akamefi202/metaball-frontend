/* eslint-disable react-hooks/exhaustive-deps */
// reactstrap components
import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { LoadingComponent } from "components/Loading";
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Col,
  Container,
  Row,
} from "reactstrap";
import { useAuthService } from "features/auth/hooks/useAuthService";
import { useSelector } from "react-redux";

const Login = () => {
  const location = useLocation(); // Get the current location
  const navigate = useNavigate();
  const { signin } = useAuthService();
  const { loading, data } = useSelector((state) => state.auth);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleKeyDown = (event) => {
    // Check if the pressed key is Enter (key code 13)
    if (event.key === "Enter") {
      // Handle Enter key press here (e.g., submit the form, etc.)
      signin({ email, password });
    }
  };

  useEffect(() => {
    if (data && data.manager) {
      const redirectTo = location.state?.from || "/admin/index";
      navigate(redirectTo, { replace: true });
    }
  }, [data, navigate, location]);

  // if (loading) {
  //   return (
  //     <>
  //       <LoadingComponent />
  //     </>
  //   );
  // }

  return (
    <>
      <div
        className="main-content"
        style={{ backgroundColor: "#172b4d", height: "100vh" }}
      >
        <div className="header bg-gradient-info py-7 py-lg-8">
          <Container>
            <div className="header-body text-center mb-7">
              <Row className="justify-content-center">
                <Col lg="5" md="6">
                  <h1 className="text-white">Welcome!</h1>
                </Col>
              </Row>
            </div>
          </Container>
          <div className="separator separator-bottom separator-skew zindex-100">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              preserveAspectRatio="none"
              version="1.1"
              viewBox="0 0 2560 100"
              x="0"
              y="0"
            >
              <polygon
                className="fill-default"
                points="2560 0 2560 100 0 100"
              />
            </svg>
          </div>
        </div>
        {/* Page content */}
        <Container className="mt--8 pb-5">
          <Row className="justify-content-center">
            <Col lg="5" md="7">
              <Card className="bg-secondary shadow border-0">
                <CardHeader className="bg-transparent pb-5">
                  <div className="text-muted text-center mt-2 mb-3">
                    <small>Sign in with credentials</small>
                  </div>
                </CardHeader>
                <CardBody className="px-lg-5 py-lg-5">
                  <Form role="form">
                    <FormGroup className="mb-3">
                      <InputGroup className="input-group-alternative">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="ni ni-email-83" />
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input
                          placeholder="Email"
                          type="email"
                          autoComplete="new-email"
                          value={email}
                          onChange={(e) => {
                            setEmail(e.target.value);
                          }}
                          onKeyDown={(e) => handleKeyDown(e)}
                        />
                      </InputGroup>
                    </FormGroup>
                    <FormGroup>
                      <InputGroup className="input-group-alternative">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="ni ni-lock-circle-open" />
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input
                          placeholder="Password"
                          type="password"
                          autoComplete="new-password"
                          value={password}
                          onChange={(e) => {
                            setPassword(e.target.value);
                          }}
                          onKeyDown={(e) => handleKeyDown(e)}
                        />
                      </InputGroup>
                    </FormGroup>
                    {/* <div className="custom-control custom-control-alternative custom-checkbox">
                <input
                  className="custom-control-input"
                  id=" customCheckLogin"
                  type="checkbox"
                />
                <label
                  className="custom-control-label"
                  htmlFor=" customCheckLogin"
                >
                  <span className="text-muted">Remember me</span>
                </label>
              </div> */}
                    <div className="text-center">
                      <Button
                        className="my-4"
                        color="primary"
                        type="button"
                        onClick={() => {
                          signin({ email, password });
                        }}
                      >
                        Sign in
                      </Button>
                    </div>
                  </Form>
                </CardBody>
              </Card>
              {/* <Row className="mt-3">
          <Col xs="6">
            <a href="" className="text-light" onClick={(e) => e.preventDefault()}>
              <small>Forgot password?</small>
            </a>
          </Col>
          <Col className="text-right" xs="6">
            <a className="text-light" onClick={(e) => e.preventDefault()}>
              <small>Create new account</small>
            </a>
          </Col>
        </Row> */}
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
};

export default Login;
