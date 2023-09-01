import { useLazyQuery, useMutation } from "@apollo/client";
import { toast } from "react-toastify";
import { ERROR_TOAST_ID, SUCCESS_TOAST_ID } from "../../constants/constants";
import { DELETE_ANIMAL } from "../../mutations/animalMutations";
import { Animal, Pet } from "../../types/types";
import { GET_ANIMALS } from "../../queries/animalQueries";
import { DELETE_PET } from "../../mutations/petMutations";
import { GET_PETS } from "../../queries/petQueries";

type DeleteAnimalModalPropType = {
  animalToBeDeleted: Animal | undefined;
  setAnimalToBeDeleted: Function;
  setAnimalList: Function;
};

const DeleteAnimalModal = ({
  animalToBeDeleted,
  setAnimalToBeDeleted,
  setAnimalList,
}: DeleteAnimalModalPropType) => {
  const [getPets] = useLazyQuery(GET_PETS);

  const [deletePet] = useMutation(DELETE_PET, {
    onError: (error) => {
      toast.error(error.graphQLErrors[0].message, {
        toastId: ERROR_TOAST_ID,
        position: toast.POSITION.TOP_CENTER,
        theme: "colored",
        hideProgressBar: true,
      });
    },
  });

  const [deleteAnimal] = useMutation(DELETE_ANIMAL, {
    update: (cache) => {
      cache.updateQuery(
        {
          query: GET_ANIMALS,
        },
        () =>
          setAnimalList((prev: Animal[]) =>
            prev.filter((animal) => animal.id !== animalToBeDeleted?.id)
          )
      );
    },
    onCompleted: () => {
      setAnimalToBeDeleted(undefined);
      toast.success("Delete animal successfully!", {
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

  const handleDelete = async () => {
    if (animalToBeDeleted) {
      const result = await getPets({
        variables: {
          type: animalToBeDeleted?.name,
        },
      });

      if (!result.loading && !result.error && result.data)
        result.data.pets.forEach((pet: Pet) => {
          deletePet({
            variables: { id: pet.id },
          });
        });

      deleteAnimal({
        variables: { id: animalToBeDeleted?.id },
      });
    }
  };

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
              onClick={handleDelete}
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
