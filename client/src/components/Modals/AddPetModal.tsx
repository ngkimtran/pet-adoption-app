import { useState } from "react";
import { toast } from "react-toastify";
import { useMutation } from "@apollo/client";
import {
  ERROR_TOAST_ID,
  Gender,
  SUCCESS_TOAST_ID,
} from "../../constants/constants";
import { ADD_PET } from "../../mutations/petMutations";
import { GET_PETS } from "../../queries/petQueries";
import { Pet } from "../../types/types";

type AddPetModalPropType = {
  setPetList: Function;
};

const AddPetModal = ({ setPetList }: AddPetModalPropType) => {
  const [name, setName] = useState<string>("");
  const [type, setType] = useState<string>("");
  const [breed, setBreed] = useState<string>("");
  const [location, setLocation] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [adoptionFee, setAdoptionFee] = useState<number>(0);
  const [age, setAge] = useState<string>("");
  const [gender, setGender] = useState<Gender>(Gender.MALE);
  const [size, setSize] = useState<string>("");
  const [personality, setPersonality] = useState<string[]>([""]);
  const [coatLength, setCoatLength] = useState<string>("");
  const [houseTrained, setHouseTrained] = useState<boolean>(false);
  const [health, setHealth] = useState<string[]>([""]);

  const [addPet] = useMutation(ADD_PET, {
    update: (cache, response) => {
      cache.updateQuery(
        {
          query: GET_PETS,
        },
        () => setPetList((prev: Pet[]) => [...prev, response.data.addPet])
      );
    },
    onCompleted: () => {
      toast.success("Add pet successfully!", {
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

  return (
    <div
      className="modal fade"
      id="addPetModal"
      tabIndex={-1}
      aria-labelledby="addPetModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="addPetModalLabel">
              Add a new pet
            </h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">
            <div className="mb-3 input-group-lg">
              <label htmlFor="name" className="form-label">
                Name
              </label>
              <input
                id="name"
                type="text"
                className="form-control"
                value={name}
                onChange={({ target }) => setName(target.value)}
                required
              />
            </div>
            <div className="mb-3 input-group-lg">
              <label htmlFor="type" className="form-label">
                Type
              </label>
              <input
                id="type"
                type="text"
                className="form-control"
                value={type}
                onChange={({ target }) => setType(target.value)}
                required
              />
            </div>
            <div className="mb-3 input-group-lg">
              <label htmlFor="breed" className="form-label">
                Breed
              </label>
              <input
                id="breed"
                type="text"
                className="form-control"
                value={breed}
                onChange={({ target }) => setBreed(target.value)}
                required
              />
            </div>
            <div className="mb-3 input-group-lg">
              <label htmlFor="location" className="form-label">
                Location
              </label>
              <input
                id="location"
                type="text"
                className="form-control"
                value={location}
                onChange={({ target }) => setLocation(target.value)}
                required
              />
            </div>
            <div className="mb-3 input-group-lg">
              <label htmlFor="description" className="form-label">
                Description
              </label>
              <textarea
                id="description"
                className="form-control"
                style={{ height: "12rem" }}
                value={description}
                onChange={({ target }) => setDescription(target.value)}
                required
              />
            </div>
            <div className="mb-3 input-group-lg">
              <label htmlFor="adoptionFee" className="form-label">
                Adoption Fee
              </label>
              <input
                id="adoptionFee"
                type="number"
                className="form-control"
                value={adoptionFee}
                onChange={({ target }) => setAdoptionFee(Number(target.value))}
                required
              />
            </div>
            <div className="mb-3 input-group-lg">
              <label htmlFor="age" className="form-label">
                Age
              </label>
              <input
                id="age"
                type="text"
                className="form-control"
                value={age}
                onChange={({ target }) => setAge(target.value)}
                required
              />
            </div>
            <div className="mb-3 input-group-lg">
              <label htmlFor="gender" className="form-label">
                Gender
              </label>
              <div className="form-check">
                <input
                  id="gender-male"
                  type="radio"
                  className="form-check-input"
                  name="gender"
                  checked={gender === Gender.MALE}
                  onChange={() => setGender(Gender.MALE)}
                  required
                />
                <label className="form-check-label" htmlFor="gender-male">
                  Male
                </label>
              </div>
              <div className="form-check">
                <input
                  id="gender-female"
                  type="radio"
                  className="form-check-input"
                  name="gender"
                  checked={gender === Gender.FEMALE}
                  onChange={() => setGender(Gender.FEMALE)}
                  required
                />
                <label className="form-check-label" htmlFor="gender-female">
                  Female
                </label>
              </div>
            </div>
            <div className="mb-3 input-group-lg">
              <label htmlFor="size" className="form-label">
                Size
              </label>
              <input
                id="size"
                type="text"
                className="form-control"
                value={size}
                onChange={({ target }) => setSize(target.value)}
                required
              />
            </div>
            <div className="mb-3 input-group-lg">
              <label htmlFor="personality" className="form-label">
                Personality
              </label>
              <input
                id="personality"
                type="text"
                className="form-control"
                value={personality.join(", ")}
                onChange={({ target }) =>
                  setPersonality(target.value.split(", "))
                }
                required
              />
            </div>
            <div className="mb-3 input-group-lg">
              <label htmlFor="coatLength" className="form-label">
                Coat Length
              </label>
              <input
                id="coatLength"
                type="text"
                className="form-control"
                value={coatLength}
                onChange={({ target }) => setCoatLength(target.value)}
                required
              />
            </div>
            <div className="mb-3 input-group-lg">
              <label htmlFor="houseTrained" className="form-label">
                House Trained
              </label>
              <div className="form-check">
                <input
                  id="houseTrained-yes"
                  type="radio"
                  className="form-check-input"
                  name="houseTrained"
                  checked={houseTrained}
                  onChange={() => setHouseTrained(true)}
                  required
                />
                <label className="form-check-label" htmlFor="houseTrained-yes">
                  Yes
                </label>
              </div>
              <div className="form-check">
                <input
                  id="houseTrained-no"
                  type="radio"
                  className="form-check-input"
                  name="houseTrained"
                  checked={!houseTrained}
                  onChange={() => setHouseTrained(false)}
                  required
                />
                <label className="form-check-label" htmlFor="houseTrained-no">
                  No
                </label>
              </div>
            </div>
            <div className="mb-3 input-group-lg">
              <label htmlFor="health" className="form-label">
                Health
              </label>
              <input
                id="health"
                type="text"
                className="form-control"
                value={health.join(", ")}
                onChange={({ target }) => setHealth(target.value.split(", "))}
                required
              />
            </div>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              Close
            </button>
            <button
              type="button"
              className="btn btn-primary"
              data-bs-dismiss="modal"
              onClick={() =>
                addPet({
                  variables: {
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
                  },
                })
              }
            >
              Add pet
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddPetModal;
