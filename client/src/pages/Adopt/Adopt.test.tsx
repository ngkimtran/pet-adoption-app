import "@testing-library/jest-dom";
import { render, screen } from "../../utilities/testUtilities";
import Adopt from "./Adopt";

jest.mock("../../components/AdoptionForm/AdoptionForm.tsx", () => () => (
  <div>AdoptionForm</div>
));

describe("<Adopt />", () => {
  describe("rendering", () => {
    test("shows the correct content", () => {
      render(<Adopt />);

      expect(screen.getByText("AdoptionForm")).toBeInTheDocument();
    });
  });
});
