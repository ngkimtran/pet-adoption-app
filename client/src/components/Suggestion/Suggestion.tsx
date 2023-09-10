import { useQuery } from "@apollo/client";
import { GET_PETS } from "../../queries/petQueries";
import { Pet } from "../../types/types";
import PetCard from "../PetCard/PetCard";
import { Link } from "react-router-dom";
import { LOGO_ALT } from "../../constants/constants";

const Suggestion = () => {
  const petsQueryResult = useQuery(GET_PETS);

  return (
    <>
      {!petsQueryResult.loading &&
        !petsQueryResult.error &&
        petsQueryResult.data && (
          <div className="container-fluid my-5 d-flex flex-column align-items-center justify-content-center">
            <h1 className="text-color-primary text-capitalize">
              Pets available for adoption
            </h1>
            <div className="row row-cols-auto gap-5 justify-content-center my-5">
              {petsQueryResult.data.pets.slice(0, 3).map((pet: Pet) => (
                <PetCard key={pet.id} pet={pet} animal={pet.type.name} />
              ))}
              <div
                className="col card p-0 mb-5 rounded"
                style={{ width: "18rem" }}
              >
                <Link
                  data-testid="browseAllLink"
                  to={`/browse-pets/cat`}
                  className="background-primary text-decoration-none card-body pb-4 text-center d-flex flex-column align-items-center justify-content-center"
                >
                  <img
                    src={LOGO_ALT}
                    className="object-fit-cover"
                    style={{ width: "150px", height: "150px" }}
                    alt=""
                  />
                  <h5 className="card-title text-white m-3">
                    And {petsQueryResult.data.pets.length} more pets available.
                  </h5>
                </Link>
                <Link
                  data-testid="browseAllLink"
                  to={`/browse-pets/cat`}
                  className="fs-5 py-4 border-top border-white card-footer btn btn-primary text-uppercase fw-semibold"
                >
                  Meet them now
                </Link>
              </div>{" "}
            </div>
          </div>
        )}
    </>
  );
};

export default Suggestion;
