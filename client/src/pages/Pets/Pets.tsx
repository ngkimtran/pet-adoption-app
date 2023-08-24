import { useQuery } from "@apollo/client";
import { useParams } from "react-router-dom";
import { GET_PETS } from "../../queries/petQueries";
import PetList from "../../components/PetList/PetList";
import Loader from "../../components/Loader/Loader";
import Error from "../../components/Error/Error";

const Pets = () => {
  const { animal } = useParams();
  const { loading, error, data } = useQuery(GET_PETS, {
    variables: { type: animal },
  });

  return (
    <div className="container-fluid m-0 p-0">
      {loading && <Loader />}
      {error && <Error />}
      {!loading && !error && data && (
        <PetList pets={data?.pets} animal={animal} />
      )}
    </div>
  );
};

export default Pets;
