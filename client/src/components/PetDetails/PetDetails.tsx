import { PLACEHOLDER_IMG } from "../../constants/constants";
import { Pet } from "../../types/types";
import PetDetailsItem from "../PetDetailsItem/PetDetailsItem";

type PetDetailsPropsType = {
  pet: Pet;
};

const PetDetails = ({ pet }: PetDetailsPropsType) => {
  return (
    <div>
      <div className=" d-flex align-items-stretch rounded-top shadow bg-white">
        <div style={{ flex: ".4" }}>
          <img
            src={PLACEHOLDER_IMG}
            className="object-fit-cover h-100 w-100"
            style={{ borderTopLeftRadius: "0.375rem" }}
            alt=""
          />
        </div>
        <div
          className="p-4 d-flex flex-column align-item-start justify-space-between"
          style={{ flex: ".6 " }}
        >
          <h1 className="text-center fw-bold text-uppercase text-color-secondary">
            {pet.name}
          </h1>
          <hr
            className="w-50 mx-auto my-4 background-primary rounded border-0 opacity-50"
            style={{ height: "2px" }}
          />
          <div>
            <h4 className="text-center text-capitalize">
              <span>{pet.breed}</span>
              <span className="px-2">&#x2022;</span>
              <span>{pet.location}</span>
            </h4>

            <div className="text-start mx-5 my-4">
              <PetDetailsItem keyText="age" value={pet.characteristic.age} />
              <PetDetailsItem
                keyText="gender"
                value={pet.characteristic.gender}
              />
              <PetDetailsItem keyText="size" value={pet.characteristic.size} />
              <PetDetailsItem
                keyText="personality"
                value={pet.characteristic.personality}
              />
              <PetDetailsItem
                keyText="coat length"
                value={pet.characteristic.coatLength}
              />
              <PetDetailsItem
                keyText="house trained"
                value={pet.characteristic.houseTrained ? "yes" : "no"}
              />
              <PetDetailsItem
                keyText="health"
                value={pet.characteristic.health}
              />
            </div>
          </div>
        </div>
      </div>
      <hr className="m-0" />
      <div className="text-secondary rounded-bottom p-5 shadow bg-white">
        {pet.description}
      </div>
    </div>
  );
};

export default PetDetails;
