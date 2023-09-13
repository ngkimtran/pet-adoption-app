import "@testing-library/jest-dom";
import { render, screen, waitFor } from "../../utilities/testUtilities";
import Login from "./Login";
import { ROLE } from "../../constants/constants";
import userEvent from "@testing-library/user-event";
import { LOGIN } from "../../mutations/userMutations";

const mockUseNavigate = jest.fn();

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockUseNavigate,
}));

const mockPassword = "test";

const mockUserState = {
  id: "64e5ac7a01d3744da5a883e0",
  username: "mluuka",
  firstname: "Luuka",
  lastname: "Mattinen",
  email: "lm@gmail.com",
  favorites: [],
  role: ROLE.USER,
  __typename: "User",
};

const apolloMocks = [
  {
    request: {
      query: LOGIN,
      variables: {
        username: mockUserState.username,
        password: mockPassword,
      },
    },
    result: {
      data: {
        login: JSON.stringify({ token: "test-token" }),
      },
    },
  },
];

describe("<Login />", () => {
  describe("rendering", () => {
    test("shows the correct content", () => {
      render(<Login />);

      expect(screen.getByText("Log In")).toBeInTheDocument();
      expect(screen.getByText("Username")).toBeInTheDocument();
      expect(screen.getByText("Password")).toBeInTheDocument();
      expect(screen.getByText("Log in")).toBeInTheDocument();
      expect(screen.getByText("Forgot your password?")).toBeInTheDocument();
      expect(screen.getByText("Need an account?")).toBeInTheDocument();
      expect(screen.getByText("Register now")).toBeInTheDocument();
      expect(screen.getByText("Register now").getAttribute("href")).toBe(
        "/pet-adoption-app/register"
      );
    });
  });

  describe("logging in", () => {
    test("calls the correct functions", async () => {
      const mockClear = jest.fn();
      const mockSetItem = jest.fn();

      Object.defineProperty(window, "localStorage", {
        value: {
          clear: mockClear,
          setItem: mockSetItem,
        },
        writable: true,
      });

      render(<Login />, {
        wrapperProps: {
          apolloMocks,
        },
      });

      userEvent.type(screen.getByText("Username"), mockUserState.username);
      userEvent.type(screen.getByText("Password"), mockPassword);
      userEvent.click(screen.getByText("Log in"));

      await waitFor(() => expect(mockClear).toHaveBeenCalledTimes(1));
      await waitFor(() => expect(mockSetItem).toHaveBeenCalledTimes(1));
      await waitFor(() => expect(mockUseNavigate).toHaveBeenCalledTimes(1));
    });
  });
});
