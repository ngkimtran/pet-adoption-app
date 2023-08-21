import { useRecoilState } from "recoil";
import { ApolloConsumer, ApolloClient } from "@apollo/client";
import { Link } from "react-router-dom";
import { LOGO } from "../../constants/constants";
import { tokenState } from "../../states/state";

const Header = () => {
  const [token, setToken] = useRecoilState(tokenState);

  const logout = (client: ApolloClient<object>) => {
    setToken(null);
    localStorage.clear();
    client.resetStore();
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
                {token ? (
                  <button
                    onClick={() => logout(client)}
                    className="navbar-link fw-semibold bg-transparent border-0 text-color-primary text-decoration-none m-0 p-0"
                  >
                    Log out
                  </button>
                ) : (
                  <>
                    <Link
                      className="navbar-link text-color-primary text-decoration-none ps-4"
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
