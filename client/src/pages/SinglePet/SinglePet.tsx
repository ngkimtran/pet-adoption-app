import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { GET_PET } from "../../queries/petQueries";
import PetDetails from "../../components/PetDetails/PetDetails";
import Loader from "../../components/Loader/Loader";
import AdoptionInstructions from "../../components/AdoptionInstructions/AdoptionInstructions";

const SinglePet = () => {
  const { id } = useParams();
  const { loading, error, data } = useQuery(GET_PET, {
    variables: { id: id?.substring(id.indexOf("-") + 1, id.length) },
  });

  return (
    <div style={{ minHeight: "50vh" }} className="container m-auto my-5 p-0">
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
        <div className="d-flex flex-column gap-5">
          <PetDetails pet={data.pet} />
          <AdoptionInstructions pet={data.pet} />
        </div>
      )}
    </div>
  );
};

export default SinglePet;
