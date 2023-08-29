import { AiOutlineDoubleRight } from "react-icons/ai";
import { Pet } from "../../types/types";
import { Link } from "react-router-dom";
import Filter from "../Filter/Filter";
import { PLACEHOLDER_IMG } from "../../constants/constants";

type PetListPropsType = {
  pets: Pet[];
  animal: string | undefined;
};

const PetList = ({ pets, animal }: PetListPropsType) => (
  <div>
    <div className="background-primary">
      <div
        style={{ padding: "0 6rem" }}
        className="fw-medium gap-5 py-1 text-color-dark fs-4"
      >
        <p className="my-3">
          <span className="fw-bold">{pets.length}</span>
          <span>
            {" "}
            {pets.length > 1 ? `${animal}s` : animal} available for adoptions.
          </span>
        </p>
      </div>
    </div>
    <div className="d-flex mx-3 align-items-start">
      <Filter flex={"0.25"} />
      <div
        style={{ flex: "0.75" }}
        className="row row-cols-auto gap-5 my-5 mr-5"
      >
        {pets.map((pet: Pet) => (
          <div key={pet.id} className="col card p-0" style={{ width: "18rem" }}>
            <Link
              to={`/${animal}/${pet.name.toLowerCase()}-${pet.id}`}
              className="text-decoration-none"
            >
              <img
                src={PLACEHOLDER_IMG}
                className="card-img-top object-fit-cover"
                style={{ width: "250px", height: "250px" }}
                alt=""
              />
              <div className="card-body pb-4 text-center">
                <h4 className="card-title text-color-secondary mb-3">
                  {pet.name}
                </h4>
                <p
                  className="text-color-dark card-text text-capitalize d-flex flex-column justify-content-between"
                  style={{ minHeight: "5rem" }}
                >
                  <span className="m-0 d-block">
                    {pet.characteristic.age}
                    <span className="px-2">&#x2022;</span>
                    {pet.breed}
                  </span>
                  <span className="fw-semibold">{pet.location}</span>
                </p>
              </div>
            </Link>
            <Link
              to={`/${animal}/${pet.name.toLowerCase()}-${pet.id}`}
              className="card-footer btn btn-primary text-uppercase fw-semibold"
            >
              <AiOutlineDoubleRight /> details
            </Link>
          </div>
        ))}
      </div>
    </div>
  </div>
);

export default PetList;
