import { BsFillTrashFill } from "react-icons/bs";
import { Animal } from "../../types/types";

type AnimalsManagementRowPropType = {
  animal: Animal;
  setId: Function;
};

const AnimalsManagementRow = ({
  animal,
  setId,
}: AnimalsManagementRowPropType) => (
  <tr>
    <td className="p-3">{animal.id}</td>
    <td className="text-capitalize p-3">{animal.name}</td>
    <td className="p-3">{animal.petCount}</td>
    <td className="p-3">
      <BsFillTrashFill
        role="button"
        className="fs-5 text-danger"
        data-bs-toggle="modal"
        data-bs-target="#deleteAnimalModal"
        onClick={() => setId(animal.id)}
      />
    </td>
  </tr>
);

export default AnimalsManagementRow;
