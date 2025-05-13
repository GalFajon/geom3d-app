import { createContext } from 'react';

export const SelectedLayerContext = createContext({
    selectedLayer: null,
    setSelectedLayer: null
});

export const SelectedGeometryContext = createContext({
    selectedGeometry: null,
    setSelectedGeometry: null
});