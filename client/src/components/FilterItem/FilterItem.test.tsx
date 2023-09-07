import "@testing-library/jest-dom";
import { render, screen } from "../../utilities/testUtilities";
import FilterItem from "./FilterItem";
import userEvent from "@testing-library/user-event";

const mockFilterParamTitle = "Test title";
const mockFilterParamValue = "Test value";
const mockFilterParamOptions = ["Test option 1", "Test option 2"];
const mockSetFilterParamValue = jest.fn();

describe("<FilterItem />", () => {
  describe("rendering", () => {
    test("shows the correct content", () => {
      render(
        <FilterItem
          filterParamTitle={mockFilterParamTitle}
          filterParamValue={mockFilterParamValue}
          filterParamOptions={mockFilterParamOptions}
          setFilterParamValue={mockSetFilterParamValue}
        />
      );

      expect(screen.getByText(mockFilterParamTitle)).toBeInTheDocument();
      expect(screen.getByText(mockFilterParamValue)).toBeInTheDocument();
    });

    describe("when clicking the dropdown menu", () => {
      test("shows the correct content", async () => {
        render(
          <FilterItem
            filterParamTitle={mockFilterParamTitle}
            filterParamValue={mockFilterParamValue}
            filterParamOptions={mockFilterParamOptions}
            setFilterParamValue={mockSetFilterParamValue}
          />
        );

        userEvent.click(screen.getByText(mockFilterParamOptions[0]));

        mockFilterParamOptions.map(async (opt) =>
          expect(await screen.findByText(opt)).toBeVisible()
        );
      });
    });

    test("call setFilterParamValue when selecting a filter option", async () => {
      render(
        <FilterItem
          filterParamTitle={mockFilterParamTitle}
          filterParamValue={mockFilterParamValue}
          filterParamOptions={mockFilterParamOptions}
          setFilterParamValue={mockSetFilterParamValue}
        />
      );

      userEvent.click(screen.getByText(mockFilterParamOptions[0]));

      expect(mockSetFilterParamValue).toHaveBeenCalledTimes(1);
    });
  });
});
