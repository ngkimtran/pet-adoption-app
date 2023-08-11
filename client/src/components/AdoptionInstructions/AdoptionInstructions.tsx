import { Pet } from "../../types/types";

type AdoptionInstructionsPropsType = {
  pet: Pet;
};

const AdoptionInstructions = ({ pet }: AdoptionInstructionsPropsType) => {
  return (
    <div className="d-flex gap-5 align-items-start">
      <div
        style={{ flex: ".4" }}
        className="text-center rounded shadow background-primary"
      >
        <h2 className="my-5 p-4 fw-bold text-white">
          Considering {pet.name} for adoption?
        </h2>
      </div>
      <div
        style={{ flex: ".6" }}
        className="d-flex flex-column p-4 align-items-center rounded shadow bg-white"
      >
        <h2 className="my-5 fw-bold text-uppercase">Lasdksjahdaskjdhasd</h2>
        <h2 className="my-5 fw-bold text-uppercase">Lasdksjahdaskjdhasd</h2>
      </div>
    </div>
  );
};

export default AdoptionInstructions;
