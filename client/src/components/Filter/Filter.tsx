import { useCallback, useMemo, useEffect, useState } from "react";
import { Pet } from "../../types/types";
import FilterItem from "../FilterItem/FilterItem";
import { AGE, GENDER, SIZE } from "../../constants/constants";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { toCapitalize } from "../../utilities/utilities";

type FilterPropType = {
  pets: Pet[];
  filteredPets: Pet[];
  setFilteredPets: Function;
  style: object;
};

const Filter = ({
  pets,
  filteredPets,
  setFilteredPets,
  style,
}: FilterPropType) => {
  const filterParams = useMemo(
    () => ({
      breed: ["Any", ...Array.from(new Set(pets.map((pet: Pet) => pet.breed)))],
      age: ["Any", ...Object.values(AGE)],
      size: ["Any", ...Object.values(SIZE)],
      gender: ["Any", ...Object.values(GENDER)],
      houseTrained: ["Any", "Yes", "No"],
      coatLength: [
        "Any",
        ...Array.from(
          new Set(pets.map((pet: Pet) => pet.characteristic.coatLength))
        ),
      ],
    }),
    [pets]
  );

  const [filterPetName, setFilterPetName] = useState<string>("");
  const [breed, setBreed] = useState<string>(filterParams.breed[0]);
  const [age, setAge] = useState<string>(filterParams.age[0]);
  const [size, setSize] = useState<string>(filterParams.size[0]);
  const [gender, setGender] = useState<string>(filterParams.gender[0]);
  const [houseTrained, setHouseTrained] = useState<string>(
    filterParams.houseTrained[0]
  );
  const [coatLength, setCoatLength] = useState<string>(
    filterParams.coatLength[0]
  );

  const handleFilter = useCallback(
    (newFilteredPets: Pet[]) => setFilteredPets(newFilteredPets),
    [setFilteredPets]
  );

  const handleClearFilter = () => {
    setBreed(filterParams.breed[0]);
    setAge(filterParams.age[0]);
    setSize(filterParams.size[0]);
    setGender(filterParams.gender[0]);
    setHouseTrained(filterParams.houseTrained[0]);
    setCoatLength(filterParams.coatLength[0]);
    setFilterPetName("");
  };

  useEffect(() => {
    setBreed(filterParams.breed[0]);
    setAge(filterParams.age[0]);
    setSize(filterParams.size[0]);
    setGender(filterParams.gender[0]);
    setHouseTrained(filterParams.houseTrained[0]);
    setCoatLength(filterParams.coatLength[0]);
    setFilterPetName("");
  }, [filterParams]);

  useEffect(() => {
    const newFilteredPets = pets
      .filter((pet) => (breed === "Any" ? pet : pet.breed === breed))
      .filter((pet) => (age === "Any" ? pet : pet.characteristic.age === age))
      .filter((pet) =>
        size === "Any" ? pet : pet.characteristic.size === size
      )
      .filter((pet) =>
        gender === "Any" ? pet : pet.characteristic.gender === gender
      )
      .filter((pet) =>
        houseTrained === "Any"
          ? pet
          : houseTrained === "Yes"
          ? pet.characteristic.houseTrained
          : !pet.characteristic.houseTrained
      )
      .filter((pet) =>
        coatLength === "Any"
          ? pet
          : pet.characteristic.coatLength === coatLength
      );

    handleFilter(newFilteredPets);
  }, [breed, age, size, gender, coatLength, houseTrained, pets, handleFilter]);

  return (
    <div
      className="d-flex flex-column mx-3 my-5 gap-5 align-items-center text-start text-uppercase"
      style={{ ...style }}
    >
      <FilterItem
        filterParamOptions={filterParams.breed}
        filterParamTitle={"Breed"}
        filterParamValue={breed}
        setFilterParamValue={setBreed}
      />
      <FilterItem
        filterParamOptions={filterParams.age}
        filterParamTitle={"Age"}
        filterParamValue={age}
        setFilterParamValue={setAge}
      />
      <FilterItem
        filterParamOptions={filterParams.size}
        filterParamTitle={"Size"}
        filterParamValue={size}
        setFilterParamValue={setSize}
      />
      <FilterItem
        filterParamOptions={filterParams.gender}
        filterParamTitle={"Gender"}
        filterParamValue={gender}
        setFilterParamValue={setGender}
      />
      <FilterItem
        filterParamOptions={filterParams.houseTrained}
        filterParamTitle={"House Trained"}
        filterParamValue={houseTrained}
        setFilterParamValue={setHouseTrained}
      />
      <FilterItem
        filterParamOptions={filterParams.coatLength}
        filterParamTitle={"Coat Length"}
        filterParamValue={coatLength}
        setFilterParamValue={setCoatLength}
      />

      <div style={{ width: "250px" }}>
        <label
          htmlFor="pet-name"
          className="form-label text-color-dark fw-semibold"
        >
          Pet name
        </label>
        <div className="input-group">
          <input
            type="text"
            className="form-control py-3 px-4"
            value={filterPetName}
            onChange={({ target }) => setFilterPetName(target.value)}
          />
          <button
            className=" btn btn-light border"
            type="button"
            onClick={() =>
              setFilteredPets(
                filterPetName.length > 0
                  ? filteredPets.filter(
                      (pet) => pet.name === toCapitalize(filterPetName)
                    )
                  : pets
              )
            }
          >
            <FaMagnifyingGlass className="icon-primary fs-4" />
          </button>
        </div>
      </div>

      <div style={{ width: "250px" }}>
        <button
          className=" btn btn-primary w-100 px-3 py-2 fs-6 text-uppercase fw-semibold"
          type="button"
          onClick={handleClearFilter}
        >
          Clear all
        </button>
      </div>
    </div>
  );
};

export default Filter;
