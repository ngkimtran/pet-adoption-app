import "@testing-library/jest-dom";
import { render, screen } from "../../utilities/testUtilities";
import Loader from "./Loader";

describe("<Error>", () => {
  describe("when rendering", () => {
    test("shows the correct content", () => {
      render(<Loader />);

      expect(screen.getByText("Loading...")).toBeInTheDocument();
      expect(screen.getByText("Loading...")).not.toBeVisible();
    });
  });
});
