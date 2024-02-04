"use client";

import { EVehicleType, IParam, IField, IFipeResponse } from "@/@types/global";
import ChipComponent from "@/components/Chip/ChipComponent";
import FormComponent from "@/components/Form/FormComponent";
import Paper from "@/components/Paper/PaperComponent";
import { FormContext } from "@/contexts/FormContext";
import { Box, Grid } from "@mui/material";
import { FunctionComponent, useContext, useEffect, useMemo, useState } from "react";

interface IContainerProps {
  brands: IParam[]
}

const ContainerComponent: FunctionComponent<IContainerProps> = ({ brands }) => {
  const { formValues } = useContext(FormContext);
  const [models, setModels] = useState<IParam[] | undefined>(undefined);
  const [years, setYears] = useState<IParam[] | undefined>(undefined);
  const [response, setResponse] = useState<IFipeResponse | undefined>(undefined);

  const brandCode = useMemo(() => 
    brands !== undefined && !!brands.length ? brands?.find((brand: IParam) => brand.name === formValues.brand)?.code : undefined,
    [brands, formValues.brand]
  );

  useEffect(() => {
    async function fetchModelsByBrand() {
      try {
        const models = brandCode !== undefined && await fetch(`${process.env.API_HOST}/fipe/api/v2/${EVehicleType.CARS}/brands/${parseInt(brandCode)}/models`, {
          method: 'GET'
        });

        const _models = models && await models.json();
    
        setModels(_models);
      } catch (error) {
        console.error("ERROR: ", error);
      }
    };
    fetchModelsByBrand();
  }, [brandCode, formValues.brand]);

  const modelCode = useMemo(() => 
    models !== undefined && !!models.length ? models?.find((model: IParam) => model.name === formValues.model)?.code : undefined,
    [models, formValues.model]
  );

  useEffect(() => {
    async function fetchModelsByBrand() {
      try {
        const years = brandCode !== undefined && modelCode !== undefined && await fetch(`${process.env.API_HOST}/fipe/api/v2/${EVehicleType.CARS}/brands/${parseInt(brandCode)}/models/${parseInt(modelCode)}/years`, {
          method: 'GET'
        });

        const _years = years && await years.json();
    
        setYears(_years);
      } catch (error) {
        console.error("ERROR: ", error);
      }
    };
    fetchModelsByBrand();
  }, [brandCode, modelCode, formValues.model]);

  const yearCode = useMemo(() => 
    years !== undefined && !!years.length ? years?.find((year: IParam) => year.name === formValues.year)?.code : undefined,
    [years, formValues.year]
  );

  const handleSubmit = async () => {
    try {
      const response = brandCode !== undefined && modelCode !== undefined && yearCode !== undefined && await fetch(`${process.env.API_HOST}/fipe/api/v2/${EVehicleType.CARS}/brands/${brandCode}/models/${modelCode}/years/${yearCode}`, {
        method: 'GET'
      });

      const _response = response && response.json();
    
      setResponse(await _response);
    } catch (error) {
      console.error("ERROR: ", error);
    }
  };

  const fields: IField[] = [
    {
      id: 'brand',
      label: 'Marca',
      options: brands !== undefined && !!brands.length ? brands?.map((brand: IParam) => {
        return {
          value: brand.name,
          label: brand.name
        }
      }) : [],
      disabled: false
    },
    {
      id: 'model',
      label: 'Modelo',
      options: models !== undefined && !!models.length ? models?.map((model: IParam) => {
        return {
          value: model.name,
          label: model.name
        }
      }) : [],
      disabled: formValues.brand !== undefined ? false : true
    },
    {
      id: 'year',
      label: 'Ano',
      options: years !== undefined && !!years.length ? years?.map((year: IParam) => {
        return {
          value: year.name,
          label: year.name
        }
      }) : [],
      disabled: formValues.model !== undefined ? false : true
    }
  ];

  return (
    <main>
      <Box className="box" bgcolor={response ? "#a3e4ce" : "#ededed"}>
      <h1>{!response ? "Tabela Fipe" : `Tabela Fipe: Preço ${response.brand} ${response.model} ${response.modelYear}`}</h1>
        {!response && <h2>Consulte o valor de um veículo de forma gratuita</h2>}
        <Grid container justifyContent="center" alignItems="center" textAlign="center">
          <Grid item xs={4} md={4} lg={3}>
            {!response ? (
                <Paper>
                <FormComponent fields={fields} onSubmit={handleSubmit} submitButtonLabel="Consultar Preço" />
              </Paper>
              ) : (
                <div className="chip-wrapper">
                  <ChipComponent
                    bgColor="#05ab93"
                    color="#fff"
                    label={response.price.split(",")[0]}
                  />
                  <p>Este é o preço de compra do veículo</p>
                </div>
            )}
          </Grid>
        </Grid>
      </Box>
    </main>
  )
}

export default ContainerComponent;
