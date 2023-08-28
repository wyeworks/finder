import { render } from "@testing-library/react";
import Button from "../Button";

describe("Button Component", () => {
    it("should render the button with provided text", () => {
        const { getByText } = render(<Button text="Click Me!" />);
        expect(getByText("Click Me!")).toBeInTheDocument();
    });

    it("should have default type of 'button' when none is provided", () => {
        const { getByText } = render(<Button text="Default Type" />);
        expect(getByText("Default Type").closest("button")).toHaveAttribute("type", "button");
    });

    it("should apply the provided button type", () => {
        const { getByText } = render(<Button text="Submit" type="submit" />);
        expect(getByText("Submit").closest("button")).toHaveAttribute("type", "submit");
    });

    it("should apply additional classes when provided", () => {
        const { getByText } = render(<Button text="Styled" className="extra-class" />);
        expect(getByText("Styled").closest("button")).toHaveClass("extra-class");
    });
});
