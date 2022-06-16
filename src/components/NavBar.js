import React from "react";
import {
  Navbar,
  Offcanvas,
  Container,
  Nav,
  Form,
  FormControl,
} from "react-bootstrap";
import { useAuth } from "../contexts/AuthContext";
import { Link } from "react-router-dom";
import { getDocs, collection } from "firebase/firestore";
import { db } from "../firebase";

const NavBar = ({ blogPosts, setBlogPosts }) => {
  const { currentUser } = useAuth();

  // const handleChange = (event) => {
  //   event.preventDefault();
  //   setSearchState(event.target.value);
  // let search = event.target.value;
  // let searchResult = [];
  // blogPosts.forEach((blog) => {
  //   let blogText = new DOMParser().parseFromString(blog.text, "text/html");
  //   let searchInTitle = blog.title.includes(search);
  //   let searchInText = blogText.body.innerText.toLowerCase().includes(search);
  //   if (searchInTitle || searchInText) {
  //     searchResult.push(blog);
  //   }
  // });
  // setBlogPosts(searchResult);
  // };

  const refresh = async (event) => {
    let blogsToSearch = blogPosts;
    if (event.keyCode === 8) {
      let tempBlogs = [];
      const querySnapshot = await getDocs(collection(db, "BlogPost"));
      querySnapshot.forEach((doc) => {
        let docData = doc.data();
        tempBlogs.push(docData);
      });
      blogsToSearch = tempBlogs;
      console.log(tempBlogs);
    }

    let search = event.target.value;
    console.log(blogsToSearch);
    let searchResult = [];
    blogsToSearch.forEach((blog) => {
      let blogText = new DOMParser().parseFromString(blog.text, "text/html");
      let searchInTitle = blog.title.includes(search);
      let searchInText = blogText.body.innerText.toLowerCase().includes(search);
      if (searchInTitle || searchInText) {
        searchResult.push(blog);
      }
    });
    setBlogPosts(searchResult);
  };

  return (
    <>
      <Navbar key={"md"} bg="light" expand={"md"} className="mb-3" sticky="top">
        <Container fluid>
          <Navbar.Brand href="#">Dawson Contreras Blogs</Navbar.Brand>
          <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${"md"}`} />
          <Navbar.Offcanvas
            id={`offcanvasNavbar-expand-${"md"}`}
            aria-labelledby={`offcanvasNavbarLabel-expand-${"md"}`}
            placement="end"
          >
            <Offcanvas.Header closeButton>
              <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${"md"}`}>
                Offcanvas
              </Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
              {currentUser ? (
                <Nav className="justify-content-end flex-grow-1 pe-3">
                  <Link to={{ pathname: "/newblog" }}>
                    <Nav.Link href="#action1">New Blog</Nav.Link>
                  </Link>
                  <Link to={{ pathname: "/dashboard" }}>
                    <Nav.Link href="#action2">Log Out</Nav.Link>
                  </Link>
                </Nav>
              ) : (
                <Nav className="justify-content-end flex-grow-1 pe-3">
                  <Link to={{ pathname: "/login" }}>
                    <Nav.Link href="#action2">Log in</Nav.Link>
                  </Link>
                  {/* <Nav.Link href="#action2">Sign Up</Nav.Link> */}
                </Nav>
              )}

              {/* <NavDropdown
                  title="Dropdown"
                  id={`offcanvasNavbarDropdown-expand-${"lg"}`}
                >
                  <NavDropdown.Item href="#action3">Action</NavDropdown.Item>
                  <NavDropdown.Item href="#action4">
                    Another action
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item href="#action5">
                    Something else here
                  </NavDropdown.Item>
                </NavDropdown> */}

              <Form className="d-flex">
                <FormControl
                  type="search"
                  placeholder="Search"
                  className="me-2"
                  aria-label="Search"
                  // onChange={handleChange}
                  onKeyDown={refresh}
                />
              </Form>
            </Offcanvas.Body>
          </Navbar.Offcanvas>
        </Container>
      </Navbar>
    </>
  );
};

export default NavBar;
