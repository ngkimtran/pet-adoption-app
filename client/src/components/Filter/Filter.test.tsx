import "@testing-library/jest-dom";
import { render, screen } from "../../utilities/testUtilities";
import Filter from "./Filter";
import userEvent from "@testing-library/user-event";
import { AGE, GENDER, SIZE } from "../../constants/constants";

const mockPets = [
  {
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
  },
  {
    id: "64eee3d2e22185635677f485",
    name: "Papaya",
    type: {
      id: "64d0d112a88a7b265940ae64",
      name: "cat",
      __typename: "Animal",
    },
    breed: "Domestic short hair",
    location: "Helsinki, FI",
    description: "Lorem ipsum",
    adoptionFee: 5,
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
  },
];

const mockFilteredPets = [
  {
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
  },
  {
    id: "64eee3d2e22185635677f485",
    name: "Papaya",
    type: {
      id: "64d0d112a88a7b265940ae64",
      name: "cat",
      __typename: "Animal",
    },
    breed: "Domestic short hair",
    location: "Helsinki, FI",
    description: "Lorem ipsum",
    adoptionFee: 5,
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
  },
];

const mockSetFilteredPets = jest.fn();

const mockFilterParams = [
  "Breed",
  "Age",
  "Size",
  "Gender",
  "House Trained",
  "Coat Length",
  "Pet name",
];

describe("<Filter />", () => {
  describe("when rendering", () => {
    test("shows the correct content", () => {
      render(
        <Filter
          pets={mockPets}
          filteredPets={mockFilteredPets}
          setFilteredPets={mockSetFilteredPets}
          style={{}}
        />
      );

      mockFilterParams.map((param) =>
        expect(screen.getByText(param)).toBeInTheDocument()
      );
    });
  });

  describe("changing filter params", () => {
    test("change displayed filter value", async () => {
      render(
        <Filter
          pets={mockPets}
          filteredPets={mockFilteredPets}
          setFilteredPets={mockSetFilteredPets}
          style={{}}
        />
      );
      const buttons = await screen.findAllByTestId("filterDropdown");
      userEvent.click(buttons[0]);
      userEvent.click(screen.getByText(mockPets[0].breed));

      expect(await screen.findAllByText(mockPets[0].breed)).toHaveLength(2);
    });
  });

  describe("clicking filter pet by name button", () => {
    test("calls setFilteredPets", () => {
      render(
        <Filter
          pets={mockPets}
          filteredPets={mockFilteredPets}
          setFilteredPets={mockSetFilteredPets}
          style={{}}
        />
      );

      userEvent.click(screen.getByTestId("filterPetNameBtn"));

      expect(mockSetFilteredPets).toHaveBeenCalled();
    });
  });

  describe("clicking Clear all", () => {
    test("reset filter params", async () => {
      render(
        <Filter
          pets={mockPets}
          filteredPets={mockFilteredPets}
          setFilteredPets={mockSetFilteredPets}
          style={{}}
        />
      );
      const buttons = await screen.findAllByTestId("filterDropdown");
      userEvent.click(buttons[0]);
      userEvent.click(screen.getByText(mockPets[0].breed));
      userEvent.click(await screen.findByText("Clear all"));

      expect(await screen.findAllByText(mockPets[0].breed)).toHaveLength(1);
      expect(await screen.findAllByText("Any")).toHaveLength(12); // 6 visible + 6 option
    });
  });
});
