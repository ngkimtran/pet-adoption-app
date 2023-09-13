import "@testing-library/jest-dom";
import { render, screen } from "../../utilities/testUtilities";
import Admin from "./Admin";
import { ROLE } from "../../constants/constants";
import userEvent from "@testing-library/user-event";

const mockUseNavigate = jest.fn();

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockUseNavigate,
}));

jest.mock(
  "../../components/AnimalsManagement/AnimalsManagement.tsx",
  () => () => <div>AnimalsManagement</div>
);

jest.mock("../../components/PetsManagement/PetsManagement.tsx", () => () => (
  <div>PetsManagement</div>
));

jest.mock("../../components/UsersManagement/UsersManagement.tsx", () => () => (
  <div>UsersManagement</div>
));

const mockUserState = {
  id: "64e5ac7a01d3744da5a883e0",
  username: "mluuka",
  firstname: "Luuka",
  lastname: "Mattinen",
  email: "lm@gmail.com",
  favorites: [],
  __typename: "User",
};

describe("<Admin />", () => {
  describe("when user is not admin", () => {
    test("automatically navigate to homepage", () => {
      render(<Admin />, {
        wrapperProps: {
          mockUserState: { ...mockUserState, role: ROLE.USER },
        },
      });
      expect(mockUseNavigate).toHaveBeenCalledTimes(1);
    });
  });

  describe("when user is admin", () => {
    describe("rendering", () => {
      test("shows the correct content", () => {
        render(<Admin />, {
          wrapperProps: {
            mockUserState: { ...mockUserState, role: ROLE.ADMIN },
          },
        });

        expect(screen.getByText("Animals management")).toBeInTheDocument();
        expect(screen.getByText("Pets management")).toBeInTheDocument();
        expect(screen.getByText("Users management")).toBeInTheDocument();
        expect(
          screen.getByText(
            "Choose a category from the navigation panel on the left"
          )
        ).toBeInTheDocument();
      });
    });

    describe("clicking on Animals management", () => {
      test("shows the correct content", async () => {
        render(<Admin />, {
          wrapperProps: {
            mockUserState: { ...mockUserState, role: ROLE.ADMIN },
          },
        });

        userEvent.click(screen.getByText("Animals management"));

        expect(
          await screen.findByText("AnimalsManagement")
        ).toBeInTheDocument();
        expect(
          screen.queryByText(
            "Choose a category from the navigation panel on the left"
          )
        ).not.toBeInTheDocument();
      });
    });

    describe("clicking on Pets management", () => {
      test("shows the correct content", async () => {
        render(<Admin />, {
          wrapperProps: {
            mockUserState: { ...mockUserState, role: ROLE.ADMIN },
          },
        });

        userEvent.click(screen.getByText("Pets management"));

        expect(await screen.findByText("PetsManagement")).toBeInTheDocument();
        expect(
          screen.queryByText(
            "Choose a category from the navigation panel on the left"
          )
        ).not.toBeInTheDocument();
      });
    });

    describe("clicking on Users management", () => {
      test("shows the correct content", async () => {
        render(<Admin />, {
          wrapperProps: {
            mockUserState: { ...mockUserState, role: ROLE.ADMIN },
          },
        });

        userEvent.click(screen.getByText("Users management"));

        expect(await screen.findByText("UsersManagement")).toBeInTheDocument();
        expect(
          screen.queryByText(
            "Choose a category from the navigation panel on the left"
          )
        ).not.toBeInTheDocument();
      });
    });
  });
});
