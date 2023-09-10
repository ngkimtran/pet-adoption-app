import { useMutation } from "@apollo/client";
import { toast } from "react-toastify";
import { ERROR_TOAST_ID, SUCCESS_TOAST_ID } from "../../constants/constants";
import { DELETE_PET } from "../../mutations/petMutations";
import { GET_PETS } from "../../queries/petQueries";
import { Pet } from "../../types/types";

type DeletePetModalPropType = {
  petToBeDeleted: string;
  setPetToBeDeleted: Function;
  setPetList: Function;
};

const DeletePetModal = ({
  petToBeDeleted,
  setPetToBeDeleted,
  setPetList,
}: DeletePetModalPropType) => {
  const [deletePet] = useMutation(DELETE_PET, {
    update: (cache) => {
      cache.updateQuery(
        {
          query: GET_PETS,
        },
        () =>
          setPetList((prev: Pet[]) =>
            prev.filter((pet) => pet.id !== petToBeDeleted)
          )
      );
    },
    onCompleted: () => {
      setPetToBeDeleted("");
      toast.success("Delete pet successfully!", {
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
      id="deletePetModal"
      tabIndex={-1}
      aria-labelledby="deletePetModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="deletePetModalLabel">
              Are you sure you want to delete this pet?
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
              permanently delete this pet and all its properties.
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
                deletePet({
                  variables: { id: petToBeDeleted },
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

export default DeletePetModal;
