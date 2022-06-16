import { Container } from "react-bootstrap";
import { AuthProvider } from "./contexts/AuthContext";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./Authentication/Dashboard";
import Login from "./Authentication/Login";
import PrivateRoute from "./Authentication/PrivateRoute";
import ForgotPassword from "./Authentication/RecoverPassword";
import UpdateProfile from "./Authentication/UpdateProfile";
import HomePage from "./components/HomePage";
import NewBlog from "./components/NewBlog";
import Blog from "./components/Blog";

function App() {
  return (
    <Container style={{ minHeight: "100vh" }}>
      <div className="w-100">
        <AuthProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<HomePage />}></Route>
              <Route path="/newblog" element={<NewBlog />}></Route>
              <Route path="/blog/:docRef/" element={<Blog />}></Route>
              <Route path="/login" element={<Login />}></Route>
              <Route
                path="/dashboard"
                element={
                  <PrivateRoute>
                    <Dashboard />
                  </PrivateRoute>
                }
              ></Route>
              <Route
                path="/update-profile"
                element={
                  <PrivateRoute>
                    <UpdateProfile />
                  </PrivateRoute>
                }
              ></Route>
              <Route
                path="/recover-password"
                element={<ForgotPassword />}
              ></Route>
            </Routes>
          </BrowserRouter>
        </AuthProvider>
      </div>
    </Container>
  );
}

export default App;
