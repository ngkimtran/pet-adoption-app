import "@testing-library/jest-dom";
import { render, screen } from "../../utilities/testUtilities";
import SinglePetDetailsItem from "./SinglePetDetailsItem";
import { toCapitalize } from "../../utilities/utilities";

const mockText = "Test Text";
const mockValue = "Test Value";
const mockValueArray = ["Test Value 1", "Test Value 2", "Test Value 3"];

describe("<SinglePetDetailsItem />", () => {
  describe("when value is a single string", () => {
    describe("rendering", () => {
      test("shows the correct content", () => {
        render(<SinglePetDetailsItem text={mockText} value={mockValue} />);

        expect(screen.getByText(mockText)).toBeInTheDocument();
        expect(screen.getByText(toCapitalize(mockValue))).toBeInTheDocument();
      });
    });
  });
  describe("when value is an array of string", () => {
    describe("rendering", () => {
      test("shows the correct content", () => {
        render(<SinglePetDetailsItem text={mockText} value={mockValueArray} />);

        expect(screen.getByText(mockText)).toBeInTheDocument();
        expect(screen.getAllByText("•")).toHaveLength(
          mockValueArray.length - 1
        );
        mockValueArray.map((value) =>
          expect(screen.getByText(toCapitalize(value))).toBeInTheDocument()
        );
      });
    });
  });
});
