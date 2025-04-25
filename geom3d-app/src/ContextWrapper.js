import { createContext, useState } from 'react';

export const SelectedLayerContext = createContext({
    selectedLayer: null,
    setSelectedLayer: null
});