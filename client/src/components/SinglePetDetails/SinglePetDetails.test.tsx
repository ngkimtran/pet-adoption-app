import "@testing-library/jest-dom";
import { render, screen, waitFor } from "../../utilities/testUtilities";
import SinglePetDetails from "./SinglePetDetails";
import { AGE, GENDER, ROLE, SIZE } from "../../constants/constants";
import { UPDATE_FAVORITE } from "../../mutations/userMutations";
import { GraphQLError } from "graphql";
import userEvent from "@testing-library/user-event";

const mockUseNavigate = jest.fn();

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockUseNavigate,
}));

jest.mock("../SinglePetDetailsItem/SinglePetDetailsItem", () => () => (
  <div>SinglePetDetailsItem</div>
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

const mockUserState = {
  id: "64e5ac7a01d3744da5a883e0",
  username: "mluuka",
  firstname: "Luuka",
  lastname: "Mattinen",
  email: "lm@gmail.com",
  role: ROLE.ADMIN,
  favorites: [],
  __typename: "User",
};

const mockUserStateUpdated = {
  id: "64e5ac7a01d3744da5a883e0",
  username: "mluuka",
  firstname: "Luuka",
  lastname: "Mattinen",
  email: "lm@gmail.com",
  role: ROLE.ADMIN,
  favorites: [mockPet],
  __typename: "User",
};

const apolloMocks = [
  {
    request: {
      query: UPDATE_FAVORITE,
      variables: {
        petId: mockPet.id,
      },
    },
    result: {
      data: {
        updateFavorite: mockUserStateUpdated,
      },
    },
  },
  {
    request: {
      query: UPDATE_FAVORITE,
      variables: {
        petId: mockPet.id,
      },
    },
    result: {
      errors: [
        new GraphQLError("Login required", {
          extensions: { code: "BAD_USER_INPUT" },
        }),
      ],
    },
  },
];

describe("<SinglePetDetails />", () => {
  describe("rendering", () => {
    test("shows the correct content", () => {
      render(<SinglePetDetails pet={mockPet} />);

      expect(screen.getByText(mockPet.name)).toBeInTheDocument();
      expect(screen.getByText(mockPet.breed)).toBeInTheDocument();
      expect(screen.getByText(mockPet.location)).toBeInTheDocument();
      expect(screen.getByText(mockPet.description)).toBeInTheDocument();
      expect(screen.getAllByText("SinglePetDetailsItem")).toHaveLength(8);
    });
  });

  describe("when user is logged in", () => {
    describe("clicking on the heart icon", () => {
      test("add pet to favorite list", async () => {
        render(<SinglePetDetails pet={mockPet} />, {
          wrapperProps: { apolloMocks, mockUserState },
        });

        expect(screen.getByTestId("addFavoriteBtn")).toBeInTheDocument();
        expect(
          screen.queryByTestId("removeFavoriteBtn")
        ).not.toBeInTheDocument();

        userEvent.click(screen.getByTestId("addFavoriteBtn"));

        await waitFor(() =>
          expect(screen.queryByTestId("addFavoriteBtn")).not.toBeInTheDocument()
        );
        expect(
          await screen.findByTestId("removeFavoriteBtn")
        ).toBeInTheDocument();
      });
    });
  });

  describe("when user is not logged in", () => {
    describe("clicking on the heart icon", () => {
      test("navigate to login", async () => {
        render(<SinglePetDetails pet={mockPet} />, {
          wrapperProps: { apolloMocks: [apolloMocks[1]] },
        });

        userEvent.click(screen.getByTestId("addFavoriteBtn"));

        await waitFor(() => expect(mockUseNavigate).toHaveBeenCalledTimes(1));
      });
    });
  });
});
