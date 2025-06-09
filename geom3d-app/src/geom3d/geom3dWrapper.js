import { initialize, setView, PointcloudLayer, GeometryLayer, Line, Polygon, Point, View, Draw, Snap, Modify } from './geom3d.es.js';

let view = null;

export async function initializeGeom3D() {
    await initialize({
        viewer: {
          background: 'skybox'
        }
    })

    view = new View({
        layers: []
    });

    setView(view);
    view.center();

    return view;
}

export function getView() {
    return view;
}