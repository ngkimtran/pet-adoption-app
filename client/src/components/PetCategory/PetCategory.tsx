import { useState } from "react";
import { GET_ANIMALS } from "../../queries/animalQueries";
import { useQuery } from "@apollo/client";
import { Animal } from "../../types/types";
import { PiCat } from "react-icons/pi";
import { PiDog } from "react-icons/pi";
import { MdKeyboardArrowDown } from "react-icons/md";
import { toCapitalize } from "../../utilities/utilities";
import { useNavigate } from "react-router-dom";
import Loader from "../Loader/Loader";
import Error from "../Error/Error";

const PetCategory = () => {
  const [petCategory, setPetCategory] = useState<string>("Other pets");
  const { loading, error, data } = useQuery(GET_ANIMALS);
  const navigate = useNavigate();

  return (
    <>
      {loading && <Loader />}
      {error && <Error />}
      {!loading && !error && data && (
        <div
          className="container d-flex align-items-center justify-content-center"
          style={{ minHeight: "90vh" }}
        >
          <div
            className="d-flex flex-column gap-4 m-5 p-5 justify-content-center align-items-stretch bg-white rounded border shadow"
            style={{
              minWidth: "70vh",
              minHeight: "50vh",
            }}
          >
            <h2 className="text-center pt-5" style={{ flex: 0.25 }}>
              What kind of pets are you looking for?
            </h2>
            <div style={{ flex: 0.75 }}>
              <div>
                <div className="d-flex flex-column align-items-center">
                  <div>
                    <div className="d-flex flex-wrap align-items-center justify-content-evenly gap-5 my-5">
                      <div
                        data-testid="catOption"
                        onClick={() => setPetCategory("cat")}
                        className={`pet-option ${
                          petCategory === "cat" ? "pet-option-selected" : ""
                        }`}
                      >
                        <PiCat style={{ fontSize: "4rem" }} />
                        <p className="my-3">cat</p>
                      </div>
                      <div
                        data-testid="dogOption"
                        onClick={() => setPetCategory("dog")}
                        className={`pet-option ${
                          petCategory === "dog" ? "pet-option-selected" : ""
                        }`}
                      >
                        <PiDog style={{ fontSize: "4rem" }} />
                        <p className="my-3">dog</p>
                      </div>
                    </div>
                    <div className="dropdown text-capitalize">
                      <div
                        role="button"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                        className="bg-white border w-100 py-3 px-4 rounded d-flex justify-content-between align-items-center"
                      >
                        <span>Other pets</span>
                        <MdKeyboardArrowDown className="dropdown-toggle fs-4" />
                      </div>
                      <ul className="dropdown-menu w-100">
                        {data.animals
                          .filter(
                            (animal: Animal) =>
                              animal.name !== "cat" && animal.name !== "dog"
                          )
                          .map((animal: Animal) => (
                            <li
                              key={animal.id}
                              className={`dropdown-item px-4 py-3
                            ${
                              petCategory === animal.name
                                ? "pet-option-dropdown-selected"
                                : ""
                            }`}
                              onClick={() => setPetCategory(animal.name)}
                            >
                              <input
                                className="form-check-input me-3"
                                type="radio"
                                name={animal.name}
                                id={animal.name}
                                checked={petCategory === animal.name}
                                readOnly
                              />
                              <label
                                className="form-check-label"
                                htmlFor={animal.name}
                              >
                                {toCapitalize(animal.name)}
                              </label>
                            </li>
                          ))}
                      </ul>
                    </div>

                    <div className="text-end pt-5">
                      <button
                        className="btn btn-primary px-5 py-3 rounded-pill  text-uppercase fw-bold"
                        style={{ letterSpacing: ".5px", fontSize: "1.2rem" }}
                        onClick={() => navigate(`/browse-pets/${petCategory}`)}
                        disabled={petCategory === "Other pets" ? true : false}
                      >
                        Find pets
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default PetCategory;
