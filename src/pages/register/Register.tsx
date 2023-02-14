import React, { useRef } from "react";
import { Container } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

import "./register.css";
import { useAuth } from "../../context/AuthContext";

const Register = () => {
  const { register } = useAuth();

  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>();
  const passwordRef = useRef<HTMLInputElement>();
  const passwordConfirmRef = useRef<HTMLInputElement>();
  const phoneRef = useRef<HTMLInputElement>();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (register.isLoading) return;

    const name = nameRef.current?.value;
    const email = emailRef.current?.value;
    const password = passwordRef.current?.value;
    const passwordConfirm = passwordConfirmRef.current?.value;
    const phone = phoneRef.current?.value;

    if (password !== passwordConfirm) {
      return toast.error("Passwords do not match");
    }

    const user = {
      name,
      email,
      password,
      phone: Number(phone),
    };

    register.mutate(user);

    // register.error && toast.error(String(register.error));

    // dispatch(registerUser({ user, navigate }));
  };

  return (
    <div
      style={{
        minHeight: "100vh",
      }}
    >
      <Container className="register-container">
        <h1 className="register-heading">Register</h1>
        <div className="d-flex h-100 justify-content-center align-items-center">
          <Form className="card p-5" onSubmit={handleSubmit}>
            <Form.Group controlId="formBasicName">
              <Form.Label>Name</Form.Label>
              <Form.Control
                ref={nameRef}
                type="text"
                placeholder="Enter name"
                className="form-control mb-3"
                required
              />
            </Form.Group>

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

            <Form.Group controlId="formBasicCPassword">
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control
                ref={passwordConfirmRef}
                type="password"
                placeholder="Confirm Password"
                className="form-control mb-3"
                required
              />
            </Form.Group>

            <Form.Group controlId="formBasicMobile">
              <Form.Label>Mobile No: </Form.Label>
              <Form.Control
                ref={phoneRef}
                type="number"
                placeholder="Enter Mobile No:"
                className="form-control mb-3"
                required
                pattern="[0-9]{10}"
              />
            </Form.Group>

            <Button variant="primary" type="submit" className="btn btn-primary">
              Submit
            </Button>
            <div className="d-flex justify-content-between mt-3">
              <p className="register-text">
                Already have an account?{" "}
                <Link to="/login" className="text-primary">
                  Login
                </Link>
              </p>
            </div>
          </Form>
        </div>
      </Container>
    </div>
  );
};

export default Register;
