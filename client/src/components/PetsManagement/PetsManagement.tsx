import { useState, useEffect } from "react";
import { useLazyQuery, useQuery } from "@apollo/client";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { Pet } from "../../types/types";
import { GET_PET, GET_PETS } from "../../queries/petQueries";
import Loader from "../Loader/Loader";
import Error from "../Error/Error";
import AddPetModal from "../Modals/AddPetModal";
import DeletePetModal from "../Modals/DeletePetModal";
import PetsManagementRow from "../PetsManagementRow/PetsManagementRow";

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
                        name: searchInput,
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
                data-bs-target="#addPetModal"
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
                  <PetsManagementRow
                    key={pet.id}
                    pet={pet}
                    setPetList={setPetList}
                    setId={setId}
                  />
                ))}
            </tbody>
          </table>

          <AddPetModal setPetList={setPetList} />
          <DeletePetModal id={id} setId={setId} setPetList={setPetList} />
        </>
      )}
    </>
  );
};

export default PetsManagement;
