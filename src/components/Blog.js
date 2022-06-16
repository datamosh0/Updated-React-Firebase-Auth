import React, { useEffect, useState } from "react";
import { Card, Button } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { db } from "../firebase";
import { doc, getDoc } from "firebase/firestore";

const Blog = () => {
  let { docRef } = useParams();

  const [docData, setDocData] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const func = async () => {
      const blogDoc = doc(db, "BlogPost", docRef);
      const docSnap = await getDoc(blogDoc);
      const tempDocData = docSnap.data();

      setDocData(tempDocData);
      setLoading(false);
    };
    func();
  }, []);

  useEffect(() => {
    let tempDocument = new DOMParser().parseFromString(
      docData.text,
      "text/html"
    );
    let temp = tempDocument.body.innerHTML;
    let tempEl = document.createElement("div");
    let x = document.querySelector(".insert");
    tempEl.innerHTML = `${temp}`;
    x.appendChild(tempEl);
  }, [loading]);
  return (
    <div>
      {!loading ? (
        <Card>
          <Card.Header>
            <h2>{docData.title}</h2>
          </Card.Header>
          <Card.Body>
            <Card.Text className="insert"></Card.Text>
          </Card.Body>
          {/* <Card.Footer className="text-muted">2 days ago</Card.Footer> */}
        </Card>
      ) : (
        <div className="insert hidden"></div>
      )}
    </div>
  );
};

export default Blog;
