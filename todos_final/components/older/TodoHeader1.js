"use client";
import React from "react";
import { Navbar, Container } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const TodoHeader = () => {
  return (
    <Navbar bg="light" expand="lg" className="mb-4">
      <Container>
        <Navbar.Brand >NEXT-THING-TO-DO</Navbar.Brand>
      </Container>
    </Navbar>
  );
};

export default TodoHeader;
