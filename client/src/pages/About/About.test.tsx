import "@testing-library/jest-dom";
import { render, screen } from "../../utilities/testUtilities";
import About from "./About";

describe("<About />", () => {
  describe("rendering", () => {
    test("shows the correct content", () => {
      render(<About />);

      expect(screen.getByText("About us")).toBeInTheDocument();
      expect(
        screen.getByText("Lorem ipsum dolor sit amet", { exact: false })
      ).toBeInTheDocument();
    });
  });
});
