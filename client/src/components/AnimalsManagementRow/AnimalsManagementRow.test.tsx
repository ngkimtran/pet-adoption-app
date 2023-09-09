import "@testing-library/jest-dom";
import { render, screen } from "../../utilities/testUtilities";
import AnimalsManagementRow from "./AnimalsManagementRow";
import userEvent from "@testing-library/user-event";

const mockAnimal = {
  id: "64d0d112a88a7b265940ae64",
  name: "cat",
  petCount: 2,
  __typename: "Animal",
};

const mockSetAnimalToBeDeleted = jest.fn();

describe("<AnimalsManagementRow />", () => {
  describe("rendering", () => {
    test("shows the correct content", async () => {
      render(
        <table>
          <tbody>
            <AnimalsManagementRow
              animal={mockAnimal}
              setAnimalToBeDeleted={mockSetAnimalToBeDeleted}
            />
          </tbody>
        </table>
      );
      expect(await screen.findByText(mockAnimal.name)).toBeInTheDocument();
      expect(await screen.findByText(mockAnimal.id)).toBeInTheDocument();
      expect(await screen.findByText(mockAnimal.petCount)).toBeInTheDocument();
      expect(await screen.findAllByRole("button")).toHaveLength(1);
    });
  });

  describe("clicking the Trash icon", () => {
    test("calls setAnimalToBeDeleted", async () => {
      render(
        <table>
          <tbody>
            <AnimalsManagementRow
              animal={mockAnimal}
              setAnimalToBeDeleted={mockSetAnimalToBeDeleted}
            />
          </tbody>
        </table>
      );

      userEvent.click(screen.getByRole("button"));
      expect(mockSetAnimalToBeDeleted).toHaveBeenCalledTimes(1);
    });
  });
});
