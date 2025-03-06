import "./Navbar.css";

const Navbar = () => {
  return (
    <nav className="navbar">
      <h3>Products</h3>
      <div className="user-profile">
        <img src="/assets/img/girl.png" alt="User" />
        <div>
          <p>Moni Roy</p>
          <span>Admin</span>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
