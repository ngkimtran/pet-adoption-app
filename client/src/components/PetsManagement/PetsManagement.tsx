import { useState, useEffect } from "react";
import { useLazyQuery, useQuery } from "@apollo/client";
import { BsFillTrashFill } from "react-icons/bs";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { MdKeyboardArrowDown } from "react-icons/md";
import { Pet } from "../../types/types";
import { GET_PET, GET_PETS } from "../../queries/petQueries";
import Loader from "../Loader/Loader";
import Error from "../Error/Error";
import AddAnimalModal from "../Modals/AddAnimalModal";
import DeleteAnimalModal from "../Modals/DeleteAnimalModal";
import PetsManagementEditForm from "../PetsManagementEditForm/PetsManagementEditForm";

const PetsManagement = () => {
  const [searchInput, setSearchInput] = useState<string>("");
  const [id, setId] = useState<string>("");
  const [petList, setPetList] = useState<Pet[]>([]);

  const petsQueryResult = useQuery(GET_PETS);
  const [getPet, petQueryResult] = useLazyQuery(GET_PET);

  useEffect(() => {
    const fetchData = async () => {
      if (
        !petsQueryResult.loading &&
        !petsQueryResult.error &&
        petsQueryResult.data
      )
        setPetList(petsQueryResult.data.pets);
      if (
        !petQueryResult.loading &&
        !petQueryResult.error &&
        petQueryResult.data
      )
        setPetList([petQueryResult.data.pet]);
      if (searchInput.length > 0 && !petQueryResult.data) setPetList([]);
    };
    fetchData();
  }, [petQueryResult, petsQueryResult]); //eslint-disable-line

  return (
    <>
      {petsQueryResult.loading && <Loader />}
      {petsQueryResult.error && <Error />}
      {petList && (
        <>
          <div className="p-3 mt-3 mb-5 d-flex w-100 justify-content-between align-items-center">
            <h3 className="fw-bold text-secondary" style={{ flex: "0.4" }}>
              List of pets
            </h3>
            <div
              className="d-flex gap-4 w-100 justify-content-end align-items-center"
              style={{ flex: "0.7" }}
            >
              <div className="input-group" style={{ flex: "0.6" }}>
                <input
                  type="text"
                  className="form-control"
                  value={searchInput}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setSearchInput(e.target.value)
                  }
                  placeholder="Search for pet name"
                />
                <button
                  className="btn btn-primary"
                  type="button"
                  onClick={async () =>
                    await getPet({
                      variables: {
                        name:
                          searchInput.charAt(0).toUpperCase() +
                          searchInput.slice(1),
                      },
                    })
                  }
                >
                  <FaMagnifyingGlass className="fs-5" />
                </button>
              </div>
              <button
                className="btn-primary px-0 py-2 rounded fw-bold"
                style={{ flex: "0.2" }}
                data-bs-toggle="modal"
                data-bs-target="#addAnimalModal"
              >
                Add pet
              </button>
            </div>
          </div>

          <table className="table table-hover accordion">
            <thead>
              <tr>
                <th scope="col" className="p-3">
                  ID
                </th>
                <th scope="col" className="p-3">
                  Name
                </th>
                <th scope="col" className="p-3">
                  Type
                </th>
                <th scope="col" className="p-3"></th>
              </tr>
            </thead>
            <tbody>
              {petQueryResult.loading && (
                <tr>
                  <td colSpan={4}>
                    <Loader />
                  </td>
                </tr>
              )}
              {!petQueryResult.loading &&
                petQueryResult.error &&
                petList.length === 0 &&
                searchInput.length > 0 && (
                  <tr>
                    <td
                      colSpan={4}
                      className="p-5 text-center m-auto fw-bold fs-3 text-secondary"
                    >
                      No pet found
                    </td>
                  </tr>
                )}
              {!petQueryResult.loading &&
                petList.length > 0 &&
                petList.map((pet: Pet) => (
                  <>
                    <tr
                      key={pet.id}
                      data-bs-toggle="collapse"
                      data-bs-target={`#collapse-${pet.id}`}
                      aria-expanded="false"
                      aria-controls={`collapse-${pet.id}`}
                    >
                      <td className="p-3">
                        <span
                          className="d-inline-block"
                          style={{ minWidth: "14rem" }}
                        >
                          {pet.id}
                        </span>
                        <MdKeyboardArrowDown className="icon-primary ms-3 fs-4" />
                      </td>
                      <td className="text-capitalize p-3">{pet.name}</td>
                      <td className="text-capitalize p-3">{pet.type.name}</td>
                      <td className="p-3">
                        <BsFillTrashFill
                          role="button"
                          className="fs-5 text-danger"
                          data-bs-toggle="modal"
                          data-bs-target="#deleteAnimalModal"
                          onClick={() => setId(pet.id)}
                        />
                      </td>
                    </tr>

                    {/* Accordion */}
                    <tr
                      className="collapse accordion-collapse"
                      id={`collapse-${pet.id}`}
                      data-bs-parent=".table"
                    >
                      <td className="p-3 edit-pet-form" colSpan={4}>
                        <PetsManagementEditForm
                          pet={pet}
                          setPetList={setPetList}
                        />
                      </td>
                    </tr>
                  </>
                ))}
            </tbody>
          </table>

          {/* <AddAnimalModal setPetList={setPetList} />
          <DeleteAnimalModal
            id={id}
            setId={setId}
            setPetList={setPetList}
          /> */}
        </>
      )}
    </>
  );
};

export default PetsManagement;
