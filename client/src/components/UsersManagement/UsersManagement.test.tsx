import "@testing-library/jest-dom";
import { render, screen } from "../../utilities/testUtilities";
import { ROLE } from "../../constants/constants";
import UsersManagement from "./UsersManagement";
import { GET_USER, GET_USERS } from "../../queries/userQueries";
import { GraphQLError } from "graphql";
import userEvent from "@testing-library/user-event";

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

const mockUsers = [
  mockUserState,
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
      query: GET_USERS,
    },
    result: {
      data: {
        users: mockUsers,
      },
    },
  },
  {
    request: {
      query: GET_USER,
      variables: {
        username: mockUsers[1].username,
      },
    },
    result: {
      data: {
        user: mockUsers[1],
      },
    },
  },
  {
    request: {
      query: GET_USER,
      variables: {
        username: "test",
      },
    },
    result: {
      errors: [
        new GraphQLError("Cannot read property '_id' of null", {
          extensions: { code: "INTERNAL_SERVER_ERROR" },
        }),
      ],
    },
  },
];

describe("<UsersManagement />", () => {
  describe("when logged in user is admin", () => {
    describe("rendering", () => {
      test("shows the correct content", async () => {
        render(<UsersManagement />, {
          wrapperProps: { apolloMocks, mockUserState },
        });

        expect(await screen.findByText("List of users")).toBeInTheDocument();
        expect(
          await screen.findByPlaceholderText("Search for username")
        ).toBeInTheDocument();

        expect(await screen.findByText("ID")).toBeInTheDocument();
        expect(await screen.findByText("Full Name")).toBeInTheDocument();
        expect(await screen.findByText("Username")).toBeInTheDocument();
        expect(await screen.findByText("Email")).toBeInTheDocument();
        expect(await screen.findByText("Role")).toBeInTheDocument();
        expect(await screen.findAllByTestId("userManagementRow")).toHaveLength(
          mockUsers.length
        );
      });
    });

    describe("searching for username", () => {
      describe("when username is available in the database", () => {
        test("shows the correct content", async () => {
          render(<UsersManagement />, {
            wrapperProps: { apolloMocks, mockUserState },
          });

          userEvent.type(
            await screen.findByPlaceholderText("Search for username"),
            mockUsers[1].username
          );
          userEvent.click(await screen.findByTestId("searchUserNameBtn"));

          expect(
            await screen.findAllByTestId("userManagementRow")
          ).toHaveLength(1);
          expect(
            await screen.findByText(mockUsers[1].username)
          ).toBeInTheDocument();
        });
      });

      describe("when username is not available in the database", () => {
        test("shows the correct content", async () => {
          render(<UsersManagement />, {
            wrapperProps: {
              apolloMocks: [apolloMocks[0], apolloMocks[2]],
              mockUserState,
            },
          });

          userEvent.type(
            await screen.findByPlaceholderText("Search for username"),
            "test"
          );
          userEvent.click(await screen.findByTestId("searchUserNameBtn"));

          expect(await screen.findByText("No user found")).toBeInTheDocument();
        });
      });
    });
  });
});
