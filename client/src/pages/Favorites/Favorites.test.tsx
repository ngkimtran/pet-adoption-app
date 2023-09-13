import "@testing-library/jest-dom";
import { render, screen } from "../../utilities/testUtilities";
import Favorites from "./Favorites";
import { AGE, GENDER, ROLE, SIZE } from "../../constants/constants";
import { toCapitalize } from "../../utilities/utilities";

const mockUseNavigate = jest.fn();

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockUseNavigate,
}));

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

const mockUserState = {
  id: "64e5ac7a01d3744da5a883e0",
  username: "mluuka",
  firstname: "Luuka",
  lastname: "Mattinen",
  email: "lm@gmail.com",
  favorites: [mockPet],
  __typename: "User",
};

describe("<Favorites />", () => {
  describe("when user is admin", () => {
    test("automatically navigate to homepage", () => {
      render(<Favorites />, {
        wrapperProps: {
          mockUserState: { ...mockUserState, role: ROLE.ADMIN },
        },
      });
      expect(mockUseNavigate).toHaveBeenCalledTimes(1);
    });
  });

  describe("when user is not admin", () => {
    describe("rendering", () => {
      test("shows the correct content", () => {
        render(<Favorites />, {
          wrapperProps: {
            mockUserState: { ...mockUserState, role: ROLE.USER },
          },
        });

        expect(
          screen.getByText(
            `My Favorite Pets (${mockUserState.favorites.length})`
          )
        ).toBeInTheDocument();
        expect(screen.getByText("Start adoption process")).toBeInTheDocument();

        expect(screen.getByAltText("").getAttribute("src")).toBe(mockPet.image);
        expect(screen.getByText(mockPet.name)).toBeInTheDocument();
        expect(screen.getByText(mockPet.breed)).toBeInTheDocument();
        expect(screen.getByText(mockPet.location)).toBeInTheDocument();
        expect(
          screen.getByText(toCapitalize(mockPet.characteristic.age))
        ).toBeInTheDocument();

        expect(
          screen.getByTestId("favoritePetDetailsLink").getAttribute("href")
        ).toBe(
          `/pet-adoption-app/browse-pets/${
            mockPet.type.name
          }/${mockPet.name.toLowerCase()}-${mockPet.id}`
        );

        expect(
          screen.getByTestId("favoritePetAdoptLink").getAttribute("href")
        ).toBe(`/pet-adoption-app/adopt?pet-id=${mockPet.id}`);
      });
    });
  });
});
