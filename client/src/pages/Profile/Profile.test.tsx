import "@testing-library/jest-dom";
import { render, screen } from "../../utilities/testUtilities";
import Profile from "./Profile";
import { ROLE } from "../../constants/constants";
import userEvent from "@testing-library/user-event";

jest.mock("../../components/modals/UpdateUserModal.tsx", () => () => (
  <div>UpdateUserModal</div>
));

jest.mock("../../components/modals/DeleteUserModal.tsx", () => () => (
  <div>DeleteUserModal</div>
));

const mockUserState = {
  id: "64e5ac7a01d3744da5a883e0",
  username: "mluuka",
  firstname: "Luuka",
  lastname: "Mattinen",
  email: "lm@gmail.com",
  role: ROLE.ADMIN,
  favorites: [],
  __typename: "User",
};

describe("<Profile />", () => {
  describe("rendering", () => {
    test("shows the correct content", () => {
      render(<Profile />, {
        wrapperProps: {
          mockUserState: mockUserState,
        },
      });

      expect(screen.getByText("First name")).toBeInTheDocument();
      expect(screen.getByText(mockUserState.firstname)).toBeInTheDocument();

      expect(screen.getByText("Last name")).toBeInTheDocument();
      expect(screen.getByText(mockUserState.lastname)).toBeInTheDocument();

      expect(screen.getByText("Username")).toBeInTheDocument();
      expect(screen.getByText(mockUserState.username)).toBeInTheDocument();

      expect(screen.getByText("Email")).toBeInTheDocument();
      expect(screen.getByText(mockUserState.email)).toBeInTheDocument();

      expect(screen.getByText("Edit information")).toBeInTheDocument();
      expect(screen.getByText("Delete account")).toBeInTheDocument();
    });
  });

  describe("clicking Edit information", () => {
    test("shows update user modal", async () => {
      render(<Profile />, {
        wrapperProps: {
          mockUserState: mockUserState,
        },
      });

      userEvent.click(screen.getByText("Edit information"));
      expect(await screen.findByText("UpdateUserModal")).toBeInTheDocument();
    });
  });

  describe("clicking Delete account", () => {
    test("shows the delete user modal", async () => {
      render(<Profile />, {
        wrapperProps: {
          mockUserState: mockUserState,
        },
      });

      userEvent.click(screen.getByText("Delete account"));
      expect(await screen.findByText("DeleteUserModal")).toBeInTheDocument();
    });
  });
});
