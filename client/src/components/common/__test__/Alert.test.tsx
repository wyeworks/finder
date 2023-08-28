import { render } from "@testing-library/react";
import Alert from "../Alert";

describe("Alert Component", () => {
    it("should render the alert when isVisible is true", () => {
        const { getByText } = render(<Alert isVisible={true} />);
        expect(getByText("Algo salio mal")).toBeInTheDocument();
    });

    it("should not render the alert when isVisible is false", () => {
        const { queryByText } = render(<Alert isVisible={false} />);
        expect(queryByText("Algo salio mal")).not.toBeInTheDocument();
    });

    it("should display the default errorMessage when none is provided", () => {
        const { getByText } = render(<Alert isVisible={true} />);
        expect(getByText("Ocurrio un error inesperado, intenta de nuevo")).toBeInTheDocument();
    });

    it("should display the provided errorMessage", () => {
        const errorMessage = "Custom error message";
        const { getByText } = render(<Alert isVisible={true} errorMessage={errorMessage} />);
        expect(getByText(errorMessage)).toBeInTheDocument();
    });

    it("should have the default role of 'alert' when none is provided", () => {
        const { container } = render(<Alert isVisible={true} />);
        expect(container.firstChild).toHaveAttribute("role", "alert");
    });

    it("should have the provided role", () => {
        const roleType = "status";
        const { container } = render(<Alert isVisible={true} type={roleType} />);
        expect(container.firstChild).toHaveAttribute("role", roleType);
    });
});
