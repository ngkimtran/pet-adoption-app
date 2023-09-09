import "@testing-library/jest-dom";
import { render, screen } from "../../utilities/testUtilities";
import Slider from "./Slider";
import { GET_ANIMALS } from "../../queries/animalQueries";

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
];

describe("<Error>", () => {
  describe("when rendering", () => {
    test("shows the correct content", () => {
      render(<Slider />, { wrapperProps: { apolloMocks } });

      expect(
        screen.getByText(
          "Pets are not our whole life, but they make our lives whole."
        )
      ).toBeInTheDocument();
      expect(
        screen.getByPlaceholderText("Which animal are you looking for?")
      ).toBeInTheDocument();
    });
  });
});
