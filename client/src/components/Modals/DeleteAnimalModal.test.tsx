import "@testing-library/jest-dom";
import { render, screen, waitFor } from "../../utilities/testUtilities";
import DeleteAnimalModal from "./DeleteAnimalModal";
import userEvent from "@testing-library/user-event";
import { GET_PETS } from "../../queries/petQueries";
import { DELETE_ANIMAL } from "../../mutations/animalMutations";

const mockAnimal = {
  id: "64d0d112a88a7b265940ae64",
  name: "cat",
  petCount: 2,
  __typename: "Animal",
};

const apolloMocks = [
  {
    request: {
      query: GET_PETS,
      variables: {
        type: mockAnimal.name,
      },
    },
    result: {
      data: {
        pets: [],
      },
    },
  },
  {
    request: {
      query: DELETE_ANIMAL,
      variables: {
        id: mockAnimal.id,
      },
    },
    result: {
      data: {
        deleteAnimal: mockAnimal,
      },
    },
  },
];

const mockSetAnimalToBeDeleted = jest.fn();
const mockSetAnimalList = jest.fn();

describe("<DeleteAnimalModal />", () => {
  describe("rendering", () => {
    test("shows the correct content", () => {
      render(
        <DeleteAnimalModal
          animalToBeDeleted={mockAnimal}
          setAnimalToBeDeleted={mockSetAnimalToBeDeleted}
          setAnimalList={mockSetAnimalList}
        />
      );

      expect(
        screen.getByText("Are you sure you want to delete this animal?")
      ).toBeInTheDocument();
      expect(screen.getByText("Warning!")).toBeInTheDocument();
      expect(
        screen.getByText(
          "Doing so will delete all pets belong to this animal type."
        )
      ).toBeInTheDocument();
      expect(screen.getByText("Close")).toBeInTheDocument();
      expect(screen.getByText("Confirm Delete")).toBeInTheDocument();
    });
  });

  describe("deleting an animal", () => {
    test("updates animal list", async () => {
      render(
        <DeleteAnimalModal
          animalToBeDeleted={mockAnimal}
          setAnimalToBeDeleted={mockSetAnimalToBeDeleted}
          setAnimalList={mockSetAnimalList}
        />,
        {
          wrapperProps: { apolloMocks },
        }
      );

      userEvent.click(screen.getByText("Confirm Delete"));

      await waitFor(() =>
        expect(mockSetAnimalToBeDeleted).toHaveBeenCalledTimes(1)
      );
      await waitFor(() => expect(mockSetAnimalList).toHaveBeenCalledTimes(1));
    });
  });
});
