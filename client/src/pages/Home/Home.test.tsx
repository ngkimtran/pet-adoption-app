import "@testing-library/jest-dom";
import { render, screen } from "../../utilities/testUtilities";
import Home from "./Home";

jest.mock("../../components/Slider/Slider.tsx", () => () => <div>Slider</div>);

jest.mock("../../components/AnimalList/AnimalList.tsx", () => () => (
  <div>AnimalList</div>
));

jest.mock("../../components/Suggestion/Suggestion.tsx", () => () => (
  <div>Suggestion</div>
));

jest.mock("../../components/Actions/Actions.tsx", () => () => (
  <div>Actions</div>
));

describe("<Home />", () => {
  describe("rendering", () => {
    test("shows the correct content", () => {
      render(<Home />);

      expect(screen.getByText("Slider")).toBeInTheDocument();
      expect(screen.getByText("AnimalList")).toBeInTheDocument();
      expect(screen.getByText("Suggestion")).toBeInTheDocument();
      expect(screen.getByText("Actions")).toBeInTheDocument();
    });
  });
});
