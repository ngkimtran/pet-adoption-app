type InformationDetailsItemPropType = {
  text: string;
  value: string;
};

const InformationDetailsItem = ({
  text,
  value,
}: InformationDetailsItemPropType) => {
  return (
    <div className="ms-5 text-color-dark">
      <span className="d-inline-block w-25 pe-2 fw-semibold text-uppercase opacity-75">
        {text}
      </span>
      <span className="d-inline-block fs-5">{value}</span>
    </div>
  );
};

export default InformationDetailsItem;
