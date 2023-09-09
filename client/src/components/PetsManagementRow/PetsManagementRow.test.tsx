import "@testing-library/jest-dom";
import { render, screen } from "../../utilities/testUtilities";
import PetsManagementRow from "./PetsManagementRow";
import userEvent from "@testing-library/user-event";
import { AGE, GENDER, SIZE } from "../../constants/constants";

jest.mock("../PetsManagementEditForm/PetsManagementEditForm.tsx", () => () => (
  <div>PetsManagementEditForm</div>
));

const mockPet = {
  id: "64eee3d2e22185635677f49c",
  name: "Keith",
  type: {
    id: "64d0d112a88a7b265940ae64",
    name: "cat",
    __typename: "Animal",
  },
  breed: "Domestic short hair",
  location: "Helsinki, FI",
  description: "Lorem ipsum",
  adoptionFee: 12,
  image: "https://i.imgur.com/dzniPVJ.jpg",
  characteristic: {
    age: AGE.ADULT,
    gender: GENDER.MALE,
    size: SIZE.MEDIUM,
    personality: ["curious"],
    coatLength: "short",
    houseTrained: true,
    health: ["vaccinations up to date"],
    __typename: "Characteristic",
  },
  __typename: "Pet",
};

const mockSetPetList = jest.fn();
const mockSetPetToBeDeleted = jest.fn();

describe("<PetsManagementRow />", () => {
  describe("rendering", () => {
    test("shows the correct content", async () => {
      render(
        <table>
          <tbody>
            <PetsManagementRow
              pet={mockPet}
              setPetList={mockSetPetList}
              setPetToBeDeleted={mockSetPetToBeDeleted}
            />
          </tbody>
        </table>
      );
      expect(await screen.findByText(mockPet.name)).toBeInTheDocument();
      expect(await screen.findByText(mockPet.id)).toBeInTheDocument();
      expect(await screen.findByText(mockPet.type.name)).toBeInTheDocument();
      expect(await screen.findAllByRole("button")).toHaveLength(1);
    });
  });

  describe("clicking the Trash icon", () => {
    test("calls setPetToBeDeleted", async () => {
      render(
        <table>
          <tbody>
            <PetsManagementRow
              pet={mockPet}
              setPetList={mockSetPetList}
              setPetToBeDeleted={mockSetPetToBeDeleted}
            />
          </tbody>
        </table>
      );

      userEvent.click(screen.getByRole("button"));
      expect(mockSetPetToBeDeleted).toHaveBeenCalledTimes(1);
    });
  });

  describe("clicking anywhere in the component", () => {
    test("shows an accordion", async () => {
      render(
        <table>
          <tbody>
            <PetsManagementRow
              pet={mockPet}
              setPetList={mockSetPetList}
              setPetToBeDeleted={mockSetPetToBeDeleted}
            />
          </tbody>
        </table>
      );

      userEvent.click(screen.getByTestId("petManagementRow"));
      expect(
        await screen.findByText("PetsManagementEditForm")
      ).toBeInTheDocument();
    });
  });
});
