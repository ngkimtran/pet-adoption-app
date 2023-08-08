import "./Searchbar.css";

const Searchbar = () => {
  return (
    <div className="container input-group input-group-lg">
      <input
        type="text"
        className="form-control p-3"
        placeholder="What type of pets are you looking for?"
      />
      <button className="btn searchbar-btn" type="button">
        <i className="px-4 fa-solid fa-magnifying-glass"></i>
      </button>
    </div>
  );
};

export default Searchbar;
