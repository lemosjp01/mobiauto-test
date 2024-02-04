import { Paper as MuiPaper } from '@mui/material';
import React, { FunctionComponent, ReactNode } from 'react';

interface IPaperProps { 
  children: ReactNode;
}

const Paper: FunctionComponent<IPaperProps> = ({ children }) => {
  return (
    <MuiPaper elevation={1}>
      {children}
    </MuiPaper>
  );
}

export default Paper;