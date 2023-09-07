import "@testing-library/jest-dom";
import { render, screen } from "../../utilities/testUtilities";
import Slider from "./Slider";

describe("<Error>", () => {
  describe("when rendering", () => {
    test("shows the correct content", async () => {
      render(<Slider />);

      expect(
        screen.getByText(
          "Pets are not our whole life, but they make our lives whole."
        )
      ).toBeInTheDocument();
      expect(
        screen.getByPlaceholderText("Which animal are you looking for?")
      ).toBeInTheDocument();
    });
  });
});
