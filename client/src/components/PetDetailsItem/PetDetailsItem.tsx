type PetDetailsItemPropType = {
  keyText: string;
  value: string | string[];
};

const PetDetailsItem = ({ keyText, value }: PetDetailsItemPropType) => (
  <div className="mb-4 text-capitalize text-color-dark">
    <span className="d-inline-block w-25 ps-3 pe-2 py-2 me-4 fw-semibold background-primary opacity-75 rounded">
      {keyText}
    </span>
    <p className="mb-4 fs-5 d-inline">
      {typeof value === "object" ? (
        value.map((v) => (
          <>
            <span className="d-inline-block">{v}</span>
            {value.indexOf(v) === value.length - 1 ? (
              ""
            ) : (
              <span className="px-2">&#x2022;</span>
            )}
          </>
        ))
      ) : (
        <span className="d-inline-block">{value}</span>
      )}
    </p>
  </div>
);
export default PetDetailsItem;
