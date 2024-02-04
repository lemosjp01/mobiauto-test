"use client";

import React, { FunctionComponent, useContext, useEffect, useState } from 'react';
import { Button, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material';
import { FormContext } from '@/contexts/FormContext';
import { IField } from '@/@types/global';



interface IFormComponentProps {
  fields: IField[];
  onSubmit: () => void;
  submitButtonLabel: string;
}

const FormComponent: FunctionComponent<IFormComponentProps> = ({ fields, onSubmit, submitButtonLabel }) => {
  const { formValues, handleFormValues } = useContext(FormContext);
  const [isFormValid, setIsFormValid] = useState<boolean>(false);

  useEffect(() => {
    const areAllFieldsFilled = fields.every(field => {
      return field.id === "year" || (formValues[field.id] !== "" && formValues[field.id] !== undefined);
    });
    setIsFormValid(areAllFieldsFilled);
  }, [fields, formValues]);

  const handleChange = (fieldId: string) => (event: SelectChangeEvent<string>) => {
    const value = event.target.value as string;
    handleFormValues({
      [fieldId]: value
    });
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (isFormValid) {
      onSubmit();
    } else {
      alert('Preencha todos os campos antes de enviar o formulário.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {fields.map(field => field.id !== "year" ? (
        <FormControl key={field.id} sx={{
          paddingY: "12px"
        }}>
          <InputLabel id={`select-label-${field.id}`} shrink={false}>{field.label}</InputLabel>
          <Select
            labelId={`select-label-${field.id}`}
            id={`select-${field.id}`}
            value={formValues[field.id] || ''}
            onChange={handleChange(field.id)}
            renderValue={(selectedValue) => <div className="menu-item">{selectedValue}</div>}
            disabled={field.disabled}
          >
            {field.options.map(option => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      ) : formValues.model !== "" && formValues.model !== undefined && (
        <FormControl key={field.id} sx={{
          paddingY: "12px"
        }}>
          <InputLabel id={`select-label-${field.id}`} shrink={false}>{field.label}</InputLabel>
          <Select
            labelId={`select-label-${field.id}`}
            id={`select-${field.id}`}
            value={formValues[field.id] || ''}
            onChange={handleChange(field.id)}
            renderValue={(selectedValue) => <div className="menu-item">{selectedValue}</div>}
            disabled={field.disabled}
          >
            {field.options.map(option => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      )
      )}
      <div className="button-wrapper">
        <Button
          sx={{
            backgroundColor: "#723bb2",
            width: "fit-content",

            "&:hover": {
              backgroundColor: "#612aa1"
            }
          }}
          variant="contained"
          type="submit"
          size="large"
          disabled={!isFormValid}
        >
          {submitButtonLabel}
        </Button>
      </div>
    </form>
  );
};

export default FormComponent;
