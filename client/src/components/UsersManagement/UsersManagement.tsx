import { useState, useEffect } from "react";
import { useLazyQuery, useQuery } from "@apollo/client";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { User } from "../../types/types";
import { GET_USER, GET_USERS } from "../../queries/userQueries";
import Loader from "../Loader/Loader";
import Error from "../Error/Error";
import UsersManagementRow from "../UsersManagementRow/UsersManagementRow";

const UsersManagement = () => {
  const [searchInput, setSearchInput] = useState<string>("");
  const [userList, setUserList] = useState<User[]>([]);

  const usersQueryResult = useQuery(GET_USERS, { fetchPolicy: "no-cache" });
  const [getUser, userQueryResult] = useLazyQuery(GET_USER, {
    fetchPolicy: "no-cache",
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
    <div className="w-100">
      {usersQueryResult.loading && <Loader />}
      {usersQueryResult.error && <Error />}
      {!usersQueryResult.loading && !usersQueryResult.error && userList && (
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
                  data-testid="searchUserNameBtn"
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
                  <UsersManagementRow
                    key={user.id}
                    user={user}
                    setUserList={setUserList}
                  />
                ))}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
};

export default UsersManagement;
