import { useState, useEffect } from "react";
import { useQuery } from "@apollo/client";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { GET_ANIMALS } from "../../queries/animalQueries";
import { Animal } from "../../types/types";
import { useNavigate } from "react-router-dom";

const Searchbar = () => {
  const [input, setInput] = useState<string>("");
  const [searchSuggestionList, setSearchSuggestionList] = useState<Animal[]>(
    []
  );
  const animalsQueryResult = useQuery(GET_ANIMALS);

  const navigate = useNavigate();

  const handleSuggestionClick = (animal: Animal) => {
    setInput(animal.name);
    setTimeout(() => navigate(`/${animal.name}/browse-pets`), 500);
  };

  const handleNavigate = () => {
    animalsQueryResult.data.animals.some(
      (animal: Animal) => animal.name === input
    )
      ? navigate(`/${input}/browse-pets`)
      : navigate("/");
  };
  useEffect(() => {
    if (
      !animalsQueryResult.loading &&
      !animalsQueryResult.error &&
      animalsQueryResult.data
    )
      setSearchSuggestionList(animalsQueryResult.data.animals);
  }, [animalsQueryResult]);

  useEffect(() => {
    if (
      !animalsQueryResult.loading &&
      !animalsQueryResult.error &&
      animalsQueryResult.data
    )
      if (input.length > 0)
        setSearchSuggestionList(
          animalsQueryResult.data.animals.filter((animal: Animal) =>
            animal.name.includes(input)
          )
        );
      else setSearchSuggestionList(animalsQueryResult.data.animals);
  }, [input]); //eslint-disable-line

  return (
    <>
      <div className="container dropdown">
        <div className="input-group input-group-lg">
          <input
            type="text"
            className="form-control p-3 dropdown-toggle"
            placeholder="Which animal are you looking for?"
            value={input}
            onChange={({ target }) => setInput(target.value)}
            role="button"
            data-bs-toggle="dropdown"
            data-bs-auto-close="outside"
            aria-expanded="false"
          />

          <button
            className="px-4 btn btn-primary rounded-end"
            type="button"
            onClick={handleNavigate}
          >
            <FaMagnifyingGlass className="fs-2" />
          </button>
          <ul className="dropdown-menu z-3 w-100">
            {searchSuggestionList && searchSuggestionList.length > 0 ? (
              searchSuggestionList.map((animal: Animal) => (
                <li
                  key={animal.id}
                  className="dropdown-item px-4 py-3 fs-5 text-capitalize"
                  onClick={() => handleSuggestionClick(animal)}
                >
                  {animal.name}
                </li>
              ))
            ) : (
              <li className="dropdown-item disabled px-4 py-3 fs-5 text-capitalize">
                No animal found.
              </li>
            )}
          </ul>
        </div>
      </div>
    </>
  );
};

export default Searchbar;
