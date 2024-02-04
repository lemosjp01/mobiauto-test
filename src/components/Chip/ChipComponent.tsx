import { Chip } from "@mui/material";
import React, { FunctionComponent } from "react";

interface IChipProps {
  label: string;
  bgColor: string;
  color: string;
}

const ChipComponent: FunctionComponent<IChipProps> = ({ label, bgColor, color }) => {
  return (
    <Chip
      sx={{
        backgroundColor: bgColor,
        color: color,
        paddingX: 1,
        fontSize: 24,
      }}
      label={label}
      size="medium"
    />
  );
}

export default ChipComponent;