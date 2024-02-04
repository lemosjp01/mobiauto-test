"use client";

import React, { ReactNode, createContext, useContext, useState } from 'react';

interface IFormValues {
  [key: string]: string;
}

interface IFormContextProps {
  formValues: IFormValues;
  handleFormValues: (values: IFormValues) => void;
}

interface IFormProviderProps {
  children: ReactNode;
}

export const FormContext = createContext({} as IFormContextProps);

export function FormProvider ({ children }: IFormProviderProps) {
  const [formValues, setFormValues] = useState<IFormValues>({});

  const handleFormValues = (values: IFormValues) => {
    setFormValues(prevState => ({
      ...prevState,
      ...values
    }));
  };

  return (
    <FormContext.Provider value={{ formValues, handleFormValues }}>
      {children}
    </FormContext.Provider>
  );
};
