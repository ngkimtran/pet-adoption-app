import { useState } from "react";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import { useMutation } from "@apollo/client";
import { ADD_USER } from "../../mutations/userMutations";
import { ERROR_TOAST_ID, SUCCESS_TOAST_ID } from "../../constants/constants";

const Login = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [firstname, setFirstname] = useState<string>("");
  const [lastname, setLastname] = useState<string>("");
  const [email, setEmail] = useState<string>("");

  const navigate = useNavigate();

  const [register] = useMutation(ADD_USER, {
    onCompleted: () => {
      toast.success("Register user successfully! Navigating to login page...", {
        toastId: SUCCESS_TOAST_ID,
        position: toast.POSITION.TOP_CENTER,
        theme: "colored",
        hideProgressBar: true,
        autoClose: 2000,
      });
      setTimeout(() => navigate("/login"), 2000);
    },
    onError: (error) => {
      toast.error(error.graphQLErrors[0].message, {
        toastId: ERROR_TOAST_ID,
        position: toast.POSITION.TOP_CENTER,
        theme: "colored",
        hideProgressBar: true,
      });
    },
  });

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    await register({
      variables: {
        username,
        firstname,
        lastname,
        email,
        password,
      },
    });
  };

  return (
    <>
      <Helmet>
        <title>Register</title>
      </Helmet>
      <div
        className="d-flex align-items-center justify-content-center"
        style={{ minHeight: "inherit" }}
      >
        <div
          className="container p-5 m-5 rounded border shadow bg-white d-flex flex-column align-items-center justify-content-center"
          style={{ width: "500px" }}
        >
          <form onSubmit={onSubmit}>
            <h1 className="mb-4 input-group-lg text-center text-color-dark">
              Register
            </h1>
            <div className="mb-3 input-group-lg">
              <label htmlFor="username" className="form-label">
                Username
              </label>
              <input
                id="username"
                type="text"
                autoComplete="username"
                className="form-control"
                value={username}
                onChange={({ target }) => setUsername(target.value)}
                required
              />
            </div>
            <div className="mb-3 input-group input-group-lg">
              <div className=" d-flex flex-column">
                <label htmlFor="firstname" className="form-label">
                  Firstname
                </label>
                <input
                  id="firstname"
                  type="text"
                  className="form-control"
                  value={firstname}
                  onChange={({ target }) => setFirstname(target.value)}
                  required
                />
              </div>
              <div className=" d-flex flex-column">
                <label htmlFor="lastname" className="form-label">
                  Lastname
                </label>
                <input
                  id="lastname"
                  type="text"
                  className="form-control"
                  value={lastname}
                  onChange={({ target }) => setLastname(target.value)}
                  required
                />
              </div>
            </div>

            <div className="mb-3 input-group-lg">
              <label htmlFor="email" className="form-label">
                Email address
              </label>
              <input
                id="email"
                type="email"
                className="form-control"
                value={email}
                onChange={({ target }) => setEmail(target.value)}
                required
              />
            </div>
            <div className="mb-3 input-group-lg">
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <input
                id="password"
                type="password"
                autoComplete="current-password"
                className="form-control"
                value={password}
                onChange={({ target }) => setPassword(target.value)}
                required
              />
            </div>
            <button
              type="submit"
              className="btn btn-primary w-100 rounded-pill fw-bold text-uppercase mt-3 p-3"
            >
              Register
            </button>
          </form>

          <hr
            className="w-50 mx-auto my-5 background-primary rounded border-0 opacity-50"
            style={{ height: "2px" }}
          />
          <div className="m-0 text-secondary">
            Already have an account?{" "}
            <Link to="/login" className="text-color-primary fw-semibold">
              Login
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
