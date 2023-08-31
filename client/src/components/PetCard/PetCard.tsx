import { Link } from "react-router-dom";
import { AiOutlineDoubleRight } from "react-icons/ai";
import { PLACEHOLDER_IMG } from "../../constants/constants";
import { Pet } from "../../types/types";
import { toCapitalize } from "../../utilities/utilities";

type PetCardrPropType = {
  pet: Pet;
  animal: string;
};

const PetCard = ({ pet, animal }: PetCardrPropType) => (
  <div className="col card p-0 mb-5" style={{ width: "18rem" }}>
    <Link
      to={`/browse-pets/${animal}/${pet.name.toLowerCase()}-${pet.id}`}
      className="text-decoration-none"
    >
      <img
        src={PLACEHOLDER_IMG}
        className="card-img-top object-fit-cover"
        style={{ width: "250px", height: "250px" }}
        alt=""
      />
      <div className="card-body pb-4 text-center">
        <h4 className="card-title text-color-secondary mb-3">{pet.name}</h4>
        <p
          className="text-color-dark card-text text-capitalize d-flex flex-column justify-content-between"
          style={{ minHeight: "5rem" }}
        >
          <span className="m-0 d-block">
            <span>{toCapitalize(pet.characteristic.age)}</span>
            <span className="px-2">&#x2022;</span>
            {pet.breed}
          </span>
          <span className="fw-semibold">{pet.location}</span>
        </p>
      </div>
    </Link>
    <Link
      to={`/browse-pets/${animal}/${pet.name.toLowerCase()}-${pet.id}`}
      className="card-footer btn btn-primary text-uppercase fw-semibold"
    >
      <AiOutlineDoubleRight /> details
    </Link>
  </div>
);

export default PetCard;
