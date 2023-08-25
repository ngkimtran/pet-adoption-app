import { useState, useEffect } from "react";
import { useLazyQuery, useMutation, useQuery } from "@apollo/client";
import { toast } from "react-toastify";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { User } from "../../types/types";
import { GET_USER, GET_USERS } from "../../queries/userQueries";
import Loader from "../Loader/Loader";
import Error from "../Error/Error";
import {
  ERROR_TOAST_ID,
  Role,
  SUCCESS_TOAST_ID,
} from "../../constants/constants";
import { UPDATE_ROLE } from "../../mutations/userMutations";

const UsersManagement = () => {
  const [searchInput, setSearchInput] = useState<string>("");
  const [userList, setUserList] = useState<User[]>([]);

  const usersQueryResult = useQuery(GET_USERS);
  const [getUser, userQueryResult] = useLazyQuery(GET_USER);
  const [updateRole] = useMutation(UPDATE_ROLE, {
    update: (cache, response) => {
      cache.updateQuery(
        {
          query: GET_USERS,
        },
        () => setUserList(response.data.updateRole)
      );
    },
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

  useEffect(() => {
    const fetchData = async () => {
      if (
        !usersQueryResult.loading &&
        !usersQueryResult.error &&
        usersQueryResult.data
      )
        setUserList(usersQueryResult.data.users);
      if (
        !userQueryResult.loading &&
        !userQueryResult.error &&
        userQueryResult.data
      )
        setUserList([userQueryResult.data.user]);
      if (searchInput.length > 0 && !userQueryResult.data) setUserList([]);
    };
    fetchData();
  }, [userQueryResult, usersQueryResult]); //eslint-disable-line

  return (
    <>
      {usersQueryResult.loading && <Loader />}
      {usersQueryResult.error && <Error />}
      {userList && (
        <>
          <div className="p-3 mt-3 mb-5 d-flex w-100 justify-content-between align-items-center">
            <h3 className="fw-bold text-secondary" style={{ flex: "0.4" }}>
              List of users
            </h3>
            <div
              className="d-flex gap-4 w-100 justify-content-end align-items-center"
              style={{ flex: "0.7" }}
            >
              <div className="input-group" style={{ flex: "0.6" }}>
                <input
                  type="text"
                  className="form-control"
                  value={searchInput}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setSearchInput(e.target.value)
                  }
                  placeholder="Search for username"
                />
                <button
                  className="btn btn-primary"
                  type="button"
                  onClick={async () =>
                    await getUser({
                      variables: { username: searchInput },
                    })
                  }
                >
                  <FaMagnifyingGlass className="fs-5" />
                </button>
              </div>
            </div>
          </div>

          <table className="table table-hover">
            <thead>
              <tr>
                <th scope="col" className="p-3">
                  ID
                </th>
                <th scope="col" className="p-3">
                  Full Name
                </th>
                <th scope="col" className="p-3">
                  Username
                </th>
                <th scope="col" className="p-3">
                  Email
                </th>
                <th scope="col" className="p-3">
                  Role
                </th>
              </tr>
            </thead>
            <tbody>
              {userQueryResult.loading && (
                <tr>
                  <td colSpan={5}>
                    <Loader />
                  </td>
                </tr>
              )}
              {!userQueryResult.loading &&
                userQueryResult.error &&
                userList.length === 0 &&
                searchInput.length > 0 && (
                  <tr>
                    <td
                      colSpan={5}
                      className="p-5 text-center m-auto fw-bold fs-3 text-secondary"
                    >
                      No user found
                    </td>
                  </tr>
                )}
              {!userQueryResult.loading &&
                userList.length > 0 &&
                userList.map((user: User) => (
                  <tr key={user.id}>
                    <td className="p-3">{user.id}</td>
                    <td className="text-capitalize p-3">
                      {user.firstname} {user.lastname}
                    </td>
                    <td className="p-3">{user.username}</td>
                    <td className="p-3">{user.email}</td>
                    <td className="p-3">
                      <select
                        className="form-select"
                        defaultValue={user.role}
                        onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                          updateRole({
                            variables: { id: user.id, role: e.target.value },
                          })
                        }
                      >
                        <option value={Role.ADMIN}>{Role.ADMIN}</option>
                        <option value={Role.USER}>{Role.USER}</option>
                      </select>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </>
      )}
    </>
  );
};

export default UsersManagement;
