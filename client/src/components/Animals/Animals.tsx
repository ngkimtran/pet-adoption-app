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
    <div className="container my-5 gap-5 d-flex flex-wrap align-items-center justify-content-evenly">
      {loading && (
        <div className="spinner-border spinner fs-2" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      )}
      {error && (
        <div className="alert alert-danger p-4 fw-semibold" role="alert">
          Something went wrong - please try again.
        </div>
      )}
      {!loading && !error && data && (
        <>
          {data.animals.map((animal: Animal) => (
            <Link
              to={`/${animal.name}/browse-pets`}
              key={animal.id}
              className="animal-type text-decoration-none fw-bold fs-2 text-center shadow bg-white rounded text-capitalize"
            >
              <p className="my-3">{animal.name}</p>
            </Link>
          ))}
        </>
      )}
    </div>
  );
};

export default Animals;
