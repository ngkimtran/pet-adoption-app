import "@testing-library/jest-dom";
import { render, screen } from "../../utilities/testUtilities";
import SinglePet from "./SinglePet";
import { AGE, GENDER, ROLE, SIZE } from "../../constants/constants";
import { GET_PET } from "../../queries/petQueries";

const mockUseNavigate = jest.fn();
const mockParams = { animal: "cat", id: "64eee3d2e22185635677f49c" };

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockUseNavigate,
  useParams: () => mockParams,
}));

jest.mock(
  "../../components/SinglePetDetails/SinglePetDetails.tsx",
  () => () => <div>SinglePetDetails</div>
);

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
  role: ROLE.USER,
  favorites: [],
  __typename: "User",
};

const apolloMocks = [
  {
    request: {
      query: GET_PET,
      variables: {
        id: mockPet.id,
      },
    },
    result: {
      data: {
        pet: mockPet,
      },
    },
  },
];

describe("<SinglePet />", () => {
  describe("rendering", () => {
    test("shows the correct content", async () => {
      render(<SinglePet />, {
        wrapperProps: {
          apolloMocks,
          mockUserState,
        },
      });

      expect(await screen.findByText("SinglePetDetails")).toBeInTheDocument();
      expect(
        await screen.findByText(`Considering ${mockPet.name} for adoption?`)
      ).toBeInTheDocument();
      expect(await screen.findByText("Fill the form")).toBeInTheDocument();
      expect(
        (await screen.findByText("Fill the form")).getAttribute("href")
      ).toBe(`/pet-adoption-app/adopt?pet-id=${mockPet.id}`);
      expect(await screen.findByText("Read FAQs")).toBeInTheDocument();
      expect((await screen.findByText("Read FAQs")).getAttribute("href")).toBe(
        `/pet-adoption-app/faq`
      );
    });
  });
});
