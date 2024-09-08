"use client";
import React, { useState } from "react";
import { ListGroup, Button, Row, Col, Form } from "react-bootstrap";
import { SlPencil } from "react-icons/sl";
import { PiTrashLight } from "react-icons/pi";
import { IoCheckmarkDoneOutline } from "react-icons/io5";

const TodoList = ({ listData, setListData, setCompletedData }) => {
  const [editIndex, setEditIndex] = useState(null);
  const [editValue, setEditValue] = useState("");

  // Mark as completed
  const handleMarkComplete = (index) => {
    const completedItem = listData[index];
    setCompletedData((prev) => [...prev, completedItem]);
    setListData(listData.filter((_, i) => i !== index));
  };

  // Edit item
  const handleEdit = (index) => {
    setEditIndex(index);
    setEditValue(listData[index].text);
  };

  // Save edited item
  const handleSaveEdit = (index) => {
    const updatedList = listData.map((item, i) =>
      i === index ? { ...item, text: editValue } : item
    );
    setListData(updatedList);
    setEditIndex(null);
  };

  // Delete item
  const handleDelete = (index) => {
    setListData(listData.filter((_, i) => i !== index));
  };

  return (
    <ListGroup>
      {listData.map((item, index) => (
        <ListGroup.Item key={index}>
          <Row className="align-items-center">
            <Col xs={8} className="text-start">
              {editIndex === index ? (
                <Form.Control
                  type="text"
                  value={editValue}
                  onChange={(e) => setEditValue(e.target.value)}
                  autoFocus
                />
              ) : (
                <span>{item.text}</span>
              )}
            </Col>
            <Col xs={4} className="text-end">
              <Button
                variant="success"
                className="ms-2"
                onClick={() => handleMarkComplete(index)}
              >
                <IoCheckmarkDoneOutline />
              </Button>

              {editIndex === index ? (
                <Button
                  variant="secondary"
                  className="ms-2"
                  onClick={() => handleSaveEdit(index)}
                >
                  Save
                </Button>
              ) : (
                <Button
                  variant="warning"
                  className="ms-2"
                  onClick={() => handleEdit(index)}
                >
                  <SlPencil />
                </Button>
              )}

              <Button
                variant="danger"
                className="ms-2"
                onClick={() => handleDelete(index)}
              >
                <PiTrashLight />
              </Button>
            </Col>
          </Row>
        </ListGroup.Item>
      ))}
    </ListGroup>
  );
};

export default TodoList;
