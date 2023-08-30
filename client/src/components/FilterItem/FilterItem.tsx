import { MdKeyboardArrowDown } from "react-icons/md";
import { toCapitalize } from "../../utilities/utilities";

type FilterItemPropType = {
  filterParamOptions: string[];
  filterParamTitle: string;
  filterParamValue: string;
  setFilterParamValue: Function;
};

const FilterItem = ({
  filterParamOptions,
  filterParamTitle,
  filterParamValue,
  setFilterParamValue,
}: FilterItemPropType) => (
  <div style={{ width: "250px" }}>
    <label htmlFor="breed" className="form-label text-color-dark fw-semibold">
      {filterParamTitle}
    </label>
    <div className="dropdown text-capitalize">
      <div
        role="button"
        data-bs-toggle="dropdown"
        aria-expanded="false"
        className="bg-white border w-100 py-3 px-4 rounded d-flex justify-content-between align-items-center"
      >
        <span>{toCapitalize(filterParamValue)}</span>
        <MdKeyboardArrowDown className="dropdown-toggle fs-4" />
      </div>
      <ul className="dropdown-menu w-100">
        {filterParamOptions.map((p, index) => (
          <li
            key={index}
            className="dropdown-item px-4 py-3 filter-dropdown-item"
            onClick={() => setFilterParamValue(p)}
          >
            {toCapitalize(p)}
          </li>
        ))}
      </ul>
    </div>
  </div>
);

export default FilterItem;
