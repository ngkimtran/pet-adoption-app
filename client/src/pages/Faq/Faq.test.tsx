import "@testing-library/jest-dom";
import { render, screen } from "../../utilities/testUtilities";
import Faq from "./Faq";

describe("<Faq />", () => {
  describe("rendering", () => {
    test("shows the correct content", () => {
      render(<Faq />);

      expect(
        screen.getByText("How do I search for a pet?")
      ).toBeInTheDocument();
      expect(screen.getByText("How do I adopt a pet?")).toBeInTheDocument();
      expect(
        screen.getByText("Can I return the pet I adopted?")
      ).toBeInTheDocument();
    });
  });
});
