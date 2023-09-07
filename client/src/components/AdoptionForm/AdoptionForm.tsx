import { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { useRecoilState } from "recoil";
import { useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
import { useLazyQuery } from "@apollo/client";
import { userState } from "../../states/state";
import { GET_PET } from "../../queries/petQueries";
import { CREATE_CHECKOUT_SESSION } from "../../queries/paymentQueries";
import { ERROR_TOAST_ID, LOGO } from "../../constants/constants";
import { MdKeyboardArrowDown } from "react-icons/md";
import { Pet } from "../../types/types";

const AdoptionForm = () => {
  const [user] = useRecoilState(userState);
  const [searchParams] = useSearchParams();

  const [petId, setPetId] = useState<string>(
    searchParams.get("pet-id") ? searchParams.get("pet-id")! : ""
  );
  const [displayedPetName, setDisplayedPetName] = useState<string>("");

  const navigate = useNavigate();

  const [getPet, petQueryResult] = useLazyQuery(GET_PET);
  const [createCheckoutSession] = useLazyQuery(CREATE_CHECKOUT_SESSION, {
    onCompleted: (data) => {
      const { url } = JSON.parse(data.createCheckoutSession);
      window.location.replace(url);
    },
    onError: (error) => {
      toast.error(error.graphQLErrors[0].message, {
        toastId: ERROR_TOAST_ID,
        position: toast.POSITION.TOP_CENTER,
        theme: "colored",
        hideProgressBar: true,
        autoClose: 2000,
      });
    },
  });

  useEffect(() => {
    const fetchData = async () => {
      const { data, loading, error } = await getPet({
        variables: { id: petId },
      });
      if (!loading && !error && data) setDisplayedPetName(data.pet.name);
    };
    fetchData();
  }, [petId, getPet]);

  const handlePayment = async (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.preventDefault();

    if (!petQueryResult.data) {
      toast.error("Please select a pet you would like to adopt.", {
        toastId: ERROR_TOAST_ID,
        position: toast.POSITION.TOP_CENTER,
        theme: "colored",
        hideProgressBar: true,
        autoClose: 2000,
      });
    }

    if (petQueryResult.data)
      await createCheckoutSession({
        variables: {
          petName: petQueryResult.data.pet.name,
          adoptionFee: petQueryResult.data.pet.adoptionFee,
        },
      });
  };

  const handlePetSelect = (pet: Pet) => {
    setDisplayedPetName(pet.name);
    setPetId(pet.id);
  };

  return (
    <>
      <Helmet>
        <title>
          Adopt a pet{" "}
          {petQueryResult.data ? `- ${petQueryResult.data.pet.name}` : ""}
        </title>
      </Helmet>
      <div
        className="d-flex align-items-center justify-content-center"
        style={{ minHeight: "90vh" }}
      >
        <div
          className="container d-flex flex-column justify-content-center align-items-center bg-white p-5 m-5 rounded border shadow"
          style={{ width: "600px", minHeight: "50vh" }}
        >
          {!user && (
            <>
              <img src={LOGO} alt="" className="mb-3 logo opacity-75 w-50" />
              <h2 className="input-group-lg text-center text-dark fw-bold">
                Login to start adopting a pet!
              </h2>
              <div className="mt-5 mx-4 d-flex justify-content-center align-items-center gap-5 w-50">
                <button
                  onClick={() => navigate("/login")}
                  className="btn btn-primary w-100"
                >
                  Login
                </button>
                <button
                  onClick={() => navigate("/")}
                  className="btn btn-secondary w-100"
                >
                  Go back
                </button>
              </div>
            </>
          )}
          {user && (
            <form>
              <h2 className="input-group-lg text-center text-dark fw-bold">
                Submit your application
              </h2>
              <div className="mt-5 mx-4">
                <h6 className="mb-4 fw-bold text-uppercase text-black-50">
                  Contact info
                </h6>
                <div className="row gap-4">
                  <div className="mx-5 text-color-dark">
                    <span className="d-inline-block w-25 pe-2 fw-bold ">
                      First name
                    </span>
                    <span className="d-inline-block fs-5">
                      {user.firstname}
                    </span>
                  </div>
                  <div className="mx-5 text-color-dark">
                    <span className="d-inline-block w-25 pe-2 fw-bold ">
                      Last name
                    </span>
                    <span className="d-inline-block fs-5">{user.lastname}</span>
                  </div>
                  <div className="mx-5 text-color-dark">
                    <span className="d-inline-block w-25 pe-2 fw-bold ">
                      Email
                    </span>
                    <span className="d-inline-block fs-5">{user.email}</span>
                  </div>
                </div>
              </div>
              <div className="mt-5 mx-4">
                <h6 className="mb-4 fw-bold text-uppercase text-black-50">
                  I want to adopt
                </h6>
                <div className="mx-4 text-color-dark">
                  <div className="dropdown">
                    <div
                      role="button"
                      data-bs-toggle="dropdown"
                      data-bs-auto-close="outside"
                      aria-expanded="false"
                      className="d-flex align-items-center"
                    >
                      <input
                        type="text"
                        className="form-control p-3"
                        placeholder="Select a pet"
                        value={displayedPetName}
                        readOnly
                      />
                      <MdKeyboardArrowDown
                        role="button"
                        className="fs-5 d-flex align-items-center"
                        style={{ marginLeft: "-2.5rem" }}
                      />

                      <ul className="dropdown-menu w-100">
                        {user.favorites.map((fav) => (
                          <li
                            key={fav.id}
                            onClick={() => handlePetSelect(fav)}
                            className="dropdown-item px-4 py-3"
                          >
                            {fav.name}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
              <hr className="mt-5 mx-4" />
              <div className="mt-5 mx-4 d-flex justify-content-between align-items-center">
                <h6 className="mx-5 mb-4 fs-5 fw-bold">Adoption Fee:</h6>
                <span className="mx-5 mb-4 fs-5 fw-bold ">
                  {petQueryResult.data
                    ? `€${petQueryResult.data.pet.adoptionFee.toFixed(2)}`
                    : "€0.00"}
                </span>
              </div>
              <div className="mt-5 mx-4 d-flex justify-content-around align-items-center gap-5">
                <button
                  onClick={handlePayment}
                  className="btn btn-primary w-50 text-uppercase fw-semibold"
                >
                  Proceed to checkout
                </button>
                <button
                  onClick={() => navigate("/")}
                  className="btn btn-secondary w-50"
                >
                  Cancel the applicaion
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </>
  );
};

export default AdoptionForm;
