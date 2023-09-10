import "@testing-library/jest-dom";
import {
  fireEvent,
  render,
  screen,
  waitFor,
} from "../../utilities/testUtilities";
import AddPetModal from "./AddPetModal";
import userEvent from "@testing-library/user-event";
import { AGE, GENDER, SIZE } from "../../constants/constants";
import { ADD_PET } from "../../mutations/petMutations";

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

const apolloMocks = [
  {
    request: {
      query: ADD_PET,
      variables: {
        type: mockPet.type.name,
        name: mockPet.name,
        breed: mockPet.breed,
        location: mockPet.location,
        description: mockPet.description,
        adoptionFee: mockPet.adoptionFee,
        age: mockPet.characteristic.age,
        gender: mockPet.characteristic.gender,
        size: mockPet.characteristic.size,
        personality: mockPet.characteristic.personality.filter(
          (item: string) => item !== ""
        ),
        coatLength: mockPet.characteristic.coatLength,
        houseTrained: mockPet.characteristic.houseTrained,
        health: mockPet.characteristic.health.filter(
          (item: string) => item !== ""
        ),
        image: mockPet.image,
      },
    },
    result: {
      data: {
        addPet: mockPet,
      },
    },
  },
];

const mockSetPetList = jest.fn();

describe("<AddPetModal />", () => {
  describe("rendering", () => {
    test("shows the correct content", () => {
      render(<AddPetModal setPetList={mockSetPetList} />);

      expect(screen.getByText("Add a new pet")).toBeInTheDocument();
      expect(screen.getByText("Name")).toBeInTheDocument();
      expect(screen.getByText("Type")).toBeInTheDocument();
      expect(screen.getByText("Breed")).toBeInTheDocument();
      expect(screen.getByText("Location")).toBeInTheDocument();
      expect(screen.getByText("Description")).toBeInTheDocument();
      expect(screen.getByText("Personality")).toBeInTheDocument();
      expect(screen.getByText("Coat Length")).toBeInTheDocument();
      expect(screen.getByText("Health")).toBeInTheDocument();
      expect(screen.getByText("Image URL")).toBeInTheDocument();
      expect(screen.getByText("Adoption Fee")).toBeInTheDocument();
      expect(screen.getByText("Gender")).toBeInTheDocument();
      expect(screen.getByText("Size")).toBeInTheDocument();
      expect(screen.getByText("House Trained")).toBeInTheDocument();
      expect(screen.getByText("Close")).toBeInTheDocument();
      expect(screen.getByText("Add pet")).toBeInTheDocument();
    });
  });

  describe("adding a new animal", () => {
    test("updates animal list", async () => {
      render(<AddPetModal setPetList={mockSetPetList} />, {
        wrapperProps: { apolloMocks },
      });

      const inputFields = screen.getAllByDisplayValue("");

      userEvent.type(inputFields[0], mockPet.name);
      userEvent.type(inputFields[1], mockPet.type.name);
      userEvent.type(inputFields[2], mockPet.breed);
      userEvent.type(inputFields[3], mockPet.location);
      userEvent.type(inputFields[4], mockPet.description);
      userEvent.type(
        inputFields[5],
        mockPet.characteristic.personality.join(", ")
      );
      userEvent.type(inputFields[6], mockPet.characteristic.coatLength);
      userEvent.type(inputFields[7], mockPet.characteristic.health.join(", "));
      userEvent.type(inputFields[8], mockPet.image);
      userEvent.type(
        screen.getByDisplayValue(0),
        mockPet.adoptionFee.toString()
      );

      const radios = await screen.findAllByRole("radio", {
        hidden: true,
      });

      userEvent.click(
        radios.filter(
          (r) =>
            r.getAttribute("name") ===
            `gender-${mockPet.characteristic.gender.toLowerCase()}`
        )[0]
      );
      userEvent.click(
        radios.filter(
          (r) =>
            r.getAttribute("name") ===
            `houseTrained-${mockPet.characteristic.houseTrained ? "yes" : "no"}`
        )[0]
      );

      fireEvent.change(screen.getByTestId("addPetModalAge"), {
        target: { value: mockPet.characteristic.age },
      });
      fireEvent.change(screen.getByTestId("addPetModalSize"), {
        target: { value: mockPet.characteristic.size },
      });

      userEvent.click(screen.getByText("Add pet"));

      await waitFor(() => expect(mockSetPetList).toHaveBeenCalledTimes(1));
    });
  });
});
