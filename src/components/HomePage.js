import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import { collection, getDocs } from "firebase/firestore";
import { Row, Col, Card } from "react-bootstrap";
import defaultBlogImg from "../images/defaultBlog.png";
import { Link } from "react-router-dom";
import NavBar from "./NavBar";

const HomePage = () => {
  const [loading, setLoading] = useState(true);
  const [blogPosts, setBlogPosts] = useState([]);
  useEffect(() => {
    const func = async () => {
      let tempBlogs = [];
      const querySnapshot = await getDocs(collection(db, "BlogPost"));
      querySnapshot.forEach((doc) => {
        let docData = doc.data();
        docData["docRef"] = doc._key.path.segments.slice(-1)[0];
        tempBlogs.push(docData);
      });

      setBlogPosts(tempBlogs);
      setLoading(false);
    };
    func();
  }, []);

  return (
    <div>
      <NavBar blogPosts={blogPosts} setBlogPosts={setBlogPosts} />
      <div className="w-100 flex justify-center">
        <Card>
          <Card.Body>
            {!loading && (
              <Row xs={1} lg={2} className="g-4">
                {blogPosts.map((blog, idx) => {
                  let doc = new DOMParser().parseFromString(
                    blog.text,
                    "text/html"
                  );
                  console.log(blog);
                  let tempSrc = blog.homepageImg;
                  console.log(tempSrc);

                  let previewStr = "";
                  let singleEl = doc.body.firstChild;
                  while (singleEl.nextSibling) {
                    let temp = `${singleEl.innerText} `;
                    previewStr = previewStr.concat(temp);
                    singleEl = singleEl.nextSibling;
                  }
                  let temp = `${singleEl.innerText} `;
                  previewStr = previewStr.concat(temp);
                  previewStr = previewStr.slice(0, 400);

                  return (
                    <Link to={{ pathname: `/blog/${blog.docRef}` }} key={idx}>
                      <Col>
                        <Card>
                          <Card.Img
                            variant="top"
                            src={tempSrc}
                            style={{ maxHeight: "300px", maxWidth: "620px" }}
                          />
                          <Card.Body style={{ minHeight: "180px" }}>
                            <Card.Title>
                              <h1>{blog.title}</h1>
                            </Card.Title>
                            <Card.Text>{previewStr}...</Card.Text>
                          </Card.Body>
                        </Card>
                      </Col>
                    </Link>
                  );
                })}
              </Row>
            )}
          </Card.Body>
        </Card>
      </div>
    </div>
  );
};

export default HomePage;
