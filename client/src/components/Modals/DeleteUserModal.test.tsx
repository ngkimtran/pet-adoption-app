import "@testing-library/jest-dom";
import { render, screen, waitFor } from "../../utilities/testUtilities";
import DeleteUserModal from "./DeleteUserModal";
import userEvent from "@testing-library/user-event";
import { ROLE } from "../../constants/constants";
import { DELETE_USER } from "../../mutations/userMutations";

const mockUseNavigate = jest.fn();

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockUseNavigate,
}));

const mockUser = {
  id: "64e5ac7a01d3744da5a883e0",
  username: "mluuka",
  firstname: "Luuka",
  lastname: "Mattinen",
  email: "lm@gmail.com",
  role: ROLE.ADMIN,
  favorites: [],
  __typename: "User",
};

const apolloMocks = [
  {
    request: {
      query: DELETE_USER,
      variables: {
        id: mockUser.id,
      },
    },
    result: {
      data: {
        deleteUser: mockUser,
      },
    },
  },
];

describe("<DeleteUserModal />", () => {
  describe("rendering", () => {
    test("shows the correct content", () => {
      render(<DeleteUserModal />);

      expect(
        screen.getByText("Are you sure you want to delete your account?")
      ).toBeInTheDocument();
      expect(
        screen.getByText(
          "Doing so will permanently delete your account from our database."
        )
      ).toBeInTheDocument();
      expect(screen.getByText("Close")).toBeInTheDocument();
      expect(screen.getByText("Confirm Delete")).toBeInTheDocument();
    });
  });

  describe("deleting an user", () => {
    test("updates user list", async () => {
      const mockClear = jest.fn();

      Object.defineProperty(window, "localStorage", {
        value: {
          clear: mockClear,
        },
        writable: true,
      });

      render(<DeleteUserModal />, {
        wrapperProps: { apolloMocks, mockUserState: mockUser },
      });

      userEvent.click(screen.getByText("Confirm Delete"));

      await waitFor(() => expect(mockClear).toHaveBeenCalledTimes(1));
      await waitFor(() => expect(mockUseNavigate).toHaveBeenCalledTimes(1));
    });
  });
});
