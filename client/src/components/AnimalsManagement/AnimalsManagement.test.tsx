import "@testing-library/jest-dom";
import { render, screen } from "../../utilities/testUtilities";
import AnimalsManagement from "./AnimalsManagement";
import userEvent from "@testing-library/user-event";
import { GET_ANIMAL, GET_ANIMALS } from "../../queries/animalQueries";
import { ROLE } from "../../constants/constants";
import { GraphQLError } from "graphql";

jest.mock("../Modals/AddAnimalModal.tsx", () => () => (
  <div>AddAnimalModal</div>
));

jest.mock("../Modals/DeleteAnimalModal.tsx", () => () => (
  <div>DeleteAnimalModal</div>
));

const mockAnimals = [
  {
    id: "64d0d112a88a7b265940ae64",
    name: "cat",
    petCount: 2,
    __typename: "Animal",
  },
  {
    id: "64e749a3d58d5398e13a1756",
    name: "dog",
    petCount: 0,
    __typename: "Animal",
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
      query: GET_ANIMALS,
    },
    result: {
      data: {
        animals: mockAnimals,
      },
    },
  },
  {
    request: {
      query: GET_ANIMAL,
      variables: {
        name: mockAnimals[1].name,
      },
    },
    result: {
      data: {
        animal: mockAnimals[1],
      },
    },
  },
  {
    request: {
      query: GET_ANIMAL,
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

describe("<AnimalsManagement />", () => {
  describe("when logged in user is admin", () => {
    describe("rendering", () => {
      test("shows the correct content", async () => {
        render(<AnimalsManagement />, {
          wrapperProps: {
            apolloMocks,
            mockUserState,
          },
        });

        const addNewAnimalBtn = await screen.findByText("Add new animal");

        expect(await screen.findByText("List of animals")).toBeInTheDocument();
        expect(
          await screen.findByPlaceholderText("Search for animal name")
        ).toBeInTheDocument();

        expect(addNewAnimalBtn).toBeInTheDocument();
        expect(addNewAnimalBtn.getAttribute("data-bs-target")).toBe(
          "#addAnimalModal"
        );

        expect(await screen.findByText("ID")).toBeInTheDocument();
        expect(await screen.findByText("Name")).toBeInTheDocument();
        expect(await screen.findByText("Pet Count")).toBeInTheDocument();
        expect(
          await screen.findAllByTestId("animalManagementRow")
        ).toHaveLength(mockAnimals.length);
      });
    });

    describe("clicking Add new animal", () => {
      test("shows the Add animal modal", async () => {
        render(<AnimalsManagement />, {
          wrapperProps: {
            apolloMocks,
            mockUserState,
          },
        });

        userEvent.click(await screen.findByText("Add new animal"));
        expect(await screen.findByText("AddAnimalModal")).toBeVisible();
      });
    });

    describe("clicking the Trash icon on each row", () => {
      test("shows the Delete animal modal", async () => {
        render(<AnimalsManagement />, {
          wrapperProps: {
            apolloMocks,
            mockUserState,
          },
        });

        const deleteAnimalBtns = await screen.findAllByTestId(
          "deleteAnimalBtn"
        );

        userEvent.click(deleteAnimalBtns[0]);
        expect(await screen.findByText("DeleteAnimalModal")).toBeVisible();
      });
    });

    describe("searching for animal name", () => {
      describe("when animal name is available in the database", () => {
        test("shows the correct content", async () => {
          render(<AnimalsManagement />, {
            wrapperProps: {
              apolloMocks,
              mockUserState,
            },
          });

          userEvent.type(
            await screen.findByPlaceholderText("Search for animal name"),
            mockAnimals[1].name
          );
          userEvent.click(await screen.findByTestId("searchAnimalNameBtn"));

          expect(
            await screen.findAllByTestId("animalManagementRow")
          ).toHaveLength(1);
          expect(
            await screen.findByText(mockAnimals[1].name)
          ).toBeInTheDocument();
        });
      });

      describe("when animal name is not available in the database", () => {
        test("shows the correct content", async () => {
          render(<AnimalsManagement />, {
            wrapperProps: {
              apolloMocks: [apolloMocks[0], apolloMocks[2]],
              mockUserState,
            },
          });

          userEvent.type(
            await screen.findByPlaceholderText("Search for animal name"),
            "test"
          );
          userEvent.click(await screen.findByTestId("searchAnimalNameBtn"));

          expect(
            await screen.findByText("No animal found")
          ).toBeInTheDocument();
        });
      });
    });
  });
});
