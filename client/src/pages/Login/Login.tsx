import { useState } from "react";
import { useRecoilState } from "recoil";
import { toast } from "react-toastify";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import { useMutation } from "@apollo/client";
import { LOGIN } from "../../mutations/userMutations";
import { tokenState } from "../../states/state";
import { ERROR_TOAST_ID } from "../../constants/constants";

const Login = () => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  // const [localSavePermission, setLocalSavePermission] =
  //   useState<boolean>(false);

  const navigate = useNavigate();

  const [, setToken] = useRecoilState(tokenState);

  const [login] = useMutation(LOGIN, {
    onCompleted: (data) => {
      const { token } = JSON.parse(data.login);
      setToken(token);

      // if (localSavePermission)
      localStorage.setItem("pet-adoption-user-token", token);

      setTimeout(() => navigate("/"), 50);
    },
    onError: (error) => {
      toast.error(error.graphQLErrors[0].message, {
        toastId: ERROR_TOAST_ID,
        position: toast.POSITION.TOP_CENTER,
        theme: "colored",
        hideProgressBar: true,
        autoClose: 2000,
      });
    },
  });

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    await login({ variables: { username, password } });
  };

  return (
    <>
      <Helmet>
        <title>Login</title>
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
              Log In
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
            <div className="mb-3 input-group-lg">
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <div className="d-flex">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  className="form-control"
                  value={password}
                  onChange={({ target }) => setPassword(target.value)}
                  required
                />
                <div
                  role="button"
                  style={{ marginLeft: "-2.5rem" }}
                  onClick={() => setShowPassword(!showPassword)}
                  className="fs-5 d-flex align-items-center"
                >
                  {showPassword ? <AiFillEyeInvisible /> : <AiFillEye />}
                </div>
              </div>
            </div>
            {/* <div className="mb-3 form-check">
            <input
              id="localSave"
              type="checkbox"
              className="form-check-input"
              checked={localSavePermission}
              onChange={() => setLocalSavePermission(!localSavePermission)}
            />
            <label className="form-check-label" htmlFor="localSave">
              Keep me signed in
            </label>
          </div> */}
            <button
              type="submit"
              className="btn btn-primary w-100 rounded-pill fw-bold text-uppercase mt-3 p-3"
            >
              Log in
            </button>
          </form>
          <Link
            to="/"
            className="text-color-primary mt-3"
            style={{ fontSize: ".9rem" }}
          >
            Forgot your password?
          </Link>
          <hr
            className="w-50 mx-auto my-5 background-primary rounded border-0 opacity-50"
            style={{ height: "2px" }}
          />
          <div className="m-0 text-secondary">
            Need an account?{" "}
            <Link to="/register" className="text-color-primary fw-semibold">
              Register now
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
