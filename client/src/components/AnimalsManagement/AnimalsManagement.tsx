import { useState, useEffect } from "react";
import { useLazyQuery, useQuery } from "@apollo/client";
import { BsFillTrashFill } from "react-icons/bs";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { Animal } from "../../types/types";
import { GET_ANIMAL, GET_ANIMALS } from "../../queries/animalQueries";
import Loader from "../Loader/Loader";
import Error from "../Error/Error";
import AddAnimalModal from "../Modals/AddAnimalModal";
import DeleteAnimalModal from "../Modals/DeleteAnimalModal";

const AnimalsManagement = () => {
  const [searchInput, setSearchInput] = useState<string>("");
  const [id, setId] = useState<string>("");
  const [animalList, setAnimalList] = useState<Animal[]>([]);

  const animalsQueryResult = useQuery(GET_ANIMALS);
  const [getAnimal, animalQueryResult] = useLazyQuery(GET_ANIMAL);

  useEffect(() => {
    const fetchData = async () => {
      if (
        !animalsQueryResult.loading &&
        !animalsQueryResult.error &&
        animalsQueryResult.data
      )
        setAnimalList(animalsQueryResult.data.animals);
      if (
        !animalQueryResult.loading &&
        !animalQueryResult.error &&
        animalQueryResult.data
      )
        setAnimalList([animalQueryResult.data.animal]);
      if (searchInput.length > 0 && !animalQueryResult.data) setAnimalList([]);
    };
    fetchData();
  }, [animalQueryResult, animalsQueryResult]); //eslint-disable-line

  return (
    <>
      {animalsQueryResult.loading && <Loader />}
      {animalsQueryResult.error && <Error />}
      {animalList && (
        <>
          <div className="p-3 mt-3 mb-5 d-flex w-100 justify-content-between align-items-center">
            <h3 className="fw-bold text-secondary" style={{ flex: "0.4" }}>
              List of animals
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
                  placeholder="Search for animal name"
                />
                <button
                  className="btn btn-primary"
                  type="button"
                  onClick={async () =>
                    await getAnimal({
                      variables: { name: searchInput },
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
                Add animal
              </button>
            </div>
          </div>

          <table className="table table-hover">
            <thead>
              <tr>
                <th scope="col" className="p-3">
                  ID
                </th>
                <th scope="col" className="p-3">
                  Name
                </th>
                <th scope="col" className="p-3">
                  Pet Count
                </th>
                <th scope="col" className="p-3"></th>
              </tr>
            </thead>
            <tbody>
              {animalQueryResult.loading && (
                <tr>
                  <td colSpan={4}>
                    <Loader />
                  </td>
                </tr>
              )}
              {!animalQueryResult.loading &&
                animalQueryResult.error &&
                animalList.length === 0 &&
                searchInput.length > 0 && (
                  <tr>
                    <td
                      colSpan={4}
                      className="p-5 text-center m-auto fw-bold fs-3 text-secondary"
                    >
                      No animal found
                    </td>
                  </tr>
                )}
              {!animalQueryResult.loading &&
                animalList.length > 0 &&
                animalList.map((animal: Animal) => (
                  <tr key={animal.id}>
                    <td className="p-3">{animal.id}</td>
                    <td className="text-capitalize p-3">{animal.name}</td>
                    <td className="p-3">{animal.petCount}</td>
                    <td className="p-3">
                      <BsFillTrashFill
                        role="button"
                        className="fs-5 text-danger"
                        data-bs-toggle="modal"
                        data-bs-target="#deleteAnimalModal"
                        onClick={() => setId(animal.id)}
                      />
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>

          <AddAnimalModal setAnimalList={setAnimalList} />
          <DeleteAnimalModal
            id={id}
            setId={setId}
            setAnimalList={setAnimalList}
          />
        </>
      )}
    </>
  );
};

export default AnimalsManagement;