import React, { useContext } from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { FormContext, FormProvider } from "../FormContext";

describe("FormProvider", () => {
  it("should provide form values and handleFormValues function to consumers", () => {
    render(
      <FormProvider>
        <FormConsumerComponent />
      </FormProvider>
    );

    expect(screen.getByText("Form Values:")).toBeTruthy();
    expect(screen.getByText("No form values yet.")).toBeTruthy();

    fireEvent.click(screen.getByRole("button", { name: "Update Form Values" }));
    expect(screen.getByText("Form Values:")).toBeTruthy();
    expect(screen.getByText("Updated form values.")).toBeTruthy();
  });
});

const FormConsumerComponent = () => {
  const { formValues, handleFormValues } = useContext(FormContext);

  const updateFormValues = () => {
    handleFormValues({ example: "Updated form values." });
  };

  return (
    <div>
      <h2>Form Values:</h2>
      {Object.keys(formValues).length === 0 ? (
        <p>No form values yet.</p>
      ) : (
        <p>{formValues.example}</p>
      )}
      <button onClick={updateFormValues}>Update Form Values</button>
    </div>
  );
};
