import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import Booking from "./pages/Booking";
import Beranda from "./pages/Beranda";
import Event from "./pages/Event";
import About from "./pages/About";
import Us from "./pages/Us";
import Login from "./pages/Login";
import Admin from "./pages/Admin";
import Register from "./pages/Register";
import UserManagement from "./pages/UserManagement";
import Settings from "./pages/Settings";

function App() {
  return (
    <div className="font-poppins">
      <Router>
        <Content />
      </Router>
    </div>
  );
}

function Content() {
  const location = useLocation();
  const isDashboard = location.pathname === "/dashboard" || location.pathname === "/dashboard/user" || location.pathname === "/dashboard/setting";

  return (
    <div>
      {!isDashboard && <Navbar />}

      <Routes>
        <Route path="/" element={<Beranda />} />
        <Route path="/event" element={<Event />} />
        <Route path="/about" element={<About />} />
        <Route path="/booking" element={<Booking />} />
        <Route path="/us" element={<Us />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Admin />} />
        <Route path="/dashboard/user" element={<UserManagement />} />
        <Route path="/dashboard/setting" element={<Settings />} />
      </Routes>

      {!isDashboard && <Footer />}
    </div>
  );
}

export default App;
