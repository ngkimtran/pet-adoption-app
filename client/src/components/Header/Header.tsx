import "./Header.css";

const logo = require("../../assets/logo.png");

const Header = () => {
  return (
    <nav className="navbar bg-dark p-0">
      <div className="container">
        <a href="/" className="navbar-brand">
          <div className="d-flex align-items-center">
            <img src={logo} alt="" className="mr-2" />
            <h1>Pet Adoption</h1>
          </div>
        </a>
        <nav>
          <ul className="navbar-list fs-4 fw-semibold gap-2 mb-0 list-unstyled d-flex flex-row align-items-center justify-content-between">
            <li>Home</li>
            <li>About</li>
            <li>Adopt a pet</li>
          </ul>
        </nav>
      </div>
    </nav>
  );
};

export default Header;
