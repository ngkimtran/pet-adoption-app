import "@testing-library/jest-dom";
import { render, screen } from "../../utilities/testUtilities";
import Header from "./Header";
import userEvent from "@testing-library/user-event";
import { ROLE } from "../../constants/constants";
import { GET_ANIMALS } from "../../queries/animalQueries";

const mockUseNavigate = jest.fn();

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockUseNavigate,
}));

const mockAnimals = [
  {
    id: "64d0d112a88a7b265940ae64",
    name: "cat",
    petCount: 2,
    __typename: "Animal",
  },
  {
    id: "64e749a3d58d5398e13a1756",
    name: "dog",
    petCount: 0,
    __typename: "Animal",
  },
];

const mockUserState = {
  id: "64e5ac7a01d3744da5a883e0",
  username: "mluuka",
  firstname: "Luuka",
  lastname: "Mattinen",
  email: "lm@gmail.com",
  role: ROLE.USER,
  favorites: [],
  __typename: "User",
};

const mockAdminState = {
  id: "64e5ac7a01d3744da5a883e0",
  username: "mluuka",
  firstname: "Luuka",
  lastname: "Mattinen",
  email: "lm@gmail.com",
  role: ROLE.ADMIN,
  favorites: [],
  __typename: "User",
};

const mockTokenState = JSON.stringify({
  token: "testToken",
});

const apolloMocks = [
  {
    request: {
      query: GET_ANIMALS,
    },
    result: {
      data: {
        animals: mockAnimals,
      },
    },
  },
];

describe("<Header />", () => {
  describe("rendering", () => {
    test("shows the correct content", () => {
      render(<Header />, {
        wrapperProps: { apolloMocks },
      });

      expect(screen.getByText("Pet Adoption")).toBeInTheDocument();
      expect(screen.getByText("Home")).toBeInTheDocument();
      expect(screen.getByText("About us")).toBeInTheDocument();
      expect(screen.getByText("Find a pet")).toBeInTheDocument();
      expect(screen.getByText("Adopt a pet")).toBeInTheDocument();
    });
  });

  describe("navigation bar links", () => {
    test("links to the correct page", () => {
      render(<Header />, {
        wrapperProps: { apolloMocks },
      });

      expect(screen.getByText("Home").getAttribute("href")).toBe(
        "/pet-adoption-app"
      );
      expect(screen.getByText("About us").getAttribute("href")).toBe(
        "/pet-adoption-app/about"
      );
      expect(screen.getByText("Adopt a pet").getAttribute("href")).toBe(
        "/pet-adoption-app/adopt"
      );
    });
  });

  describe("clicking on Find a pet", () => {
    test("shows list of animals", () => {
      render(<Header />, {
        wrapperProps: { apolloMocks },
      });

      userEvent.click(screen.getByText("Find a pet"));

      mockAnimals.map(async (animal) => {
        const animalEl = await screen.findByText(animal.name);
        expect(animalEl).toBeInTheDocument();
        expect(animalEl.getAttribute("href")).toBe(
          `/pet-adoption-app/browse-pets/${animal.name}`
        );
      });
    });
  });

  describe("when user is not logged in", () => {
    test("shows the correct content", () => {
      render(<Header />, {
        wrapperProps: { apolloMocks },
      });

      expect(screen.getByText("Log in")).toBeInTheDocument();
      expect(screen.getByText("Register")).toBeInTheDocument();
    });

    test("shows links to login and resgister pages", () => {
      render(<Header />, {
        wrapperProps: { apolloMocks },
      });

      expect(screen.getByText("Log in").getAttribute("href")).toBe(
        "/pet-adoption-app/login"
      );
      expect(screen.getByText("Register").getAttribute("href")).toBe(
        "/pet-adoption-app/register"
      );
    });
  });

  describe("when user is logged in", () => {
    describe("and user have USER role", () => {
      test("shows the correct content", () => {
        render(<Header />, {
          wrapperProps: { apolloMocks, mockUserState, mockTokenState },
        });

        expect(screen.getByTestId("userIcon")).toBeInTheDocument();
      });

      describe("clicking on user icon", () => {
        test("shows the correct content", () => {
          render(<Header />, {
            wrapperProps: { apolloMocks, mockUserState, mockTokenState },
          });

          userEvent.click(screen.getByTestId("userIcon"));

          expect(
            screen.getByText(
              `Hello, ${mockUserState.firstname} ${mockUserState.lastname}`
            )
          ).toBeInTheDocument();
          expect(screen.getByText("Profile")).toBeInTheDocument();
          expect(screen.getByText("Favorite pets")).toBeInTheDocument();
          expect(screen.getByText("Log out")).toBeInTheDocument();
        });

        test("shows the correct links", () => {
          render(<Header />, {
            wrapperProps: { apolloMocks, mockUserState, mockTokenState },
          });

          userEvent.click(screen.getByTestId("userIcon"));

          expect(screen.getByText("Profile").getAttribute("href")).toBe(
            `/pet-adoption-app/${mockUserState.id}`
          );
          expect(screen.getByText("Favorite pets").getAttribute("href")).toBe(
            `/pet-adoption-app/${mockUserState.id}/favorites`
          );
        });
      });
    });

    describe("and user have ADMIN role", () => {
      test("shows the correct content", () => {
        render(<Header />, {
          wrapperProps: {
            apolloMocks,
            mockUserState: mockAdminState,
            mockTokenState,
          },
        });

        expect(screen.getByTestId("userIcon")).toBeInTheDocument();
      });

      describe("clicking on user icon", () => {
        test("shows the correct content", () => {
          render(<Header />, {
            wrapperProps: {
              apolloMocks,
              mockUserState: mockAdminState,
              mockTokenState,
            },
          });

          userEvent.click(screen.getByTestId("userIcon"));

          expect(
            screen.getByText(
              `Hello, ${mockUserState.firstname} ${mockUserState.lastname}`
            )
          ).toBeInTheDocument();
          expect(screen.getByText("Profile")).toBeInTheDocument();
          expect(screen.getByText("Admin panel")).toBeInTheDocument();
          expect(screen.getByText("Log out")).toBeInTheDocument();
        });

        test("shows the correct links", () => {
          render(<Header />, {
            wrapperProps: {
              apolloMocks,
              mockUserState: mockAdminState,
              mockTokenState,
            },
          });

          userEvent.click(screen.getByTestId("userIcon"));

          expect(screen.getByText("Profile").getAttribute("href")).toBe(
            `/pet-adoption-app/${mockUserState.id}`
          );
          expect(screen.getByText("Admin panel").getAttribute("href")).toBe(
            `/pet-adoption-app/${mockUserState.id}/admin-panel`
          );
        });
      });
    });

    describe("and user clicks Log out", () => {
      test("handles log out", () => {
        const mockClear = jest.fn();

        Object.defineProperty(window, "localStorage", {
          value: {
            clear: mockClear,
          },
          writable: true,
        });

        render(<Header />, {
          wrapperProps: { apolloMocks, mockUserState, mockTokenState },
        });

        userEvent.click(screen.getByTestId("userIcon"));
        userEvent.click(screen.getByText("Log out"));

        expect(mockClear).toHaveBeenCalledTimes(1);
        expect(mockUseNavigate).toHaveBeenCalledTimes(1);
      });
    });
  });
});
