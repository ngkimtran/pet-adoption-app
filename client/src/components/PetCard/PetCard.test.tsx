import "@testing-library/jest-dom";
import { render, screen } from "../../utilities/testUtilities";
import PetCard from "./PetCard";
import { AGE, GENDER, SIZE } from "../../constants/constants";
import { toCapitalize } from "../../utilities/utilities";

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

const mockAnimal = "cat";

describe("<PetCard />", () => {
  describe("rendering", () => {
    test("shows the correct content", () => {
      render(<PetCard pet={mockPet} animal={mockAnimal} />);

      expect(screen.getByAltText("").getAttribute("src")).toBe(mockPet.image);
      expect(screen.getByText(mockPet.name)).toBeInTheDocument();
      expect(
        screen.getByText(toCapitalize(mockPet.characteristic.age))
      ).toBeInTheDocument();
      expect(screen.getByText(mockPet.breed)).toBeInTheDocument();
      expect(screen.getByText(mockPet.location)).toBeInTheDocument();
    });
  });

  test("links to the correct page", async () => {
    render(<PetCard pet={mockPet} animal={mockAnimal} />);

    const links = await screen.findAllByTestId("petCardLink");
    links.map((link) =>
      expect(link.getAttribute("href")).toBe(
        `/pet-adoption-app/browse-pets/${mockAnimal}/${mockPet.name.toLowerCase()}-${
          mockPet.id
        }`
      )
    );
  });
});
