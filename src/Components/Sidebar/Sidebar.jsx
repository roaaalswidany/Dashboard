import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import Modal from "../Modal/Modal";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "./Sidebar.css";

const Sidebar = () => {
  const [isLogoutOpen, setLogoutOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
    setLogoutOpen(false);
  };

  return (
    <div className="sidebar">
      <h2 className="logo">
        Dash<span>Stack</span>
      </h2>
      <ul className="menu">
        <li>
          <Link to="/dashboard">
            <i className="fa-solid fa-clock"></i> Dashboard
          </Link>
        </li>
        <li>
          <Link to="/dashboard/items">
            <i className="fa-solid fa-table-cells-large"></i> Products
          </Link>
        </li>
      </ul>

      <div className="sec1">
        <button className="logout-btn" onClick={() => setLogoutOpen(true)}>
          <i className="fa-solid fa-power-off"></i> Logout
        </button>
      </div>

      <Modal
        isOpen={isLogoutOpen}
        onClose={() => setLogoutOpen(false)}
        onConfirm={handleLogout}
        message="Are You Sure You Want To Logout?"
      />
    </div>
  );
};

export default Sidebar;
