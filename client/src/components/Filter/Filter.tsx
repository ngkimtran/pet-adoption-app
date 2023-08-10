const Filter = (props: any) => {
  return (
    <div
      className="container d-flex flex-column m-5 gap-5 align-items-center text-start text-uppercase"
      style={{ ...props }}
    >
      <div style={{ width: "50%" }}>
        <label
          htmlFor="breed"
          className="form-label text-color-dark fw-semibold"
        >
          Breed
        </label>
        <div className="input-group">
          <select
            className="form-select py-3 px-4"
            defaultValue="any"
            id="breed"
          >
            <option value="any">Any</option>
            <option value="1">One</option>
            <option value="2">Two</option>
            <option value="3">Three</option>
          </select>
        </div>
      </div>
      <div style={{ width: "50%" }}>
        <label htmlFor="age" className="form-label text-color-dark fw-semibold">
          Age
        </label>
        <div className="input-group">
          <select className="form-select py-3 px-4" defaultValue="any" id="age">
            <option value="any">Any</option>
            <option value="1">One</option>
            <option value="2">Two</option>
            <option value="3">Three</option>
          </select>
        </div>
      </div>
      <div style={{ width: "50%" }}>
        <label
          htmlFor="size"
          className="form-label text-color-dark fw-semibold"
        >
          Size
        </label>
        <div className="input-group">
          <select
            className="form-select py-3 px-4"
            defaultValue="any"
            id="size"
          >
            <option value="any">Any</option>
            <option value="1">One</option>
            <option value="2">Two</option>
            <option value="3">Three</option>
          </select>
        </div>
      </div>
      <div style={{ width: "50%" }}>
        <label
          htmlFor="gender"
          className="form-label text-color-dark fw-semibold"
        >
          Gender
        </label>
        <div className="input-group">
          <select
            className="form-select py-3 px-4"
            defaultValue="any"
            id="gender"
          >
            <option value="any">Any</option>
            <option value="1">One</option>
            <option value="2">Two</option>
            <option value="3">Three</option>
          </select>
        </div>
      </div>
      <div style={{ width: "50%" }}>
        <label
          htmlFor="coatLength"
          className="formLabel text-color-dark fw-semibold"
        >
          Coat length
        </label>
        <div className="input-group">
          <select
            className="form-select py-3 px-4"
            defaultValue="any"
            id="coatLength"
          >
            <option value="any">Any</option>
            <option value="1">One</option>
            <option value="2">Two</option>
            <option value="3">Three</option>
          </select>
        </div>
      </div>
      <div style={{ width: "50%" }}>
        <label
          htmlFor="health"
          className="form-label text-color-dark fw-semibold"
        >
          Health
        </label>
        <div className="input-group">
          <select
            className="form-select py-3 px-4"
            defaultValue="any"
            id="health"
          >
            <option value="any">Any</option>
            <option value="1">One</option>
            <option value="2">Two</option>
            <option value="3">Three</option>
          </select>
        </div>
      </div>
      <div style={{ width: "50%" }}>
        <label
          htmlFor="personality"
          className="form-label text-color-dark fw-semibold"
        >
          Personality
        </label>
        <div className="input-group">
          <select
            className="form-select py-3 px-4"
            defaultValue="any"
            id="personality"
          >
            <option value="any">Any</option>
            <option value="1">One</option>
            <option value="2">Two</option>
            <option value="3">Three</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default Filter;
