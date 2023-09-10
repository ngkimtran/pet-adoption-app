import "@testing-library/jest-dom";
import {
  fireEvent,
  render,
  screen,
  waitFor,
} from "../../utilities/testUtilities";
import { ROLE } from "../../constants/constants";
import UsersManagementRow from "./UsersManagementRow";
import { UPDATE_ROLE } from "../../mutations/userMutations";

const mockUsers = [
  {
    id: "64e5ac7a01d3744da5a883e2",
    username: "kt",
    firstname: "Kathie",
    lastname: "Tulunen",
    email: "lm@gmail.com",
    role: ROLE.USER,
    favorites: [],
    __typename: "User",
  },
];

const apolloMocks = [
  {
    request: {
      query: UPDATE_ROLE,
      variables: {
        id: mockUsers[0].id,
        role: ROLE.ADMIN,
      },
    },
    result: {
      data: {
        updateRole: {
          id: "64e5ac7a01d3744da5a883e2",
          username: "kt",
          firstname: "Kathie",
          lastname: "Tulunen",
          email: "lm@gmail.com",
          role: ROLE.ADMIN,
          favorites: [],
          __typename: "User",
        },
      },
    },
  },
];

const mockSetUserList = jest.fn();

describe("<UsersManagementRow />", () => {
  describe("rendering", () => {
    test("shows the correct content", () => {
      render(
        <table>
          <tbody>
            <UsersManagementRow
              user={mockUsers[0]}
              setUserList={mockSetUserList}
            />
          </tbody>
        </table>,
        { wrapperProps: { apolloMocks } }
      );

      expect(
        screen.getByText(`${mockUsers[0].firstname} ${mockUsers[0].lastname}`)
      ).toBeInTheDocument();
      expect(screen.getByText(mockUsers[0].username)).toBeInTheDocument();
      expect(screen.getByText(mockUsers[0].email)).toBeInTheDocument();
      expect(screen.getByText(mockUsers[0].role)).toBeInTheDocument();
    });
  });

  describe("changing user role", () => {
    test("update the user role correctly", async () => {
      render(
        <table>
          <tbody>
            <UsersManagementRow
              user={mockUsers[0]}
              setUserList={mockSetUserList}
            />
          </tbody>
        </table>,
        { wrapperProps: { apolloMocks } }
      );

      fireEvent.change(screen.getByTestId("userRoleSelect"), {
        target: { value: ROLE.ADMIN },
      });

      await waitFor(() => {
        expect(mockSetUserList).toHaveBeenCalledTimes(0);
      });
    });
  });
});
