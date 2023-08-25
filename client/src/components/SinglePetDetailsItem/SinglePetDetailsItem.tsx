type SinglePetDetailsItemPropType = {
  text: string;
  value: string | string[];
};

const SinglePetDetailsItem = ({
  text,
  value,
}: SinglePetDetailsItemPropType) => (
  <div className="mb-4 text-capitalize text-color-dark">
    <span className="d-inline-block w-25 ps-3 pe-2 py-2 me-4 fw-semibold background-primary opacity-75 rounded">
      {text}
    </span>
    <p className="mb-4 fs-5 d-inline">
      {typeof value === "object" ? (
        value.map((v, index) => (
          <span key={index}>
            <span className="d-inline-block">{v}</span>
            {value.indexOf(v) === value.length - 1 ? (
              ""
            ) : (
              <span className="px-2">&#x2022;</span>
            )}
          </span>
        ))
      ) : (
        <span className="d-inline-block">{value}</span>
      )}
    </p>
  </div>
);
export default SinglePetDetailsItem;
