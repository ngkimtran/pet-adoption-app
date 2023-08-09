import { Link } from "react-router-dom";
import { gql, useQuery } from "@apollo/client";
import { Animal } from "../../types/types";
import "./Animals.css";

const GET_ANIMALS = gql`
  query getAnimals {
    animals {
      id
      name
      petCount
    }
  }
`;

const Animals = () => {
  const { loading, error, data } = useQuery(GET_ANIMALS);

  return (
    <div className="container my-5 d-flex justify-content-evenly">
      {loading && (
        <div
          className="text-color-primary spinner-border fs-2"
          style={{ width: "5rem", height: "5rem" }}
          role="status"
        >
          <span className="visually-hidden">Loading...</span>
        </div>
      )}
      {error && (
        <div className="alert alert-danger p-4 fw-semibold" role="alert">
          Something went wrong - please try again.
        </div>
      )}
      {!loading && !error && data && (
        <div className="d-flex flex-column align-items-center">
          <h1 className="text-color-primary">Choose your companion</h1>
          <div className="d-flex flex-wrap align-items-center justify-content-evenly gap-5 my-5">
            {data.animals.map((animal: Animal) => (
              <Link
                to={`/${animal.name}/browse-pets`}
                key={animal.id}
                className="animal-type text-color-primary text-center text-decoration-none fw-bold fs-2 shadow rounded text-capitalize"
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
