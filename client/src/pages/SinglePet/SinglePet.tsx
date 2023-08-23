import { useParams, Link } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { GET_PET } from "../../queries/petQueries";
import PetDetails from "../../components/PetDetails/PetDetails";
import Loader from "../../components/Loader/Loader";

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
          <div className="m-auto d-flex flex-column align-items-center w-75 gap-4 px-3 py-5 text-center rounded background-primary">
            <h3 className="mb-3 fw-semibold text-white">
              Considering {data.pet.name} for adoption?
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
        </div>
      )}
    </div>
  );
};

export default SinglePet;
