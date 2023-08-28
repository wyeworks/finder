import { render } from "@testing-library/react";
import Dropdown from "../DropDown";

describe("Dropdown Component", () => {
    it("should render the dropdown without crashing", () => {
        render(<Dropdown id="test-dropdown" options={[{ label: "Option 1" }]} />);
    });

    it("should display the provided label", () => {
        const { getByText } = render(
            <Dropdown id="label-dropdown" label="Dropdown Label" options={[{ label: "Option 1" }]} />
        );
        expect(getByText("Dropdown Label")).toBeInTheDocument();
    });

    it("should render all provided options", () => {
        const options = [
            { label: "Option 1" },
            { label: "Option 2" },
            { label: "Option 3" }
        ];
        const { getByText } = render(
            <Dropdown id="options-dropdown" options={options} />
        );
        options.forEach(option => {
            expect(getByText(option.label)).toBeInTheDocument();
        });
    });

    it("should render without a label if none is provided", () => {
        const { queryByText } = render(
            <Dropdown id="no-label-dropdown" options={[{ label: "Option 1" }]} />
        );
        expect(queryByText("Dropdown Label")).not.toBeInTheDocument();
    });
});
