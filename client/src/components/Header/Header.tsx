import { useRecoilState } from "recoil";
import { ApolloConsumer, ApolloClient } from "@apollo/client";
import { Link, useNavigate } from "react-router-dom";
import { BsFillPersonFill } from "react-icons/bs";
import { LOGO } from "../../constants/constants";
import { tokenState, userState } from "../../states/state";

const Header = () => {
  const [, setToken] = useRecoilState(tokenState);
  const [user, setUser] = useRecoilState(userState);
  const navigate = useNavigate();

  const logout = (client: ApolloClient<object>) => {
    setToken(null);
    setUser(null);
    localStorage.clear();
    client.resetStore();
    navigate("/");
  };

  return (
    <ApolloConsumer>
      {(client) => (
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
              <ul className="fs-5 fw-semibold gap-1 mb-0 list-unstyled d-flex flex-row align-items-center">
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
                <div className=" mx-4 vr text-color-primary opacity-100"></div>
                {user ? (
                  <div className="dropdown">
                    <BsFillPersonFill
                      className="fs-3 icon-primary dropdown-toggle"
                      data-bs-toggle="dropdown"
                    />

                    <ul className="dropdown-menu dropdown-menu-end mt-3">
                      <li>
                        <h6 className="dropdown-header text-capitalize">
                          Hello, {user.firstname} {user.lastname}
                        </h6>
                      </li>
                      <li>
                        <hr className="dropdown-divider" />
                      </li>
                      <li>
                        <Link
                          className="dropdown-item py-2 dropdown-text"
                          to={`/${user.id}`}
                        >
                          Profile
                        </Link>
                      </li>
                      <li>
                        <p
                          role="button"
                          className="dropdown-item py-2 dropdown-text"
                          onClick={() => logout(client)}
                        >
                          Log out
                        </p>
                      </li>
                    </ul>
                  </div>
                ) : (
                  <>
                    <Link
                      className="navbar-link text-color-primary text-decoration-none ps-3"
                      to="/login"
                    >
                      Log in
                    </Link>
                    <Link
                      className="navbar-link text-color-primary text-decoration-none"
                      to="/register"
                    >
                      Register
                    </Link>
                  </>
                )}
              </ul>
            </nav>
          </div>
        </nav>
      )}
    </ApolloConsumer>
  );
};

export default Header;
