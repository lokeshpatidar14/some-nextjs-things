"use client";
import React, { useState } from "react";
import { Button, Form, Row, Col, Container, ListGroup } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import TodoList from "./TodoList";

const TodoForm = () => {
  const [enteredData, setEnteredData] = useState("");
  const [listData, setListData] = useState([]);
  const [completedData, setCompletedData] = useState([]); // For completed items

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (enteredData.trim()) {
      setListData([...listData, { text: enteredData, completed: false }]);
      setEnteredData("");
    }
  };

  return (
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

        {/* Todo List */}
        <Row>
          <Col>
            <TodoList
              listData={listData}
              setListData={setListData}
              setCompletedData={setCompletedData}
            />
          </Col>
        </Row>

        {/* Completed List */}
        {completedData.length > 0 && (
          <Row className="mt-4">
            <Col>
              <h5>Completed Items</h5>
              <ListGroup>
                {completedData.map((item, index) => (
                  <ListGroup.Item
                    key={index}
                    style={{ backgroundColor: "#d4edda", color: "#155724" }}>
                    {item.text}
                  </ListGroup.Item>
                ))}
              </ListGroup>
            </Col>
          </Row>
        )}
      </Form>
    </Container>
  );
};

export default TodoForm;
