import { useState } from "react";
import { toast } from "react-toastify";
import { useMutation } from "@apollo/client";
import { ADD_ANIMAL } from "../../mutations/animalMutations";
import { GET_ANIMALS } from "../../queries/animalQueries";
import { Animal } from "../../types/types";
import { ERROR_TOAST_ID, SUCCESS_TOAST_ID } from "../../constants/constants";

type AddAnimalModalPropType = {
  setAnimalList: Function;
};

const AddAnimalModal = ({ setAnimalList }: AddAnimalModalPropType) => {
  const [name, setName] = useState<string>("");

  const [addAnimal] = useMutation(ADD_ANIMAL, {
    update: (cache, response) => {
      cache.updateQuery(
        {
          query: GET_ANIMALS,
        },
        () =>
          setAnimalList((prev: Animal[]) => [...prev, response.data.addAnimal])
      );
    },
    onCompleted: () => {
      toast.success("Add animal successfully!", {
        toastId: SUCCESS_TOAST_ID,
        position: toast.POSITION.TOP_CENTER,
        theme: "colored",
        hideProgressBar: true,
        autoClose: 2000,
      });
      setName("");
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
      id="addAnimalModal"
      tabIndex={-1}
      aria-labelledby="addAnimalModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="addAnimalModalLabel">
              Add a new animal
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
                addAnimal({
                  variables: { name: name },
                })
              }
            >
              Add animal
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddAnimalModal;
