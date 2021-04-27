import { render, screen } from "@testing-library/react";
import App from "../../pages/index";

describe("Calendar", () => {
  it("renders without crashing", () => {
    render(<App />);
    expect(screen.getByTestId("calendar")).toBeInTheDocument();
  });
});
