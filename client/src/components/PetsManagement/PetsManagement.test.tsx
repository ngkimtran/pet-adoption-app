import "@testing-library/jest-dom";
import { render, screen } from "../../utilities/testUtilities";
import { GET_PET, GET_PETS } from "../../queries/petQueries";
import { AGE, GENDER, ROLE, SIZE } from "../../constants/constants";
import PetsManagement from "./PetsManagement";
import userEvent from "@testing-library/user-event";
import { GraphQLError } from "graphql";

jest.mock("../Modals/AddPetModal.tsx", () => () => <div>AddPetModal</div>);

jest.mock("../Modals/DeletePetModal.tsx", () => () => (
  <div>DeletePetModal</div>
));

jest.mock("../PetsManagementEditForm/PetsManagementEditForm.tsx", () => () => (
  <div>PetsManagementEditForm</div>
));

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
  {
    request: {
      query: GET_PET,
      variables: {
        name: mockPets[1].name,
      },
    },
    result: {
      data: {
        pet: mockPets[1],
      },
    },
  },
  {
    request: {
      query: GET_PET,
      variables: {
        name: "test",
      },
    },
    result: {
      errors: [
        new GraphQLError("Cannot read property '_id' of null", {
          extensions: { code: "INTERNAL_SERVER_ERROR" },
        }),
      ],
    },
  },
];

describe("<PetsManagement />", () => {
  describe("when logged in user is admin", () => {
    describe("when rendering", () => {
      test("shows the correct content", async () => {
        render(<PetsManagement />, {
          wrapperProps: {
            apolloMocks,
            mockUserState,
          },
        });

        const addNewPetBtn = await screen.findByText("Add new pet");

        expect(await screen.findByText("List of pets")).toBeInTheDocument();
        expect(
          await screen.findByPlaceholderText("Search for pet name")
        ).toBeInTheDocument();

        expect(addNewPetBtn).toBeInTheDocument();
        expect(addNewPetBtn.getAttribute("data-bs-target")).toBe(
          "#addPetModal"
        );

        expect(await screen.findByText("ID")).toBeInTheDocument();
        expect(await screen.findByText("Name")).toBeInTheDocument();
        expect(await screen.findByText("Type")).toBeInTheDocument();
        expect(await screen.findAllByTestId("petManagementRow")).toHaveLength(
          mockPets.length
        );
      });
    });

    describe("clicking Add new pet", () => {
      test("shows the Add pet modal", async () => {
        render(<PetsManagement />, {
          wrapperProps: {
            apolloMocks,
            mockUserState,
          },
        });

        userEvent.click(await screen.findByText("Add new pet"));
        expect(await screen.findByText("AddPetModal")).toBeVisible();
      });
    });

    describe("clicking the Trash icon on each row", () => {
      test("shows the Delete pet modal", async () => {
        render(<PetsManagement />, {
          wrapperProps: {
            apolloMocks,
            mockUserState,
          },
        });

        const deletePetBtns = await screen.findAllByTestId("deletePetBtn");

        userEvent.click(deletePetBtns[0]);
        expect(await screen.findByText("DeletePetModal")).toBeVisible();
      });
    });

    describe("searching for pet name", () => {
      describe("when pet name is available in the database", () => {
        test("shows the correct content", async () => {
          render(<PetsManagement />, {
            wrapperProps: {
              apolloMocks,
              mockUserState,
            },
          });

          userEvent.type(
            await screen.findByPlaceholderText("Search for pet name"),
            mockPets[1].name
          );
          userEvent.click(await screen.findByTestId("searchPetNameBtn"));

          expect(await screen.findAllByTestId("petManagementRow")).toHaveLength(
            1
          );
          expect(await screen.findByText(mockPets[1].name)).toBeInTheDocument();
        });
      });

      describe("when pet name is not available in the database", () => {
        test("shows the correct content", async () => {
          render(<PetsManagement />, {
            wrapperProps: {
              apolloMocks: [apolloMocks[0], apolloMocks[2]],
              mockUserState,
            },
          });

          userEvent.type(
            await screen.findByPlaceholderText("Search for pet name"),
            "test"
          );
          userEvent.click(await screen.findByTestId("searchPetNameBtn"));

          expect(await screen.findByText("No pet found")).toBeInTheDocument();
        });
      });
    });
  });
});
