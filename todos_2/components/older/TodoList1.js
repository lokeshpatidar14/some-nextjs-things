"use client";
import React, { useState } from "react";
import { ListGroup, Button, Row, Col, Form } from "react-bootstrap";
import { SlPencil } from "react-icons/sl";
import { PiTrashLight } from "react-icons/pi";
import { IoCheckmarkDoneOutline } from "react-icons/io5";

const TodoList = ({ listData, setListData }) => {
  const [editIndex, setEditIndex] = useState(null);
  const [editValue, setEditValue] = useState("");

  // Mark as completed
  const handleMarkComplete = (index) => {
    const completedItem = listData.active[index];
    const updatedList = listData.active.filter((_, i) => i !== index);
    setListData({ 
      active: updatedList, 
      completed: [...listData.completed, completedItem] 
    });
  };

  // Edit item
  const handleEdit = (index) => {
    setEditIndex(index);
    setEditValue(listData.active[index].text);
  };

  // Save edited item
  const handleSaveEdit = (index) => {
    const updatedList = listData.active.map((item, i) =>
      i === index ? { ...item, text: editValue } : item
    );
    setListData({ 
      active: updatedList, 
      completed: listData.completed 
    });
    setEditIndex(null);
  };

  // Delete item
  const handleDelete = (index) => {
    setListData({ 
      active: listData.active.filter((_, i) => i !== index), 
      completed: listData.completed 
    });
  };

  const { active, completed } = listData;

  return (
    <>
      <ListGroup>
        {active.map((item, index) => (
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
                  aria-label="Mark complete"
                >
                  <IoCheckmarkDoneOutline />
                </Button>

                {editIndex === index ? (
                  <Button
                    variant="secondary"
                    className="ms-2"
                    onClick={() => handleSaveEdit(index)}
                    aria-label="Save edit"
                  >
                    Save
                  </Button>
                ) : (
                  <Button
                    variant="warning"
                    className="ms-2"
                    onClick={() => handleEdit(index)}
                    aria-label="Edit"
                  >
                    <SlPencil />
                  </Button>
                )}

                <Button
                  variant="danger"
                  className="ms-2"
                  onClick={() => handleDelete(index)}
                  aria-label="Delete"
                >
                  <PiTrashLight />
                </Button>
              </Col>
            </Row>
          </ListGroup.Item>
        ))}
      </ListGroup>

      {completed.length > 0 && (
        <ListGroup className="mt-4">
          {completed.map((item, index) => (
            <ListGroup.Item
              key={index}
              style={{ backgroundColor: "#d4edda", color: "#155724" }}
            >
              {item.text}
            </ListGroup.Item>
          ))}
        </ListGroup>
      )}
    </>
  );
};

export default TodoList;
