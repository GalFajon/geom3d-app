
"use client"

import { useScripts } from './misc/useScript.js'
import { useEffect, useState } from 'react';
import Sidebar from './ui/Sidebar.jsx';
import { AppBar, Toolbar, Button, Grid } from '@mui/material';
import Nav from './ui/Nav.jsx';
import { getView, initializeGeom3D } from './geom3d/geom3dWrapper.js';
import { SelectedGeometryContext, SelectedLayerContext } from './ContextWrapper.js';
import GeometryPropertyDrawer from './ui/GeometryPropertyDrawer.jsx';

function App() {
  const [selectedLayer, setSelectedLayer] = useState(null);
  const [selectedGeometry, setSelectedGeometry] = useState(null);
  const [scriptsLoaded, setScriptsLoaded] = useState(false);
  const [geom3dView, setGeom3dView] = useState(null);

  useScripts([
    "./dependencies/potree/build/libs/jquery/jquery-3.1.1.min.js",
    "./dependencies/potree/build/libs/jquery-ui/jquery-ui.min.js",
    "./dependencies/potree/build/libs/spectrum/spectrum.js",
    "./dependencies/potree/build/libs/other/BinaryHeap.js",
    "./dependencies/potree/build/libs/tween/tween.min.js",
    "./dependencies/potree/build/libs/d3/d3.min.js",
    "./dependencies/potree/build/libs/proj4/proj4.js",
    "./dependencies/potree/build/libs/openlayers3/ol.js",
    "./dependencies/potree/build/libs/i18next/i18next.js",
    "./dependencies/potree/build/libs/jstree/jstree.js",
    "./dependencies/potree/build/potree/potree.js",
    "./dependencies/potree/build/libs/plasio/js/laslaz.js"
  ], () => { setScriptsLoaded(true) });

  useEffect(() => {
    async function main() {
      let view = await initializeGeom3D();
      setGeom3dView(view);
    }

    if (scriptsLoaded) main();
  }, [scriptsLoaded])

  return (
    <>
      <SelectedGeometryContext.Provider value={{ selectedGeometry: selectedGeometry, setSelectedGeometry: setSelectedGeometry }}>
      <SelectedLayerContext.Provider value={{ selectedLayer: selectedLayer, setSelectedLayer: setSelectedLayer }}>
      <Grid container>
        { 
          geom3dView ? 
            <>
              <Nav/>
              <Sidebar sx={{ zIndex: 2147483647 }}/>
            </>
            : <></>
        }
        <div className="potree_container">
          <div id="potree_render_area"></div>
          <div id="potree_sidebar_container"></div>
        </div>
      </Grid>
      </SelectedLayerContext.Provider>
      </SelectedGeometryContext.Provider>
    </>
  )
}

export default App
