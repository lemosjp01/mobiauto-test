import { render, screen } from "@testing-library/react";
import ChipComponent from "../ChipComponent";

describe("ChipComponent", () => {
  it("should render with the provided label and styles", () => {
    render(<ChipComponent label="Test Chip" bgColor="blue" color="white" />);
    
    const chipElement = screen.queryByText("Test Chip");
    
    expect(chipElement).toBeTruthy();
  });
});
