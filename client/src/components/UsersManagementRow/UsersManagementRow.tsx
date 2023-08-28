import React from "react";
import { User } from "../../types/types";
import { useMutation } from "@apollo/client";
import { UPDATE_ROLE } from "../../mutations/userMutations";
import { GET_USERS } from "../../queries/userQueries";
import { toast } from "react-toastify";
import {
  ERROR_TOAST_ID,
  SUCCESS_TOAST_ID,
  ROLE,
} from "../../constants/constants";

type UsersManagementRowPropType = {
  user: User;
  setUserList: Function;
};

const UsersManagementRow = ({
  user,
  setUserList,
}: UsersManagementRowPropType) => {
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

  return (
    <tr>
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
          <option value={ROLE.ADMIN}>{ROLE.ADMIN}</option>
          <option value={ROLE.USER}>{ROLE.USER}</option>
        </select>
      </td>
    </tr>
  );
};

export default UsersManagementRow;
