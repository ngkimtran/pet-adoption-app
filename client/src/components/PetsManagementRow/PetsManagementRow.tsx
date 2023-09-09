import { BsFillTrashFill } from "react-icons/bs";
import { MdKeyboardArrowDown } from "react-icons/md";
import { Pet } from "../../types/types";
import PetsManagementEditForm from "../PetsManagementEditForm/PetsManagementEditForm";

type PetsManagementRowPropType = {
  pet: Pet;
  setPetList: Function;
  setPetToBeDeleted: Function;
};

const PetsManagementRow = ({
  pet,
  setPetList,
  setPetToBeDeleted,
}: PetsManagementRowPropType) => (
  <>
    <tr
      data-testid="petManagementRow"
      key={pet.id}
      data-bs-toggle="collapse"
      data-bs-target={`#collapse-${pet.id}`}
      aria-expanded="false"
      aria-controls={`collapse-${pet.id}`}
    >
      <td className="p-3">
        <span className="d-inline-block" style={{ minWidth: "14rem" }}>
          {pet.id}
        </span>
        <MdKeyboardArrowDown className="icon-primary ms-3 fs-4" />
      </td>
      <td className="text-capitalize p-3">{pet.name}</td>
      <td className="text-capitalize p-3">{pet.type.name}</td>
      <td className="p-3">
        <BsFillTrashFill
          data-testid="deletePetBtn"
          role="button"
          className="fs-5 text-danger"
          data-bs-toggle="modal"
          data-bs-target="#deletePetModal"
          onClick={() => setPetToBeDeleted(pet.id)}
        />
      </td>
    </tr>

    {/* Accordion */}
    <tr
      className="collapse accordion-collapse"
      id={`collapse-${pet.id}`}
      data-bs-parent=".table"
    >
      <td className="p-3 edit-pet-form" colSpan={4}>
        <PetsManagementEditForm pet={pet} setPetList={setPetList} />
      </td>
    </tr>
  </>
);

export default PetsManagementRow;
