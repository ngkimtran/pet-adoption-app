import "@testing-library/jest-dom";
import { render, screen, waitFor } from "../../utilities/testUtilities";
import DeletePetModal from "./DeletePetModal";
import userEvent from "@testing-library/user-event";
import { DELETE_PET } from "../../mutations/petMutations";

const mockPet = {
  id: "64eee3d2e22185635677f49c",
  name: "Keith",
};

const apolloMocks = [
  {
    request: {
      query: DELETE_PET,
      variables: {
        id: mockPet.id,
      },
    },
    result: {
      data: {
        deletePet: mockPet,
      },
    },
  },
];

const mockSetPetToBeDeleted = jest.fn();
const mockSetPetList = jest.fn();

describe("<DeletePetModal />", () => {
  describe("rendering", () => {
    test("shows the correct content", () => {
      render(
        <DeletePetModal
          petToBeDeleted={mockPet.id}
          setPetToBeDeleted={mockSetPetToBeDeleted}
          setPetList={mockSetPetList}
        />
      );

      expect(
        screen.getByText("Are you sure you want to delete this pet?")
      ).toBeInTheDocument();
      expect(screen.getByText("Warning!")).toBeInTheDocument();
      expect(
        screen.getByText(
          "Doing so will permanently delete this pet and all its properties."
        )
      ).toBeInTheDocument();
      expect(screen.getByText("Close")).toBeInTheDocument();
      expect(screen.getByText("Confirm Delete")).toBeInTheDocument();
    });
  });

  describe("deleting a pet", () => {
    test("updates pet list", async () => {
      render(
        <DeletePetModal
          petToBeDeleted={mockPet.id}
          setPetToBeDeleted={mockSetPetToBeDeleted}
          setPetList={mockSetPetList}
        />,
        {
          wrapperProps: { apolloMocks },
        }
      );

      userEvent.click(screen.getByText("Confirm Delete"));

      await waitFor(() =>
        expect(mockSetPetToBeDeleted).toHaveBeenCalledTimes(1)
      );
      await waitFor(() => expect(mockSetPetList).toHaveBeenCalledTimes(1));
    });
  });
});
