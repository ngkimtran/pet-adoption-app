import { FaRegHeart, FaHeart } from "react-icons/fa6";
import { PLACEHOLDER_IMG } from "../../constants/constants";
import { Pet, User } from "../../types/types";
import PetDetailsItem from "../PetDetailsItem/PetDetailsItem";
import { useRecoilState } from "recoil";
import { userState } from "../../states/state";
import { useMutation } from "@apollo/client";
import { UPDATE_FAVORITE } from "../../mutations/userMutations";
import { GET_USER } from "../../queries/userQueries";

type PetDetailsPropsType = {
  pet: Pet;
};

const PetDetails = ({ pet }: PetDetailsPropsType) => {
  const [user, setUser] = useRecoilState<User | null>(userState);
  const [updateFavorite] = useMutation(UPDATE_FAVORITE, {
    update: (cache, response) => {
      cache.updateQuery(
        {
          query: GET_USER,
          variables: {
            username: user?.username,
          },
        },
        () => {
          setUser(response.data.updateFavorite);
        }
      );
    },
  });

  const toggleFavorite = () => updateFavorite({ variables: { petId: pet.id } });

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
          style={{ flex: ".5 " }}
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
              <PetDetailsItem text="age" value={pet.characteristic.age} />
              <PetDetailsItem text="gender" value={pet.characteristic.gender} />
              <PetDetailsItem text="size" value={pet.characteristic.size} />
              <PetDetailsItem
                text="personality"
                value={pet.characteristic.personality}
              />
              <PetDetailsItem
                text="coat length"
                value={pet.characteristic.coatLength}
              />
              <PetDetailsItem
                text="house trained"
                value={pet.characteristic.houseTrained ? "yes" : "no"}
              />
              <PetDetailsItem text="health" value={pet.characteristic.health} />
              <PetDetailsItem
                text="adoption fee"
                value={`€${pet.adoptionFee.toFixed(2)}`}
              />
            </div>
          </div>
        </div>
        <div className="py-4 fs-1" style={{ flex: ".1 " }}>
          {user && user.favorites.some((p) => p.id === pet.id) ? (
            <FaHeart onClick={toggleFavorite} className="icon-primary" />
          ) : (
            <FaRegHeart onClick={toggleFavorite} className="icon-primary" />
          )}
          <div />
        </div>
      </div>
      <hr className="m-0" />
      <div
        style={{ textAlign: "justify" }}
        className="text-secondary rounded-bottom p-5 shadow bg-white"
      >
        {pet.description}
      </div>
    </div>
  );
};

export default PetDetails;
