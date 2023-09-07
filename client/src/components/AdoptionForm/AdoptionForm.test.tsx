import "@testing-library/jest-dom";
import { render, screen, waitFor } from "../../utilities/testUtilities";
import AdoptionForm from "./AdoptionForm";
import { GET_PET } from "../../queries/petQueries";
import userEvent from "@testing-library/user-event";
import { AGE, GENDER, ROLE, SIZE } from "../../constants/constants";
import { CREATE_CHECKOUT_SESSION } from "../../queries/paymentQueries";

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useSearchParams: () => [new URLSearchParams({ "pet-id": mockPets[0].id })],
}));

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
      query: GET_PET,
      variables: {
        id: mockPets[0].id,
      },
    },
    result: {
      data: {
        pet: mockPets[0],
      },
    },
  },
  {
    request: {
      query: GET_PET,
      variables: {
        id: mockPets[1].id,
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
      query: CREATE_CHECKOUT_SESSION,
      variables: {
        petName: mockPets[0].name,
        adoptionFee: mockPets[0].adoptionFee,
      },
    },
    result: {
      data: {
        createCheckoutSession: JSON.stringify({ url: "/testCheckoutURL" }),
      },
    },
  },
];

const mockUserState = {
  id: "64e5ac7a01d3744da5a883e0",
  username: "mluuka",
  firstname: "Luuka",
  lastname: "Mattinen",
  email: "lm@gmail.com",
  role: ROLE.USER,
  favorites: mockPets,
  __typename: "User",
};

describe("<AdoptionForm />", () => {
  describe("when user is not logged in", () => {
    test("shows the correct content", async () => {
      render(<AdoptionForm />, { wrapperProps: { apolloMocks } });

      expect(
        screen.getByText("Login to start adopting a pet!")
      ).toBeInTheDocument();
      expect(await screen.findAllByRole("button")).toHaveLength(2);
    });
  });

  describe("when user is logged in", () => {
    describe("rendering", () => {
      test("shows the correct content", async () => {
        render(<AdoptionForm />, {
          wrapperProps: { apolloMocks, mockUserState },
        });
        expect(screen.getByText("Submit your application")).toBeInTheDocument();
        expect(screen.getByText("Contact info")).toBeInTheDocument();
        expect(screen.getByText("First name")).toBeInTheDocument();
        expect(screen.getByText("Last name")).toBeInTheDocument();
        expect(screen.getByText("Email")).toBeInTheDocument();
        expect(screen.getByText("I want to adopt")).toBeInTheDocument();
        expect(screen.getByText(mockUserState.firstname)).toBeInTheDocument();
        expect(screen.getByText(mockUserState.lastname)).toBeInTheDocument();
        expect(screen.getByText(mockUserState.email)).toBeInTheDocument();
      });
    });

    describe("clicking adopt option dropdown button", () => {
      test("shows the correct content", async () => {
        render(<AdoptionForm />, {
          wrapperProps: { apolloMocks, mockUserState },
        });
        userEvent.click(screen.getAllByRole("button")[0]);
        mockUserState.favorites.map((pet) =>
          expect(screen.getByText(pet.name)).toBeVisible()
        );
      });

      test("change displayed pet name when selecting another pet", async () => {
        render(<AdoptionForm />, {
          wrapperProps: { apolloMocks, mockUserState },
        });
        userEvent.click(screen.getAllByRole("button")[0]);
        userEvent.click(screen.getByText("Papaya"));
        expect(
          screen.queryByDisplayValue(mockPets[0].name)
        ).not.toBeInTheDocument();
        expect(
          screen.queryByText(mockPets[0].adoptionFee, { exact: false })
        ).not.toBeInTheDocument();
        expect(
          await screen.findByDisplayValue(mockPets[1].name)
        ).toBeInTheDocument();
        expect(
          await screen.findByText(mockPets[1].adoptionFee, { exact: false })
        ).toBeInTheDocument();
      });
    });

    describe("when pet-id searchParam is available", () => {
      describe("rendering", () => {
        test("shows the correct content", async () => {
          render(<AdoptionForm />, {
            wrapperProps: { apolloMocks, mockUserState },
          });

          expect(
            await screen.findByDisplayValue(mockPets[0].name)
          ).toBeInTheDocument();
          expect(
            await screen.findByText(mockPets[0].adoptionFee, { exact: false })
          ).toBeInTheDocument();
        });
      });

      describe("when clicking Proceed to checkout", () => {
        describe("rendering", () => {
          test("shows the correct content", async () => {
            const mockReplace = jest.fn();

            Object.defineProperty(window, "location", {
              value: {
                replace: mockReplace,
              },
              writable: true,
            });

            render(<AdoptionForm />, {
              wrapperProps: {
                apolloMocks,
                mockUserState,
              },
            });

            expect(
              await screen.findByText("Proceed to checkout")
            ).toBeInTheDocument();
            expect(
              await screen.findByText("Cancel the applicaion")
            ).toBeInTheDocument();

            userEvent.click(screen.getByText("Proceed to checkout"));

            await waitFor(() => {
              expect(mockReplace).toHaveBeenCalledTimes(1);
            });
            await waitFor(() => {
              expect(mockReplace).toHaveBeenLastCalledWith("/testCheckoutURL");
            });
          });
        });
      });
    });

    // describe("when pet-id searchParam is not available", () => {
    //   describe("rendering", () => {
    //     test("shows the correct content", async () => {
    //       render(<AdoptionForm />, {
    //         wrapperProps: {
    //           apolloMocks,
    //           mockUserState,
    //         },
    //       });

    //       expect(
    //         await screen.findByDisplayValue(mockPets[0].name)
    //       ).not.toBeInTheDocument();
    //       expect(
    //         await screen.findByText(mockPets[0].adoptionFee, { exact: false })
    //       ).not.toBeInTheDocument();
    //     });
    //   });
    // });
  });
});
