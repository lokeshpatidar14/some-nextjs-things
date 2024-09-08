"use client";
import React, { useState } from "react";
import { Button, Form, Row, Col, Container } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import TodoList from "./TodoList";
import TodoHeader from "./TodoHeader";

const TodoForm = () => {
  const [enteredData, setEnteredData] = useState("");
  const [listData, setListData] = useState({ active: [], completed: [] });

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (enteredData.trim()) {
      setListData({
        ...listData,
        active: [...listData.active, { text: enteredData, completed: false }]
      });
      setEnteredData("");
    }
  };

  return (
    <>
      <TodoHeader />
      <Container
        className="d-flex flex-column align-items-center justify-content-center"
        style={{ minHeight: "60vh" }}>
        <Form onSubmit={handleFormSubmit} style={{ width: "50%" }}>
          <Row className="align-items-center mb-3">
            <Col sm={8}>
              <Form.Control
                type="text"
                placeholder="Add what's in your mind"
                value={enteredData}
                onChange={(e) => setEnteredData(e.target.value)}
                required
              />
            </Col>
            <Col sm={4}>
              <Button type="submit" variant="primary" className="w-100">
                Add
              </Button>
            </Col>
          </Row>
          <Row>
            <Col>
              <TodoList
                listData={listData}
                setListData={setListData}
              />
            </Col>
          </Row>
        </Form>
      </Container>
    </>
  );
};

export default TodoForm;
