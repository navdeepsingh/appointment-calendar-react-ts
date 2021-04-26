import { render, screen } from "@testing-library/react";
import Calendar from "@components/Calendar";

describe("Calendar", () => {
  it("renders without crashing", () => {
    render(<Calendar />);
    expect(screen.getByTestId("calendar")).toBeInTheDocument();
  });
});
