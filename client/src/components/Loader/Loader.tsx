const Loader = () => {
  return (
    <div
      className="text-color-primary spinner-border fs-2"
      style={{ width: "5rem", height: "5rem" }}
      role="status"
    >
      <span className="visually-hidden">Loading...</span>
    </div>
  );
};

export default Loader;
