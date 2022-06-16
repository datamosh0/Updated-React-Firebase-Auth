import React, { useRef, useState } from "react";
import { addDoc, collection, Timestamp } from "firebase/firestore";
import { db } from "../firebase";
import Editor from "./Editor";
import { Card, Form, Button } from "react-bootstrap";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

const NewBlog = () => {
  const { currentUser } = useAuth();
  const titleRef = useRef();
  const [text, setText] = useState("<div></div>");
  const navigate = useNavigate();

  const sendDataToFirebase = async (e) => {
    e.preventDefault();
    await addDoc(collection(db, "BlogPost"), {
      title: titleRef.current.value,
      text: text,
      email: currentUser.email,
      dateExample: Timestamp.fromDate(new Date()),
    });
    navigate("/");
  };

  return (
    <Card>
      <Card.Body>
        <Form>
          <Form.Group id="title">
            <Form.Label>Enter a Title...</Form.Label>
            <Form.Control type="text" ref={titleRef}></Form.Control>
          </Form.Group>
          <div className="mt-3">
            <Editor setText={setText} text={text} />
          </div>
          {currentUser ? (
            <Button
              className="w-100 mt-3"
              type="submit"
              onClick={sendDataToFirebase}
            >
              Post
            </Button>
          ) : (
            <Button
              className="w-100 mt-3"
              type="secondary"
              onClick={() => navigate("/login")}
            >
              Log in to post a blog
            </Button>
          )}
        </Form>
      </Card.Body>
    </Card>
  );
};

export default NewBlog;
