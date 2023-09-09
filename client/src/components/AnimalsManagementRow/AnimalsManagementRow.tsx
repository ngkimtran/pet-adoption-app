import { BsFillTrashFill } from "react-icons/bs";
import { Animal } from "../../types/types";

type AnimalsManagementRowPropType = {
  animal: Animal;
  setAnimalToBeDeleted: Function;
};

const AnimalsManagementRow = ({
  animal,
  setAnimalToBeDeleted,
}: AnimalsManagementRowPropType) => (
  <tr data-testid="animalManagementRow">
    <td className="p-3">{animal.id}</td>
    <td className="text-capitalize p-3">{animal.name}</td>
    <td className="p-3">{animal.petCount}</td>
    <td className="p-3">
      <BsFillTrashFill
        data-testid="deleteAnimalBtn"
        role="button"
        className="fs-5 text-danger"
        data-bs-toggle="modal"
        data-bs-target="#deleteAnimalModal"
        onClick={() => setAnimalToBeDeleted(animal)}
      />
    </td>
  </tr>
);

export default AnimalsManagementRow;
