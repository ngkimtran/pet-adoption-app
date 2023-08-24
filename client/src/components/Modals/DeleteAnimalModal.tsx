import { useMutation } from "@apollo/client";
import { toast } from "react-toastify";
import { ERROR_TOAST_ID, SUCCESS_TOAST_ID } from "../../constants/constants";
import { DELETE_ANIMAL } from "../../mutations/animalMutations";
import { Animal } from "../../types/types";
import { GET_ANIMALS } from "../../queries/animalQueries";

type AddAnimalModalPropType = {
  id: string;
  setId: Function;
  setAnimalList: Function;
};

const DeleteAnimalModal = ({
  id,
  setId,
  setAnimalList,
}: AddAnimalModalPropType) => {
  const [deleteAnimal] = useMutation(DELETE_ANIMAL, {
    update: (cache) => {
      cache.updateQuery(
        {
          query: GET_ANIMALS,
        },
        () =>
          setAnimalList((prev: Animal[]) =>
            prev.filter((animal) => animal.id !== id)
          )
      );
    },
    onCompleted: () => {
      setId("");
      toast.success("Add animal successfully!", {
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
      id="deleteAnimalModal"
      tabIndex={-1}
      aria-labelledby="deleteAnimalModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="deleteAnimalModalLabel">
              Are you sure you want to delete this animal?
            </h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">
            <p className="m-0">
              <span className="fw-bold fs-5">Warning!</span> Doing so will
              delete all pets belong to this animal type.
            </p>
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
              className="btn btn-danger"
              data-bs-dismiss="modal"
              onClick={() =>
                deleteAnimal({
                  variables: { id },
                })
              }
            >
              Confirm Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteAnimalModal;
