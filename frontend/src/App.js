import "./App.css";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Creation from "./pages/Creation";
import SelectedCountry from "./pages/SelectedCountry";
import EditingCountry from "./pages/EditingCountry";
import NotFound from "./pages/NotFound";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

function App() {
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
        <Route path="*" element={<NotFound />}></Route>
      </Routes>
      <Footer />
    </>
  );
}

export default App;
