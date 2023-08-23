import { useState } from "react";
import { toast } from "react-toastify";
import { useMutation } from "@apollo/client";
import { UPDATE_USER } from "../../mutations/userMutations";
import { ERROR_TOAST_ID, SUCCESS_TOAST_ID } from "../../constants/constants";
import { useRecoilState } from "recoil";
import { userState } from "../../states/state";

const UpdateUserModal = () => {
  const [user] = useRecoilState(userState);

  const [username, setUsername] = useState<string>(user?.username!);
  const [firstname, setFirstname] = useState<string>(user?.firstname!);
  const [lastname, setLastname] = useState<string>(user?.lastname!);
  const [email, setEmail] = useState<string>(user?.email!);

  const [password, setPassword] = useState<string>("");

  const [updateUser] = useMutation(UPDATE_USER, {
    onCompleted: () => {
      toast.success("Update user successfully!", {
        toastId: SUCCESS_TOAST_ID,
        position: toast.POSITION.TOP_CENTER,
        theme: "colored",
        hideProgressBar: true,
        autoClose: 2000,
      });
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

  const handleClick = async (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.preventDefault();
    await updateUser({
      variables: {
        id: user?.id,
        username,
        password,
        firstname,
        lastname,
        email,
      },
    });
  };

  return (
    <div
      className="modal fade"
      id="updateUserModal"
      tabIndex={-1}
      aria-labelledby="updateUserModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="updateUserModalLabel">
              Update personal profile
            </h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">
            <div className="mb-3 input-group-lg">
              <label htmlFor="username" className="form-label">
                Username
              </label>
              <input
                id="username"
                type="text"
                className="form-control"
                value={username}
                onChange={({ target }) => setUsername(target.value)}
                required
              />
            </div>
            <div className="mb-3 input-group input-group-lg">
              <div className=" d-flex flex-column w-50">
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
              <div className=" d-flex flex-column  w-50">
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
                New Password
              </label>
              <input
                id="password"
                type="password"
                className="form-control"
                value={password}
                onChange={({ target }) => setPassword(target.value)}
                required
              />
            </div>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              Close
            </button>
            <button
              type="button"
              className="btn btn-primary"
              data-bs-dismiss="modal"
              onClick={handleClick}
            >
              Save changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateUserModal;
