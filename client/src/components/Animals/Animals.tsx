import { Link } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { Animal } from "../../types/types";
import { GET_ANIMALS } from "../../queries/animalQueries";
import Loader from "../Loader/Loader";
import Error from "../Error/Error";

const Animals = () => {
  const { loading, error, data } = useQuery(GET_ANIMALS);

  return (
    <div className="container my-5">
      {loading && <Loader />}
      {error && <Error />}
      {!loading && !error && data && (
        <div className="d-flex flex-column align-items-center">
          <h1 className="text-color-primary">Choose your companion</h1>
          <div className="d-flex flex-wrap align-items-center justify-content-evenly gap-5 my-5">
            {data.animals.map((animal: Animal) => (
              <Link
                to={`/${animal.name}/browse-pets`}
                key={animal.id}
                className="cta-primary animal-type text-color-primary text-center text-decoration-none fw-bold fs-2 shadow rounded text-capitalize"
              >
                <p className="my-3">{animal.name}</p>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Animals;
