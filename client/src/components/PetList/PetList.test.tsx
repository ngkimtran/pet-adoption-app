import "@testing-library/jest-dom";
import { render, screen } from "../../utilities/testUtilities";
import PetList from "./PetList";
import { AGE, GENDER, SIZE } from "../../constants/constants";
import { toCapitalize } from "../../utilities/utilities";
import userEvent from "@testing-library/user-event";

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
    breed: "Russian Blue",
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
const mockAnimal = "cat";

describe("<PetCard />", () => {
  describe("rendering", () => {
    test("shows the correct content", () => {
      render(<PetList pets={mockPets} animal={mockAnimal} />);

      expect(screen.getByText(`${mockPets.length}`)).toBeInTheDocument();
      expect(
        screen.getByText(`${mockAnimal}s available for adoptions.`)
      ).toBeInTheDocument();
      expect(screen.getByTestId("filter")).toBeInTheDocument();
      expect(screen.getAllByTestId("petCard")).toHaveLength(mockPets.length);
    });
  });

  describe("filtering", () => {
    describe("when there are pets matching the filter", () => {
      test("shows the correct content", async () => {
        render(<PetList pets={mockPets} animal={mockAnimal} />);

        const buttons = await screen.findAllByTestId("filterDropdown");
        userEvent.click(buttons[0]);
        userEvent.click(screen.getAllByText(mockPets[0].breed)[0]);

        expect(await screen.findAllByTestId("petCard")).toHaveLength(1);
      });
    });

    describe("when there  no pet matching the filter", () => {
      test("shows the correct content", async () => {
        render(<PetList pets={mockPets} animal={mockAnimal} />);

        const buttons = await screen.findAllByTestId("filterDropdown");
        userEvent.click(buttons[1]);
        userEvent.click(screen.getByText(toCapitalize(AGE.BABY)));

        expect(await screen.findByText("No pets found.")).toBeInTheDocument();
      });
    });
  });
});
