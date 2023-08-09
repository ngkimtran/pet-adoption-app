import { FaMagnifyingGlass } from "react-icons/fa6";

const Searchbar = () => {
  return (
    <div className="container input-group input-group-lg">
      <input
        type="text"
        className="form-control p-3"
        placeholder="What type of pets are you looking for?"
      />
      <button className="px-4 btn btn-primary" type="button">
        <FaMagnifyingGlass size={"2rem"} />
      </button>
    </div>
  );
};

export default Searchbar;
