import React, { useRef } from "react";
import { Container } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

import "./register.css";
import { useAuth } from "../../context/AuthContext";

const Login = () => {
  const { login } = useAuth();

  const emailRef = useRef<HTMLInputElement>();
  const passwordRef = useRef<HTMLInputElement>();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const email = emailRef.current?.value;
    const password = passwordRef.current?.value;

    if (!(email && password)) {
      return toast.error("Please fill all the fields");
    }
    const user = {
      email,
      password,
    };

    login.mutate(user);

    emailRef.current!.value = "";
    passwordRef.current!.value = "";
  };

  return (
    <div
      style={{
        minHeight: "70vh",
      }}
    >
      <Container className="register-container">
        <h1 className="register-heading">Login</h1>
        <div className="d-flex h-100 justify-content-center align-items-center">
          <Form className="card p-5" onSubmit={handleSubmit}>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                ref={emailRef}
                type="email"
                placeholder="Enter email"
                className="form-control mb-3"
                required
              />
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                ref={passwordRef}
                type="password"
                placeholder="Password"
                className="form-control mb-3"
                required
              />
            </Form.Group>

            <Button variant="primary" type="submit" className="btn btn-primary">
              Submit
            </Button>
            <div className="d-flex justify-content-between mt-3">
              <p className="register-text">
                Don't have an account?{" "}
                <Link to="/register" className="text-primary">
                  Register
                </Link>
              </p>
            </div>
          </Form>
        </div>
      </Container>
    </div>
  );
};

export default Login;
