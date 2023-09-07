const Loader = () => (
  <div className="d-flex justify-content-center m-auto my-5">
    <div
      className="text-color-primary m-auto t-0 l-0 spinner-border fs-2"
      style={{ width: "5rem", height: "5rem" }}
      role="status"
    >
      <span className="visually-hidden" style={{ visibility: "hidden" }}>
        Loading...
      </span>
    </div>
  </div>
);

export default Loader;
