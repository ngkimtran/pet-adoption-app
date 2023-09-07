import "@testing-library/jest-dom";
import { render, screen } from "../../utilities/testUtilities";
import Error from "./Error";

describe("<Error>", () => {
  describe("when rendering", () => {
    test("shows the correct content", async () => {
      render(<Error />);

      expect(
        screen.getByText("Something went wrong - please try again.")
      ).toBeInTheDocument();
    });
  });
});
