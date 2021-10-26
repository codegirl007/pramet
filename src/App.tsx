import { ThemeProvider } from '@material-ui/core';
import React from 'react';
import { ImageDisplayer } from './view/screens/ImageDisplayer';
import { RightPanel } from './view/screens/RightPanel';
import { defaultTheme } from './view/themes/defaultTheme';

export const App = () => {
  return (
    <ThemeProvider theme={defaultTheme}>
      <ImageDisplayer />
      <RightPanel />   
    </ThemeProvider>
  );
}


