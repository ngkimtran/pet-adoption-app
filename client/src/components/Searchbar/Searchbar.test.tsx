import "@testing-library/jest-dom";
import { render, screen, waitFor } from "../../utilities/testUtilities";
import Searchbar from "./Searchbar";
import { GET_ANIMALS } from "../../queries/animalQueries";
import userEvent from "@testing-library/user-event";

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

describe("<Suggestion />", () => {
  describe("rendering", () => {
    test("shows the correct content", () => {
      render(<Searchbar />, {
        wrapperProps: {
          apolloMocks,
        },
      });

      expect(screen.getByTestId("searchbarInput")).toBeInTheDocument();
      expect(screen.getByTestId("searchbarBtn")).toBeInTheDocument();
    });
  });

  describe("typing into the input", () => {
    test("shows available suggestion", async () => {
      render(<Searchbar />, {
        wrapperProps: {
          apolloMocks,
        },
      });

      userEvent.type(screen.getByTestId("searchbarInput"), mockAnimals[0].name);

      expect(await screen.findByText(mockAnimals[0].name)).toBeInTheDocument();
      expect(screen.queryByText(mockAnimals[1].name)).not.toBeInTheDocument();
    });

    test("shows no suggestion", async () => {
      render(<Searchbar />, {
        wrapperProps: {
          apolloMocks,
        },
      });

      userEvent.type(screen.getByTestId("searchbarInput"), "test");

      expect(await screen.findByText("No animal found.")).toBeInTheDocument();
      expect(screen.queryByText(mockAnimals[0].name)).not.toBeInTheDocument();
      expect(screen.queryByText(mockAnimals[1].name)).not.toBeInTheDocument();
    });

    test("shows all animals", async () => {
      render(<Searchbar />, {
        wrapperProps: {
          apolloMocks,
        },
      });

      userEvent.type(screen.getByTestId("searchbarInput"), mockAnimals[0].name);
      userEvent.clear(screen.getByTestId("searchbarInput"));

      expect(await screen.findByText(mockAnimals[0].name)).toBeInTheDocument();
      expect(await screen.findByText(mockAnimals[1].name)).toBeInTheDocument();
    });
  });

  describe("clicking on any animal", () => {
    test("navigates to the pet list", async () => {
      render(<Searchbar />, {
        wrapperProps: {
          apolloMocks,
        },
      });

      userEvent.click(screen.getByTestId("searchbarInput"));
      userEvent.click(await screen.findByText(mockAnimals[0].name));

      await waitFor(
        async () => await new Promise((res) => setTimeout(res, 500)),
        { timeout: 600 }
      );

      expect(
        await screen.findByDisplayValue(mockAnimals[0].name)
      ).toBeInTheDocument();
      expect(mockUseNavigate).toHaveBeenCalledTimes(1);
    });
  });

  describe("clicking on search button", () => {
    test("navigates", async () => {
      render(<Searchbar />, {
        wrapperProps: {
          apolloMocks,
        },
      });

      await waitFor(
        async () => await new Promise((res) => setTimeout(res, 500)),
        { timeout: 600 }
      );

      userEvent.click(screen.getByTestId("searchbarBtn"));

      expect(mockUseNavigate).toHaveBeenCalledTimes(1);
    });
  });
});
