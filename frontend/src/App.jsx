import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Booking from "./pages/Booking";
import Beranda from "./pages/Beranda";
import Event from "./pages/Event";
import About from "./pages/About";
import Us from "./pages/Us";
import Login from "./pages/Login";

function App() {
  return (
    <div className="font-poppins">
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Beranda />} />
          <Route path="/event" element={<Event />} />
          <Route path="/about" element={<About />} />
          <Route path="/booking" element={<Booking />} />
          <Route path="/us" element={<Us />} />
          <Route path="/login" element={<Login />} />
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
