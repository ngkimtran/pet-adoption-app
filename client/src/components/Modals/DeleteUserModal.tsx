import { useMutation, ApolloConsumer, ApolloClient } from "@apollo/client";
import { useRecoilState } from "recoil";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { tokenState, userState } from "../../states/state";
import { DELETE_USER } from "../../mutations/userMutations";
import { ERROR_TOAST_ID } from "../../constants/constants";

const DeleteUserModal = () => {
  const [user, setUser] = useRecoilState(userState);
  const [, setToken] = useRecoilState(tokenState);

  const navigate = useNavigate();

  const [deleteUser] = useMutation(DELETE_USER, {
    onError: (error) => {
      toast.error(error.graphQLErrors[0].message, {
        toastId: ERROR_TOAST_ID,
        position: toast.POSITION.TOP_CENTER,
        theme: "colored",
        hideProgressBar: true,
      });
    },
  });

  const handleClick = async (client: ApolloClient<object>) => {
    deleteUser({
      variables: { id: user?.id },
      onCompleted: () => {
        setToken(null);
        setUser(null);
        localStorage.clear();
        client.resetStore();
        setTimeout(() => navigate("/"), 50);
      },
    });
  };

  return (
    <ApolloConsumer>
      {(client) => (
        <div
          className="modal fade"
          id="deleteUserModal"
          tabIndex={-1}
          aria-labelledby="deleteUserModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="deleteUserModalLabel">
                  Are you sure you want to delete your account?
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">
                <p className="m-0">
                  Doing so will permanently delete your account from our
                  database.
                </p>
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
                  className="btn btn-danger"
                  data-bs-dismiss="modal"
                  onClick={() => handleClick(client)}
                >
                  Confirm Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </ApolloConsumer>
  );
};

export default DeleteUserModal;
