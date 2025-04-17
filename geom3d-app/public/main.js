import { initialize, GeometryLayer, Line, Polygon, Point, View, Draw, Snap, Modify } from './geom3d/geom3d.es.js';

async function main() {
    let view = new View({ layers: [] });

    await initialize({
        viewer: {
            background: 'skybox'
        },
        view: view
    })

    view.center();
}

main();
alert("ASDF");