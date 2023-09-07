import "@testing-library/jest-dom";
import { render, screen } from "../../utilities/testUtilities";
import Footer from "./Footer";

describe("<Footer />", () => {
  describe("rendering", () => {
    test("shows the correct content", () => {
      render(<Footer />);
      expect(screen.getByText("© Kim Tran - 2023")).toBeInTheDocument();
    });
  });
});
