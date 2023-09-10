import "@testing-library/jest-dom";
import { render, screen, waitFor } from "../../utilities/testUtilities";
import AddAnimalModal from "./AddAnimalModal";
import userEvent from "@testing-library/user-event";
import { ADD_ANIMAL } from "../../mutations/animalMutations";

const mockAnimal = {
  id: "64d0d112a88a7b265940ae64",
  name: "cat",
  petCount: 2,
  __typename: "Animal",
};

const apolloMocks = [
  {
    request: {
      query: ADD_ANIMAL,
      variables: {
        name: mockAnimal.name,
      },
    },
    result: {
      data: {
        addAnimal: mockAnimal,
      },
    },
  },
];

const mockSetAnimalList = jest.fn();

describe("<AddAnimalModal />", () => {
  describe("rendering", () => {
    test("shows the correct content", () => {
      render(<AddAnimalModal setAnimalList={mockSetAnimalList} />);

      expect(screen.getByText("Add a new animal")).toBeInTheDocument();
      expect(screen.getByText("Name")).toBeInTheDocument();
      expect(screen.getByText("Close")).toBeInTheDocument();
      expect(screen.getByText("Add animal")).toBeInTheDocument();
    });
  });

  describe("adding a new animal", () => {
    test("updates animal list", async () => {
      render(<AddAnimalModal setAnimalList={mockSetAnimalList} />, {
        wrapperProps: { apolloMocks },
      });

      userEvent.type(screen.getByDisplayValue(""), mockAnimal.name);
      userEvent.click(screen.getByText("Add animal"));

      await waitFor(() => expect(mockSetAnimalList).toHaveBeenCalledTimes(1));
    });
  });
});
