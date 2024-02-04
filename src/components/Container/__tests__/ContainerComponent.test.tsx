import React from 'react';
import { render, screen } from '@testing-library/react';
import ContainerComponent from '../ContainerComponent';
import { FormContext, FormProvider } from '@/contexts/FormContext';

describe('ContainerComponent', () => {
  it('should render ContainerComponent with correct functionality', async () => {

    render(
      <FormProvider>
        <FormContext.Provider value={{ formValues: {}, handleFormValues: jest.fn() }}>
          <ContainerComponent brands={[
        { name: 'Brand 1', code: '001' },
        { name: 'Brand 2', code: '002' },
      ]} />
        </FormContext.Provider>
      </FormProvider>
    );

    expect(screen.getByText('Tabela Fipe')).toBeTruthy();

    expect(screen.getByText('Consultar Preço')).toBeTruthy();

  });
});
