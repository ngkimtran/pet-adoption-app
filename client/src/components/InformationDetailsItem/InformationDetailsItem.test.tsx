import "@testing-library/jest-dom";
import { render, screen } from "../../utilities/testUtilities";
import InformationDetailsItem from "./InformationDetailsItem";
import { ROLE } from "../../constants/constants";

const mockUserState = {
  id: "64e5ac7a01d3744da5a883e0",
  username: "mluuka",
  firstname: "Luuka",
  lastname: "Mattinen",
  email: "lm@gmail.com",
  role: ROLE.USER,
  favorites: [],
  __typename: "User",
};

describe("<InformationDetailsItem />", () => {
  describe("rendering", () => {
    test("shows the correct content", () => {
      render(
        <InformationDetailsItem
          text={"Username"}
          value={mockUserState.username}
        />
      );

      expect(screen.getByText("Username")).toBeInTheDocument();
      expect(screen.getByText(mockUserState.username)).toBeInTheDocument();
    });
  });
});
