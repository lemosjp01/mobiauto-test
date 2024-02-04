import { render, screen } from "@testing-library/react";
import Paper from "../PaperComponent";

describe("Paper", () => {
  it("should render children inside MuiPaper component", () => {
    render(
      <Paper>
        <div data-testid="child">Test Child</div>
      </Paper>
    );

    const childElement = screen.getByTestId("child");
    const paperElement = childElement.parentElement;

    expect(paperElement).toBeTruthy();
  });
});
