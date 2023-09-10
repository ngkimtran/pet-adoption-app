import "@testing-library/jest-dom";
import { render, screen, waitFor } from "../../utilities/testUtilities";
import UpdateUserModal from "./UpdateUserModal";
import userEvent from "@testing-library/user-event";
import { ROLE } from "../../constants/constants";
import { UPDATE_USER } from "../../mutations/userMutations";

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

const mockUpdatedUser = {
  id: "64e5ac7a01d3744da5a883e0",
  username: "mluuka2",
  firstname: "Luuka",
  lastname: "Mattinen",
  email: "lm@gmail.com",
  password: "",
};

const apolloMocks = [
  {
    request: {
      query: UPDATE_USER,
      variables: mockUpdatedUser,
    },
    result: {
      data: {
        updateUser: mockUser,
      },
    },
  },
];

describe("<UpdateUserModal />", () => {
  describe("rendering", () => {
    test("shows the correct content", () => {
      render(<UpdateUserModal />, {
        wrapperProps: { apolloMocks, mockUserState: mockUser },
      });

      expect(screen.getByText("Update personal profile")).toBeInTheDocument();
      expect(screen.getByText("Username")).toBeInTheDocument();
      expect(screen.getByDisplayValue(mockUser.username)).toBeInTheDocument();
      expect(screen.getByText("Firstname")).toBeInTheDocument();
      expect(screen.getByDisplayValue(mockUser.firstname)).toBeInTheDocument();
      expect(screen.getByText("Lastname")).toBeInTheDocument();
      expect(screen.getByDisplayValue(mockUser.lastname)).toBeInTheDocument();
      expect(screen.getByText("Email address")).toBeInTheDocument();
      expect(screen.getByDisplayValue(mockUser.email)).toBeInTheDocument();
      expect(screen.getByText("New Password")).toBeInTheDocument();
      expect(screen.getByDisplayValue("")).toBeInTheDocument();
      expect(screen.getByText("Close")).toBeInTheDocument();
      expect(screen.getByText("Save changes")).toBeInTheDocument();
    });
  });

  describe("updating an user", () => {
    test("works as expected", async () => {
      render(<UpdateUserModal />, {
        wrapperProps: { apolloMocks, mockUserState: mockUser },
      });

      const usernameField = screen.getByDisplayValue(mockUser.username);

      userEvent.clear(usernameField);
      userEvent.type(usernameField, mockUpdatedUser.username);
      userEvent.click(screen.getByText("Save changes"));
    });
  });
});
