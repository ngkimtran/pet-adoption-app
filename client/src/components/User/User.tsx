import { useRecoilState } from "recoil";
import { AiFillEdit } from "react-icons/ai";
import { BsFillTrashFill } from "react-icons/bs";
import UserDetailsItem from "../UserDetailsItem/UserDetailsItem";
import UpdateUserModal from "../Modals/UpdateUserModal";
import DeleteUserModal from "../Modals/DeleteUserModal";
import { userState } from "../../states/state";

const User = () => {
  const [user] = useRecoilState(userState);

  return (
    <>
      {user && (
        <div
          style={{ minHeight: "50vh" }}
          className="container m-auto my-5 p-0"
        >
          <div className="d-flex flex-column gap-4 align-items-stretch rounded shadow bg-white">
            <div className="background-primary p-5 rounded-top">
              <h1 className="text-white">My Profile</h1>
            </div>
            <div className="m-5 d-flex flex-column gap-3">
              <UpdateUserModal />
              <DeleteUserModal />

              <UserDetailsItem text={"First name"} value={user.firstname} />
              <UserDetailsItem text={"Last name"} value={user.lastname} />
              <UserDetailsItem text={"Username"} value={user.username} />
              <UserDetailsItem text={"Email"} value={user.email} />

              <div className="d-flex m-5 gap-5">
                <button
                  className="btn btn-primary px-3 py-2"
                  data-bs-toggle="modal"
                  data-bs-target="#updateUserModal"
                >
                  <AiFillEdit className="fs-3 me-2" /> Edit information
                </button>
                <button
                  className="btn btn-danger px-3 py-2"
                  data-bs-toggle="modal"
                  data-bs-target="#deleteUserModal"
                >
                  <BsFillTrashFill className="fs-4 me-2" /> Delete acount
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default User;
