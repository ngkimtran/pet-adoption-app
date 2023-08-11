import { Link } from "react-router-dom";
import { Pet } from "../../types/types";

type AdoptionInstructionsPropsType = {
  pet: Pet;
};

const AdoptionInstructions = ({ pet }: AdoptionInstructionsPropsType) => {
  return (
    <div className="m-auto d-flex flex-column align-items-center w-75 gap-4 px-3 py-5 text-center rounded background-primary">
      <h3 className="mb-3 fw-semibold text-white">
        Considering {pet.name} for adoption?
      </h3>
      <Link
        className="adopt-option w-50 py-2 cta-primary text-color-primary text-center text-decoration-none fw-bold fs-5 rounded-pill text-uppercase"
        to="/"
      >
        Fill the form
      </Link>
      <Link
        className="adopt-option w-50 py-2 cta-primary text-color-primary text-center text-decoration-none fw-bold fs-5 rounded-pill text-uppercase"
        to="/"
      >
        Read FAQs
      </Link>
    </div>
  );
};

export default AdoptionInstructions;
