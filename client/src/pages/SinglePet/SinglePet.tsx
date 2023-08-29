import { useParams, Link } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { Helmet } from "react-helmet";
import { GET_PET } from "../../queries/petQueries";
import SinglePetDetails from "../../components/SinglePetDetails/SinglePetDetails";
import Loader from "../../components/Loader/Loader";
import Error from "../../components/Error/Error";
import { toCapitalize } from "../../utilities/utilities";

const SinglePet = () => {
  const { id, animal } = useParams();
  const { loading, error, data } = useQuery(GET_PET, {
    variables: { id: id?.substring(id.indexOf("-") + 1, id.length) },
  });

  return (
    <div style={{ minHeight: "50vh" }} className="container m-auto my-5 p-0">
      {loading && <Loader />}
      {error && <Error />}
      {!loading && !error && data && (
        <>
          <Helmet>
            <title>
              {toCapitalize(animal ? animal : "pet")} for adoption -{" "}
              {data.pet.name}
            </title>
          </Helmet>
          <div className="d-flex flex-column gap-5">
            <SinglePetDetails pet={data.pet} />
            <div className="m-auto d-flex flex-column align-items-center w-75 gap-4 px-3 py-5 text-center rounded background-primary">
              <h3 className="mb-3 fw-semibold text-white">
                Considering {data.pet.name} for adoption?
              </h3>
              <Link
                className="adopt-option w-50 py-2 cta-primary text-color-primary text-center text-decoration-none fw-bold fs-5 rounded-pill text-uppercase"
                to="/adopt"
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
        </>
      )}
    </div>
  );
};

export default SinglePet;
