import "@testing-library/jest-dom";
import { render, screen } from "../../utilities/testUtilities";
import Actions from "./Actions";
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
];
const apolloMocks = [
  {
    request: {
      query: GET_PETS,
      variables: {
        type: "cat",
      },
    },
    result: {
      data: {
        pets: mockPets,
      },
    },
  },
];

describe("<Actions />", () => {
  describe("when rendering", () => {
    test("shows the correct content", async () => {
      render(<Actions />);

      expect(screen.getByText("Planning To Adopt?")).toBeInTheDocument();
      expect(screen.getByText("View list of pets")).toBeInTheDocument();
      expect(
        screen.getByText(
          "See our wonderful list of pets, categorized for your convenience."
        )
      ).toBeInTheDocument();
      expect(screen.getByText("Read our FAQs")).toBeInTheDocument();
      expect(
        screen.getByText("Read answers to questions you're wondering about.")
      ).toBeInTheDocument();
      expect(screen.getByText("Fill the adoption form")).toBeInTheDocument();
      expect(
        screen.getByText(
          "Already have a pet that caught your eyes? Fill the form and adopt your new friend before it's too late!"
        )
      ).toBeInTheDocument();
      expect(await screen.findAllByRole("button")).toHaveLength(3);
    });
  });

  describe("when clicking navigation buttons", () => {
    test("has the correct href for 'View list of pets' button", async () => {
      render(<Actions />, { wrapperProps: { apolloMocks } });
      expect(screen.getAllByRole("button")[0].getAttribute("href")).toBe(
        "/pet-adoption-app/browse-pets"
      );
    });

    test("has the correct href for 'Read our FAQs' button", async () => {
      render(<Actions />, { wrapperProps: { apolloMocks } });
      expect(screen.getAllByRole("button")[1].getAttribute("href")).toBe(
        "/pet-adoption-app/faq"
      );
    });

    test("has the correct href for 'Fill the adoption form' button", async () => {
      render(<Actions />, { wrapperProps: { apolloMocks } });
      expect(screen.getAllByRole("button")[2].getAttribute("href")).toBe(
        "/pet-adoption-app/adopt"
      );
    });
  });
});
