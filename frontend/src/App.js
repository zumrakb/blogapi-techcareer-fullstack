import "./App.css";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Creation from "./pages/Creation";
import SelectedCountry from "./pages/SelectedCountry";
import EditingCountry from "./pages/EditingCountry";
import NotFound from "./pages/NotFound";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import UserLogin from "./pages/UserLogin";
import UserSignup from "./pages/UserSignup";
import { useEffect } from "react";

function App() {
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      console.log("hello");
    }
  }, []);
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/create" element={<Creation />}></Route>
        <Route path="/blog/:countryid" element={<SelectedCountry />}></Route>
        <Route
          path="/blog/:countryid/edit"
          element={<EditingCountry />}
        ></Route>
        <Route path="/login" element={<UserLogin />}></Route>
        <Route path="/signup" element={<UserSignup />}></Route>
        <Route path="*" element={<NotFound />}></Route>
      </Routes>
      <Footer />
    </>
  );
}

export default App;
