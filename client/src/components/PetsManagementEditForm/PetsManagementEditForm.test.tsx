import "@testing-library/jest-dom";
import { render, screen, waitFor } from "../../utilities/testUtilities";
import PetsManagementEditForm from "./PetsManagementEditForm";
import userEvent from "@testing-library/user-event";
import { AGE, GENDER, SIZE } from "../../constants/constants";
import { toCapitalize } from "../../utilities/utilities";
import { UPDATE_PET } from "../../mutations/petMutations";

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

const mockUpdatedPet = {
  id: "64eee3d2e22185635677f49c",
  name: "changed name",
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

const mockSetPetList = jest.fn();

const apolloMocks = [
  {
    request: {
      query: UPDATE_PET,
      variables: {
        id: mockPet.id,
        type: mockPet.type.name,
        name: "changed name",
        breed: mockPet.breed,
        location: mockPet.location,
        description: mockPet.description,
        adoptionFee: mockPet.adoptionFee,
        age: mockPet.characteristic.age,
        gender: mockPet.characteristic.gender,
        size: mockPet.characteristic.size,
        personality: mockPet.characteristic.personality,
        coatLength: mockPet.characteristic.coatLength,
        houseTrained: mockPet.characteristic.houseTrained,
        health: mockPet.characteristic.health,
        image: mockPet.image,
      },
    },
    result: {
      data: {
        updatePet: mockUpdatedPet,
      },
    },
  },
];

describe("<PetsManagementEditForm />", () => {
  describe("rendering", () => {
    test("shows the correct content", async () => {
      render(
        <PetsManagementEditForm pet={mockPet} setPetList={mockSetPetList} />
      );

      expect(await screen.findByText("Name")).toBeInTheDocument();
      expect(await screen.findByDisplayValue(mockPet.name)).toBeInTheDocument();

      expect(await screen.findByText("Type")).toBeInTheDocument();
      expect(
        await screen.findByDisplayValue(mockPet.type.name)
      ).toBeInTheDocument();

      expect(await screen.findByText("Breed")).toBeInTheDocument();
      expect(
        await screen.findByDisplayValue(mockPet.breed)
      ).toBeInTheDocument();

      expect(await screen.findByText("Location")).toBeInTheDocument();
      expect(
        await screen.findByDisplayValue(mockPet.location)
      ).toBeInTheDocument();

      expect(await screen.findByText("Description")).toBeInTheDocument();
      expect(
        await screen.findByDisplayValue(mockPet.description)
      ).toBeInTheDocument();

      expect(await screen.findByText("Adoption Fee")).toBeInTheDocument();
      expect(
        await screen.findByDisplayValue(mockPet.adoptionFee)
      ).toBeInTheDocument();

      expect(await screen.findByText("Age")).toBeInTheDocument();
      expect(
        await screen.findByDisplayValue(
          toCapitalize(mockPet.characteristic.age)
        )
      ).toBeInTheDocument();

      expect(await screen.findByText("Gender")).toBeInTheDocument();
      expect(
        await screen.findByRole("radio", {
          name: toCapitalize(mockPet.characteristic.gender),
        })
      ).toBeChecked();

      expect(await screen.findByText("Size")).toBeInTheDocument();
      expect(
        await screen.findByDisplayValue(
          toCapitalize(mockPet.characteristic.size)
        )
      ).toBeInTheDocument();

      expect(await screen.findByText("Personality")).toBeInTheDocument();
      expect(
        await screen.findByDisplayValue(
          mockPet.characteristic.personality.join(", ")
        )
      ).toBeInTheDocument();

      expect(await screen.findByText("Coat Length")).toBeInTheDocument();
      expect(
        await screen.findByDisplayValue(mockPet.characteristic.coatLength)
      ).toBeInTheDocument();

      expect(await screen.findByText("House Trained")).toBeInTheDocument();
      expect(
        await screen.findByRole("radio", {
          name: mockPet.characteristic.houseTrained ? "Yes" : "No",
        })
      ).toBeInTheDocument();

      expect(await screen.findByText("Health")).toBeInTheDocument();
      expect(
        await screen.findByDisplayValue(
          mockPet.characteristic.health.join(", ")
        )
      ).toBeInTheDocument();

      expect(await screen.findByText("Image URL")).toBeInTheDocument();
      expect(
        await screen.findByDisplayValue(mockPet.image)
      ).toBeInTheDocument();
    });
  });

  describe("changing details of the pet", () => {
    describe("and submiting the changes", () => {
      test("update pet details", async () => {
        render(
          <PetsManagementEditForm pet={mockPet} setPetList={mockSetPetList} />,
          { wrapperProps: { apolloMocks } }
        );

        const fieldToBeChanged = await screen.findByDisplayValue(mockPet.name);

        userEvent.clear(fieldToBeChanged);
        userEvent.type(fieldToBeChanged, "changed name");
        userEvent.click(screen.getByText("Submit"));

        await waitFor(() => {
          expect(mockSetPetList).toHaveBeenCalledTimes(1);
        });
      });
    });

    describe("and clearing the changes", () => {
      test("reset all fields", async () => {
        render(
          <PetsManagementEditForm pet={mockPet} setPetList={mockSetPetList} />
        );

        const fieldToBeChanged = await screen.findByDisplayValue(mockPet.name);

        userEvent.clear(fieldToBeChanged);
        userEvent.type(fieldToBeChanged, "changed name");
        userEvent.click(screen.getByText("Reset"));

        await waitFor(async () => {
          expect(
            await screen.findByDisplayValue(mockPet.name)
          ).toBeInTheDocument();
        });

        await waitFor(() => {
          expect(
            screen.queryByDisplayValue("changed name")
          ).not.toBeInTheDocument();
        });
      });
    });
  });
});
