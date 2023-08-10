import { useQuery } from "@apollo/client";
import { useParams } from "react-router-dom";
import { GET_PETS } from "../../queries/petQueries";
import PetList from "../../components/PetList/PetList";
import Loader from "../../components/Loader/Loader";

const Pets = () => {
  const { animal } = useParams();
  const { loading, error, data } = useQuery(GET_PETS, {
    variables: { type: animal },
  });

  return (
    <div className="container-fluid m-0 p-0">
      {loading && <Loader />}
      {error && (
        <div
          className="alert alert-danger p-4 m-5 fw-semibold text-center"
          role="alert"
        >
          Something went wrong - please try again.
        </div>
      )}
      {!loading && !error && data && (
        <PetList pets={data?.pets} animal={animal} />
      )}
    </div>
  );
};

export default Pets;
