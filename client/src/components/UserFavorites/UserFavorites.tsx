import { Pet } from "../../types/types";

type UserFavoritesPropType = {
  value: Pet[];
};

const UserFavorites = ({ value }: UserFavoritesPropType) => {
  return <div>UserFavorites</div>;
};

export default UserFavorites;
