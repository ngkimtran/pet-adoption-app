import { Link } from "react-router-dom";
import { LOGO } from "../../constants/constants";

const Header = () => {
  return (
    <nav className="navbar bg-dark p-0">
      <div className="container">
        <Link to="/" className="text-color-primary text-decoration-none">
          <div className="d-flex align-items-center">
            <img
              src={LOGO}
              alt=""
              className="me-3 logo"
              style={{ width: "8rem" }}
            />
            <h1>Pet Adoption</h1>
          </div>
        </Link>
        <nav>
          <ul className="fs-4 fw-semibold gap-2 mb-0 list-unstyled d-flex flex-row align-items-center justify-content-between">
            <Link
              className="navbar-link text-color-primary text-decoration-none"
              to="/"
            >
              Home
            </Link>
            <Link
              className="navbar-link text-color-primary text-decoration-none"
              to="/"
            >
              About
            </Link>
            <Link
              className="navbar-link text-color-primary text-decoration-none"
              to="/"
            >
              Adopt a pet
            </Link>
          </ul>
        </nav>
      </div>
    </nav>
  );
};

export default Header;
