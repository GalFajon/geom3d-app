
"use client"

import { useScripts } from './misc/useScript.js'
import { initialize, setView, PointcloudLayer, GeometryLayer, Line, Polygon, Point, View, Draw, Snap, Modify, OverlayLayer, Overlay, GLTFLayer } from './geom3d/geom3d.es.js';
import { useEffect, useState } from 'react';
import Sidebar from './ui/Sidebar.jsx';
import { Grid } from '@mui/material';

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
        layers: [
          new GeometryLayer({
            name: "Layer name",
            geometries: [
              new Line([[0, 0, 0], [10, 10, 10]])
            ]
          })
        ]
      });

      setView(view);
      setGeom3dView(view);
      view.center();
    }

    if (scriptsLoaded) main();
  }, [scriptsLoaded])

  return (
    <>
      <div style={{ width: '25%' }}>
        <Sidebar geom3dView={geom3dView} />
      </div>
      <div className="potree_container">
        <div style={{ marginLeft: '25%', width: '75%', height: '100%' }} id="potree_render_area"></div>
        <div id="potree_sidebar_container"></div>
      </div>
    </>
  )
}

export default App
