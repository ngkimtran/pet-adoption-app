import "@testing-library/jest-dom";
import { render, screen } from "../../utilities/testUtilities";
import Suggestion from "./Suggestion";
import { GET_PETS } from "../../queries/petQueries";
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
  {
    id: "64eee3d2e22185635677f49a",
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
    id: "64eee3d2e22185635677f48v",
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

const apolloMocks = [
  {
    request: {
      query: GET_PETS,
    },
    result: {
      data: {
        pets: mockPets,
      },
    },
  },
];

describe("<Suggestion />", () => {
  describe("rendering", () => {
    test("shows the correct content", async () => {
      render(<Suggestion />, {
        wrapperProps: {
          apolloMocks,
        },
      });

      expect(
        await screen.findByText("Pets available for adoption")
      ).toBeInTheDocument();
      expect(await screen.findAllByTestId("petCard")).toHaveLength(3);
      expect(
        await screen.findByText(`And ${mockPets.length} more pets available.`)
      ).toBeInTheDocument();
      expect(await screen.findByText("Meet them now")).toBeInTheDocument();
    });

    test("links to the correct page", async () => {
      render(<Suggestion />, {
        wrapperProps: {
          apolloMocks,
        },
      });

      const links = await screen.findAllByTestId("browseAllLink");
      links.map((link) =>
        expect(link.getAttribute("href")).toBe("/pet-adoption-app/browse-pets")
      );
    });
  });
});
