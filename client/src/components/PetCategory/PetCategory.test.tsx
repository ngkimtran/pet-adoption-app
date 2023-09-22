import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import { render, screen } from "../../utilities/testUtilities";
import PetCategory from "./PetCategory";
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
  {
    id: "64e749a3d58d5398e13a1754",
    name: "hamster",
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
];

describe("<PetCategory />", () => {
  describe("rendering", () => {
    test("shows the correct content", async () => {
      render(<PetCategory />, { wrapperProps: { apolloMocks } });

      expect(
        await screen.findByText("What kind of pets are you looking for?")
      ).toBeInTheDocument();
      expect(await screen.findByText("cat")).toBeVisible();
      expect(await screen.findByText("dog")).toBeVisible();
      expect(await screen.findByText("Other pets")).toBeVisible();
      expect(await screen.findByText("Find pets")).toBeVisible();
    });

    test("button is disabled", async () => {
      render(<PetCategory />, { wrapperProps: { apolloMocks } });

      expect(await screen.findByText("Find pets")).toBeDisabled();
    });
  });

  describe("choosing an animal type", () => {
    test("navigates to the correct page", async () => {
      render(<PetCategory />, { wrapperProps: { apolloMocks } });

      userEvent.click(await screen.findByText("cat"));
      userEvent.click(await screen.findByText("Find pets"));

      expect(mockUseNavigate).toHaveBeenCalledTimes(1);
    });
  });
});
