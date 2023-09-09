import { useRecoilState } from "recoil";
import { ApolloConsumer, ApolloClient, useQuery } from "@apollo/client";
import { Link, useNavigate } from "react-router-dom";
import { BsFillPersonFill } from "react-icons/bs";
import { MdKeyboardArrowDown } from "react-icons/md";
import { LOGO } from "../../constants/constants";
import { tokenState, userState } from "../../states/state";
import { Animal } from "../../types/types";
import { GET_ANIMALS } from "../../queries/animalQueries";

const Header = () => {
  const [, setToken] = useRecoilState(tokenState);
  const [user, setUser] = useRecoilState(userState);

  const navigate = useNavigate();

  const { data, loading, error } = useQuery(GET_ANIMALS);

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
              <ul
                className="fs-5 fw-semibold mb-0 list-unstyled d-flex flex-row align-items-center"
                style={{ gap: "2rem" }}
              >
                <Link
                  className="navbar-link text-color-primary text-decoration-none"
                  to="/"
                >
                  Home
                </Link>
                <Link
                  className="navbar-link text-color-primary text-decoration-none"
                  to="/about"
                >
                  About us
                </Link>
                <div className="dropdown navbar-link icon-primary text-decoration-none">
                  <span
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    Find a pet{" "}
                    <MdKeyboardArrowDown className="dropdown-toggle" />
                  </span>
                  <ul className="dropdown-menu mt-3">
                    {!loading &&
                      !error &&
                      data &&
                      data.animals.map((animal: Animal) => (
                        <li key={animal.id}>
                          <Link
                            className="dropdown-item px-4 py-3 text-capitalize"
                            to={`/browse-pets/${animal.name}`}
                          >
                            {animal.name}
                          </Link>
                        </li>
                      ))}
                  </ul>
                </div>
                <Link
                  className="navbar-link text-color-primary text-decoration-none"
                  to="/adopt"
                >
                  Adopt a pet
                </Link>
                <div className=" mx-2 vr text-color-primary opacity-100"></div>
                {user ? (
                  <div className="dropdown">
                    <BsFillPersonFill
                      data-testid="userIcon"
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
                          className="dropdown-item px-4 py-3"
                          to={`/${user.id}`}
                        >
                          Profile
                        </Link>
                      </li>
                      <li>
                        {user?.role === "ADMIN" && (
                          <Link
                            className="dropdown-item px-4 py-3"
                            to={`/${user.id}/admin-panel`}
                          >
                            Admin panel
                          </Link>
                        )}
                        {user?.role === "USER" && (
                          <Link
                            className="dropdown-item px-4 py-3"
                            to={`/${user.id}/favorites`}
                          >
                            Favorite pets
                          </Link>
                        )}
                      </li>
                      <li>
                        <p
                          role="button"
                          className="dropdown-item px-4 py-3"
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
