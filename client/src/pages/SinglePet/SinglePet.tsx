import { useParams, Link, useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { useMutation, useQuery } from "@apollo/client";
import { Helmet } from "react-helmet";
import { GET_PET } from "../../queries/petQueries";
import { GET_USER } from "../../queries/userQueries";
import SinglePetDetails from "../../components/SinglePetDetails/SinglePetDetails";
import Loader from "../../components/Loader/Loader";
import Error from "../../components/Error/Error";
import { toCapitalize } from "../../utilities/utilities";
import { UPDATE_FAVORITE } from "../../mutations/userMutations";
import { userState } from "../../states/state";
import { User } from "../../types/types";

const SinglePet = () => {
  const [user, setUser] = useRecoilState<User | null>(userState);
  const navigate = useNavigate();
  const { id, animal } = useParams();
  const { loading, error, data } = useQuery(GET_PET, {
    variables: { id: id?.substring(id.indexOf("-") + 1, id.length) },
  });

  const [updateFavorite] = useMutation(UPDATE_FAVORITE, {
    update: (cache, response) => {
      cache.updateQuery(
        {
          query: GET_USER,
          variables: {
            username: user?.username,
          },
        },
        () => setUser(response.data.updateFavorite)
      );
    },
    onError: (error) => {
      if (error.graphQLErrors[0].message === "Login required")
        navigate("/login");
    },
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
                onClick={() =>
                  updateFavorite({ variables: { petId: data.pet.id } })
                }
                to={{
                  pathname: "/adopt",
                  search: `pet-id=${data.pet.id}`,
                }}
              >
                Fill the form
              </Link>
              <Link
                className="adopt-option w-50 py-2 cta-primary text-color-primary text-center text-decoration-none fw-bold fs-5 rounded-pill text-uppercase"
                to="/faq"
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
