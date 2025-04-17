
"use client"

import { useScripts } from './misc/useScript.js'
import { initialize, setView, PointcloudLayer, GeometryLayer, Line, Polygon, Point, View, Draw, Snap, Modify, OverlayLayer, Overlay, GLTFLayer } from './geom3d/geom3d.es.js';
import { useEffect, useState } from 'react';
import Sidebar from './ui/Sidebar.jsx';
import { AppBar, Toolbar, Button, Grid } from '@mui/material';
import Nav from './ui/Nav.jsx';

function App() {
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
      await initialize({
        viewer: {
          background: 'skybox'
        }
      })

      let view = new View({
        layers: []
      });

      setView(view);
      setGeom3dView(view);
      view.center();
    }

    if (scriptsLoaded) main();
  }, [scriptsLoaded])

  return (
    <>
      <Grid container>
        <Nav geom3dView={geom3dView} />
        <Sidebar sx={{ zIndex: 2147483647 }} geom3dView={geom3dView} />
        <div className="potree_container">
          <div id="potree_render_area"></div>
          <div id="potree_sidebar_container"></div>
        </div>
      </Grid>
    </>
  )
}

export default App
