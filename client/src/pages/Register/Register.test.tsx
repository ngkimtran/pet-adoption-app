import "@testing-library/jest-dom";
import { render, screen, waitFor } from "../../utilities/testUtilities";
import Register from "./Register";
import { ROLE } from "../../constants/constants";
import userEvent from "@testing-library/user-event";
import { ADD_USER } from "../../mutations/userMutations";

const mockUseNavigate = jest.fn();

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockUseNavigate,
}));

const mockPassword = "test";
const mockPasswordHash = "testHash";

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
      query: ADD_USER,
      variables: {
        username: mockUserState.username,
        password: mockPassword,
        firstname: mockUserState.firstname,
        lastname: mockUserState.lastname,
        email: mockUserState.email,
      },
    },
    result: {
      data: {
        addUser: { ...mockUserState, password: mockPasswordHash },
      },
    },
  },
];

describe("<Register />", () => {
  describe("rendering", () => {
    test("shows the correct content", () => {
      render(<Register />);

      expect(screen.getAllByText("Register")).toHaveLength(2);
      expect(screen.getByText("Username")).toBeInTheDocument();
      expect(screen.getByText("Firstname")).toBeInTheDocument();
      expect(screen.getByText("Lastname")).toBeInTheDocument();
      expect(screen.getByText("Email address")).toBeInTheDocument();
      expect(screen.getByText("Password")).toBeInTheDocument();
      expect(screen.getByText("Already have an account?")).toBeInTheDocument();
      expect(screen.getByText("Login")).toBeInTheDocument();
      expect(screen.getByText("Login").getAttribute("href")).toBe(
        "/pet-adoption-app/login"
      );
    });
  });

  describe("registering", () => {
    test("calls the correct functions", async () => {
      render(<Register />, {
        wrapperProps: {
          apolloMocks,
        },
      });

      userEvent.type(screen.getByText("Username"), mockUserState.username);
      userEvent.type(screen.getByText("Firstname"), mockUserState.firstname);
      userEvent.type(screen.getByText("Lastname"), mockUserState.lastname);
      userEvent.type(screen.getByText("Email address"), mockUserState.email);
      userEvent.type(screen.getByText("Password"), mockPassword);
      userEvent.click(screen.getAllByText("Register")[1]);

      await waitFor(
        async () => await new Promise((res) => setTimeout(res, 2000)),
        {
          timeout: 2100,
        }
      );

      await waitFor(() => expect(mockUseNavigate).toHaveBeenCalledTimes(1));
    });
  });
});
