import "@testing-library/jest-dom";
import { render, screen } from "../../utilities/testUtilities";
import Pets from "./Pets";
import { GET_PETS } from "../../queries/petQueries";
import { AGE, GENDER, SIZE } from "../../constants/constants";

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useParams: () => ({ animal: mockAnimal }),
}));

const mockAnimal = "cat";

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

const apolloMocks = [
  {
    request: {
      query: GET_PETS,
      variables: {
        type: mockAnimal,
      },
    },
    result: {
      data: {
        pets: mockPets,
      },
    },
  },
];

describe("<Pets />", () => {
  describe("when rendering", () => {
    test("shows the correct content", async () => {
      render(<Pets />, { wrapperProps: { apolloMocks } });

      expect(await screen.findByText(`${mockPets.length}`)).toBeInTheDocument();
      expect(
        await screen.findByText(`${mockAnimal}s available for adoptions.`)
      ).toBeInTheDocument();
      expect(await screen.findByTestId("filter")).toBeInTheDocument();
      expect(await screen.findAllByTestId("petCard")).toHaveLength(
        mockPets.length
      );
    });
  });
});
