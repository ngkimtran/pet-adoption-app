import { useMutation } from "@apollo/client";
import { useState } from "react";
import { toast } from "react-toastify";
import {
  ERROR_TOAST_ID,
  SUCCESS_TOAST_ID,
  GENDER,
  AGE,
  SIZE,
} from "../../constants/constants";
import { Pet } from "../../types/types";
import { UPDATE_PET } from "../../mutations/petMutations";
import { GET_PETS } from "../../queries/petQueries";

type PetsManagementEditFormPropType = {
  pet: Pet;
  setPetList: Function;
};

const PetsManagementEditForm = ({
  pet,
  setPetList,
}: PetsManagementEditFormPropType) => {
  const [name, setName] = useState<string>(pet.name);
  const [type, setType] = useState<string>(pet.type.name);
  const [breed, setBreed] = useState<string>(pet.breed);
  const [location, setLocation] = useState<string>(pet.location);
  const [description, setDescription] = useState<string>(pet.description);
  const [adoptionFee, setAdoptionFee] = useState<number>(pet.adoptionFee);
  const [age, setAge] = useState<AGE | string>(pet.characteristic.age);
  const [gender, setGender] = useState<GENDER>(pet.characteristic.gender);
  const [size, setSize] = useState<SIZE | string>(pet.characteristic.size);
  const [personality, setPersonality] = useState<string[]>(
    pet.characteristic.personality
  );
  const [coatLength, setCoatLength] = useState<string>(
    pet.characteristic.coatLength
  );
  const [houseTrained, setHouseTrained] = useState<boolean>(
    pet.characteristic.houseTrained
  );
  const [health, setHealth] = useState<string[]>(pet.characteristic.health);
  const [image, setImage] = useState<string>(pet.image);

  const [updatePet, res] = useMutation(UPDATE_PET, {
    update: (cache, response) => {
      cache.updateQuery(
        {
          query: GET_PETS,
        },
        () =>
          setPetList((prev: Pet[]) => [
            ...prev.filter((pet) => pet.id !== response.data.updatePet.id),
            response.data.updatePet,
          ])
      );
    },
    onCompleted: () => {
      toast.success("Update pet successfully!", {
        toastId: SUCCESS_TOAST_ID,
        position: toast.POSITION.TOP_CENTER,
        theme: "colored",
        hideProgressBar: true,
        autoClose: 2000,
      });
    },
    onError: (error) => {
      toast.error(error.graphQLErrors[0].message, {
        toastId: ERROR_TOAST_ID,
        position: toast.POSITION.TOP_CENTER,
        theme: "colored",
        hideProgressBar: true,
      });
    },
  });

  const handleReset = () => {
    setName(pet.name);
    setType(pet.type.name);
    setBreed(pet.breed);
    setLocation(pet.location);
    setDescription(pet.description);
    setAdoptionFee(pet.adoptionFee);
    setAge(pet.characteristic.age);
    setGender(pet.characteristic.gender);
    setSize(pet.characteristic.size);
    setPersonality(pet.characteristic.personality);
    setCoatLength(pet.characteristic.coatLength);
    setHouseTrained(pet.characteristic.houseTrained);
    setHealth(pet.characteristic.health);
    setImage(pet.image);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    await updatePet({
      variables: {
        id: pet.id,
        type,
        name,
        breed,
        location,
        description,
        adoptionFee,
        age,
        gender,
        size,
        personality: personality.filter((item) => item !== ""),
        coatLength,
        houseTrained,
        health: health.filter((item) => item !== ""),
        image,
      },
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="row align-items-center mt-2 mb-3 ms-4 gap-2">
        <div className="col-lg-2">
          <label htmlFor={`${pet.id}-name`} className="form-label fw-semibold">
            Name
          </label>
        </div>
        <div className="col-lg-7">
          <input
            type="text"
            className="form-control"
            id={`${pet.id}-name`}
            value={name}
            onChange={({ target }) => setName(target.value)}
            required
          />
        </div>
      </div>
      <div className="row align-items-center mt-2 mb-3 ms-4 gap-2">
        <div className="col-lg-2">
          <label htmlFor={`${pet.id}-type`} className="form-label fw-semibold">
            Type
          </label>
        </div>
        <div className="col-lg-7">
          <input
            type="text"
            className="form-control"
            id={`${pet.id}-type`}
            value={type}
            onChange={({ target }) => setType(target.value)}
            required
          />
        </div>
      </div>
      <div className="row align-items-center mt-2 mb-3 ms-4 gap-2">
        <div className="col-lg-2">
          <label htmlFor={`${pet.id}-breed`} className="form-label fw-semibold">
            Breed
          </label>
        </div>
        <div className="col-lg-7">
          <input
            type="text"
            className="form-control"
            id={`${pet.id}-breed`}
            value={breed}
            onChange={({ target }) => setBreed(target.value)}
            required
          />
        </div>
      </div>
      <div className="row align-items-center mt-2 mb-3 ms-4 gap-2">
        <div className="col-lg-2">
          <label
            htmlFor={`${pet.id}-location`}
            className="form-label fw-semibold"
          >
            Location
          </label>
        </div>
        <div className="col-lg-7">
          <input
            type="text"
            className="form-control"
            id={`${pet.id}-location`}
            value={location}
            onChange={({ target }) => setLocation(target.value)}
            required
          />
        </div>
      </div>
      <div className="row align-items-center mt-2 mb-3 ms-4 gap-2">
        <div className="col-lg-2">
          <label
            htmlFor={`${pet.id}-description`}
            className="form-label fw-semibold"
          >
            Description
          </label>
        </div>
        <div className="col-lg-7">
          <textarea
            className="form-control"
            style={{ height: "12rem" }}
            id={`${pet.id}-description`}
            value={description}
            onChange={({ target }) => setDescription(target.value)}
            required
          />
        </div>
      </div>
      <div className="row align-items-center mt-2 mb-3 ms-4 gap-2">
        <div className="col-lg-2">
          <label
            htmlFor={`${pet.id}-adoptionFee`}
            className="form-label fw-semibold"
          >
            Adoption Fee
          </label>
        </div>
        <div className="col-lg-7">
          <input
            type="number"
            className="form-control"
            id={`${pet.id}-adoptionFee`}
            min={0}
            value={adoptionFee}
            onChange={({ target }) => setAdoptionFee(Number(target.value))}
            required
          />
        </div>
      </div>
      <div className="row align-items-center mt-2 mb-3 ms-4 gap-2">
        <div className="col-lg-2">
          <label htmlFor={`${pet.id}-age`} className="form-label fw-semibold">
            Age
          </label>
        </div>
        <div className="col-lg-7">
          <select
            className="form-select"
            id={`${pet.id}-age`}
            defaultValue={age}
            onChange={(event: React.ChangeEvent<HTMLSelectElement>) =>
              setAge(event.target.value)
            }
            required
          >
            <option value="" disabled>
              Select age
            </option>
            <option value={AGE.BABY}>Baby</option>
            <option value={AGE.YOUNG}>Young</option>
            <option value={AGE.ADULT}>Adult</option>
            <option value={AGE.SENIOR}>Senior </option>
          </select>
        </div>
      </div>
      <div className="row align-items-center mt-2 mb-3 ms-4 gap-2">
        <div className="col-lg-2">
          <label
            htmlFor={`${pet.id}-gender`}
            className="form-label fw-semibold"
          >
            Gender
          </label>
        </div>
        <div className="col-lg-7">
          <div className="form-check">
            <input
              className="form-check-input"
              type="radio"
              name={`${pet.id}-gender-male`}
              id={`${pet.id}-gender-male`}
              checked={gender === GENDER.MALE}
              onChange={() => setGender(GENDER.MALE)}
            />
            <label
              className="form-check-label"
              htmlFor={`${pet.id}-gender-male`}
            >
              Male
            </label>
          </div>
          <div className="form-check">
            <input
              className="form-check-input"
              type="radio"
              name={`${pet.id}-gender-female`}
              id={`${pet.id}-gender-female`}
              checked={gender === GENDER.FEMALE}
              onChange={() => setGender(GENDER.FEMALE)}
            />
            <label
              className="form-check-label"
              htmlFor={`${pet.id}-gender-female`}
            >
              Female
            </label>
          </div>
        </div>
      </div>
      <div className="row align-items-center mt-2 mb-3 ms-4 gap-2">
        <div className="col-lg-2">
          <label htmlFor={`${pet.id}-size`} className="form-label fw-semibold">
            Size
          </label>
        </div>
        <div className="col-lg-7">
          <select
            className="form-select"
            id={`${pet.id}-size`}
            defaultValue={size}
            onChange={(event: React.ChangeEvent<HTMLSelectElement>) =>
              setSize(event.target.value)
            }
            required
          >
            <option value="" disabled>
              Select size
            </option>
            <option value={SIZE.SMALL}>Small</option>
            <option value={SIZE.MEDIUM}>Medium</option>
            <option value={SIZE.LARGE}>Large</option>
            <option value={SIZE.EXTRALARGE}>Extra Large</option>
          </select>
        </div>
      </div>
      <div className="row align-items-center mt-2 mb-3 ms-4 gap-2">
        <div className="col-lg-2">
          <label
            htmlFor={`${pet.id}-personality`}
            className="form-label fw-semibold"
          >
            Personality
          </label>
        </div>
        <div className="col-lg-7">
          <input
            type="text"
            className="form-control"
            id={`${pet.id}-personality`}
            value={personality.join(", ")}
            onChange={({ target }) => setPersonality(target.value.split(", "))}
            required
          />
        </div>
      </div>
      <div className="row align-items-center mt-2 mb-3 ms-4 gap-2">
        <div className="col-lg-2">
          <label
            htmlFor={`${pet.id}-coatLength`}
            className="form-label fw-semibold"
          >
            Coat Length
          </label>
        </div>
        <div className="col-lg-7">
          <input
            type="text"
            className="form-control"
            id={`${pet.id}-coatLength`}
            value={coatLength}
            onChange={({ target }) => setCoatLength(target.value)}
            required
          />
        </div>
      </div>
      <div className="row align-items-center mt-2 mb-3 ms-4 gap-2">
        <div className="col-lg-2">
          <label
            htmlFor={`${pet.id}-houseTrained`}
            className="form-label fw-semibold"
          >
            House Trained
          </label>
        </div>
        <div className="col-lg-7">
          <div className="form-check">
            <input
              className="form-check-input"
              type="radio"
              name={`${pet.id}-houseTrained-yes`}
              id={`${pet.id}-houseTrained-yes`}
              checked={houseTrained}
              onChange={() => setHouseTrained(true)}
            />
            <label
              className="form-check-label"
              htmlFor={`${pet.id}-houseTrained-yes`}
            >
              Yes
            </label>
          </div>
          <div className="form-check">
            <input
              className="form-check-input"
              type="radio"
              name={`${pet.id}-houseTrained-no`}
              id={`${pet.id}-houseTrained-no`}
              checked={!houseTrained}
              onChange={() => setHouseTrained(false)}
            />
            <label
              className="form-check-label"
              htmlFor={`${pet.id}-houseTrained-no`}
            >
              No
            </label>
          </div>
        </div>
      </div>
      <div className="row align-items-center mt-2 mb-3 ms-4 gap-2">
        <div className="col-lg-2">
          <label
            htmlFor={`${pet.id}-health`}
            className="form-label fw-semibold"
          >
            Health
          </label>
        </div>
        <div className="col-lg-7">
          <input
            type="text"
            className="form-control"
            id={`${pet.id}-health`}
            value={health.join(", ")}
            onChange={({ target }) => setHealth(target.value.split(", "))}
            required
          />
        </div>
      </div>
      <div className="row align-items-center mt-2 mb-3 ms-4 gap-2">
        <div className="col-lg-2">
          <label htmlFor={`${pet.id}-image`} className="form-label fw-semibold">
            Image URL
          </label>
        </div>
        <div className="col-lg-7">
          <input
            type="url"
            className="form-control"
            id={`${pet.id}-image`}
            value={image}
            onChange={({ target }) => setImage(target.value)}
            required
          />
        </div>
      </div>

      <div className="d-flex justify-content-start mt-5 mb-4 ms-4 gap-4">
        <button
          type="reset"
          onClick={handleReset}
          className="btn btn-secondary px-4 py-2"
        >
          Reset
        </button>
        <button type="submit" className="btn btn-primary px-4 py-2">
          Submit
        </button>
      </div>
    </form>
  );
};

export default PetsManagementEditForm;
