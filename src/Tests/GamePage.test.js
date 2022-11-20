import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

describe("Game page dropdown", () => {
  test("can click the dropdown", () => {
    const dropBtn = screen.getByText(/select language/i); // figure out what id / role the dropdown is to tag it
    userEvent.click(dropBtn);

    expect(screen.getByText("Javascript").toBeInTheDocument());

    //userEvent.hover(dropBtn)
    //expect ....
    //userEvent.unhover(dropBtn)
    //expect ...
  });
  test("should correctly set default option", () => {
    render(); //component with the modal <app/>?
    expect(screen.getByRole("option", { name: "Select a Language" }).selected).toBe(
      true
    );
  });

  test("should allow user to change language", () => {
    render(<App />);
    userEvent.selectOptions(

      // Find and select the Javascript option
      screen.getByRole("option", { name: "Javascript" })
    );
    expect(screen.getByRole("option", { name: "Javascript" }).selected).toBe(true);
  });
});
