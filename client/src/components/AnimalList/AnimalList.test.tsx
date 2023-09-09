import "@testing-library/jest-dom";
import { render, screen } from "../../utilities/testUtilities";
import AnimalList from "./AnimalList";
import { GET_ANIMALS } from "../../queries/animalQueries";

const mockAnimals = [
  {
    id: "64d0d112a88a7b265940ae64",
    name: "cat",
    petCount: 2,
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

describe("<AnimalList />", () => {
  describe("when rendering", () => {
    test("shows the correct content", async () => {
      render(<AnimalList />, {
        wrapperProps: {
          apolloMocks,
        },
      });

      expect(await screen.findAllByTestId("animalOption")).toHaveLength(
        mockAnimals.length
      );

      mockAnimals.map(async (animal) => {
        const animalEl = await screen.findByText(animal.name);
        expect(animalEl).toBeInTheDocument();
        expect(animalEl.getAttribute("href")).toBe(
          `/browse-pets/${animal.name}`
        );
      });
    });
  });
});
