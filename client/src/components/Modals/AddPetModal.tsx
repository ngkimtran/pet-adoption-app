import { useState } from "react";
import { toast } from "react-toastify";
import { useMutation } from "@apollo/client";
import {
  ERROR_TOAST_ID,
  SUCCESS_TOAST_ID,
  GENDER,
  AGE,
  SIZE,
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
  const [age, setAge] = useState<AGE | string>("");
  const [gender, setGender] = useState<GENDER>(GENDER.MALE);
  const [size, setSize] = useState<SIZE | string>("");
  const [personality, setPersonality] = useState<string[]>([""]);
  const [coatLength, setCoatLength] = useState<string>("");
  const [houseTrained, setHouseTrained] = useState<boolean>(false);
  const [health, setHealth] = useState<string[]>([""]);
  const [image, setImage] = useState<string>("");

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

      setName("");
      setType("");
      setBreed("");
      setLocation("");
      setDescription("");
      setAdoptionFee(0);
      setAge("");
      setGender(GENDER.MALE);
      setSize("");
      setPersonality([""]);
      setCoatLength("");
      setHouseTrained(false);
      setHealth([""]);
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
                min={0}
                value={adoptionFee}
                onChange={({ target }) => setAdoptionFee(Number(target.value))}
                required
              />
            </div>
            <div className="mb-3 input-group-lg">
              <label htmlFor="age" className="form-label">
                Age
              </label>
              <select
                data-testid="addPetModalAge"
                className="form-select"
                id="age"
                defaultValue=""
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
                <option value={AGE.SENIOR}>Senior</option>
              </select>
            </div>
            <div className="mb-3 input-group-lg">
              <label htmlFor="gender" className="form-label">
                Gender
              </label>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  name="gender-male"
                  id="gender-male"
                  checked={gender === GENDER.MALE}
                  onChange={() => setGender(GENDER.MALE)}
                />
                <label className="form-check-label" htmlFor="gender-male">
                  Male
                </label>
              </div>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  name="gender-female"
                  id="gender-female"
                  checked={gender === GENDER.FEMALE}
                  onChange={() => setGender(GENDER.FEMALE)}
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
              <select
                data-testid="addPetModalSize"
                className="form-select"
                id="size"
                defaultValue=""
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
                  name="houseTrained-yes"
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
                  name="houseTrained-no"
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
            <div className="mb-3 input-group-lg">
              <label htmlFor="image" className="form-label">
                Image URL
              </label>
              <input
                id="image"
                type="url"
                className="form-control"
                value={image}
                onChange={({ target }) => setImage(target.value)}
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
                    image,
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
