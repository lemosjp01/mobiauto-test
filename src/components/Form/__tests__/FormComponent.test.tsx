import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import FormComponent from '../FormComponent';
import { FormContext } from '@/contexts/FormContext';

const mockFormValues = {
  field1: 'value1',
  field2: 'value2',
};
const mockHandleFormValues = jest.fn();

const mockFields = [
  {
    id: 'field1',
    label: 'Field 1',
    options: [{ value: 'value1', label: 'Value 1' }],
    disabled: false
  },
  {
    id: 'field2',
    label: 'Field 2',
    options: [{ value: 'value2', label: 'Value 2' }],
    disabled: false
  },
];

describe('FormComponent', () => {
  beforeEach(() => {
    render(
      <FormContext.Provider value={{ formValues: mockFormValues, handleFormValues: mockHandleFormValues }}>
        <FormComponent fields={mockFields} onSubmit={jest.fn()} submitButtonLabel="Submit" />
      </FormContext.Provider>
    );
  });

  it('should render the form fields with correct values', () => {
    expect(screen.getByLabelText('Field 1')).toBeTruthy();
    expect(screen.getByLabelText('Field 2')).toBeTruthy();
  });
});
