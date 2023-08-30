import { useState, useEffect } from "react";
import { Pet } from "../../types/types";
import Filter from "../Filter/Filter";
import PetCard from "../PetCard/PetCard";

type PetListPropType = {
  pets: Pet[];
  animal: string | undefined;
};

const PetList = ({ pets, animal }: PetListPropType) => {
  const [filteredPets, setFilteredPets] = useState<Pet[]>(pets);

  useEffect(() => {
    setFilteredPets(pets);
  }, [pets]);

  return (
    <>
      {animal && (
        <div>
          <div className="background-primary">
            <div
              style={{ padding: "0 6rem" }}
              className="fw-medium gap-5 py-1 text-color-dark fs-4"
            >
              <p className="my-3">
                <span className="fw-bold">{pets.length}</span>
                <span>
                  {" "}
                  {pets.length > 1 ? `${animal}s` : animal} available for
                  adoptions.
                </span>
              </p>
            </div>
          </div>
          <div className="container-fluid d-flex gap-3 align-items-start justify-content-center">
            <Filter
              pets={pets}
              filteredPets={filteredPets}
              setFilteredPets={setFilteredPets}
              style={{ flex: "0.25" }}
            />
            <div
              style={{ flex: "0.75" }}
              className="row row-cols-auto gap-3 my-5 mx-3"
            >
              {filteredPets.length > 0 ? (
                filteredPets.map((pet: Pet) => (
                  <PetCard key={pet.id} pet={pet} animal={animal} />
                ))
              ) : (
                <div className="text-secondary opacity-50 fs-1 fw-bold w-100 text-center">
                  <span>No pets found.</span>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default PetList;
