import { Snap, Draw, Modify, Select } from '../geom3d/geom3d.es.js';
import { getView } from '../geom3d/geom3dWrapper.js';

let currentInteraction = null;
let snapInteraction = null;
let snapLayers = [];

function refreshSnap() {
    if (snapInteraction) getView().removeInteraction(snapInteraction);
    snapInteraction = new Snap({ layers: snapLayers });
    getView().addInteraction(snapInteraction);
}

export function isSnapping(layer) {
    return snapLayers.indexOf(layer) > -1;
}

export function toggleSnap(layer) {
    if (snapLayers.indexOf(layer) > -1) removeSnapLayer(layer);
    else addSnapLayer(layer);
}

export function addSnapLayer(layer) {
    snapLayers.push(layer);
    refreshSnap();
}

export function removeSnapLayer(layer) {
    if (snapLayers.indexOf(layer) > -1) snapLayers.splice(snapLayers.indexOf(layer), 1);
    refreshSnap();
}

export function clearCurrentInteraction() {
    getView().removeInteraction(currentInteraction);
    currentInteraction = null;
}

export function setCurrentInteraction(layer, type, geomType) {
    if (currentInteraction && getView()) getView().removeInteraction(currentInteraction);

    if (layer.type == 'GeometryLayer' && type == 'Draw') {
        currentInteraction = new Draw({
            layer: layer,
            type: geomType
        });

        if (getView()) {
            getView().addInteraction(currentInteraction);
            currentInteraction.addEventListener('drawend', (e) => {
                if (Array.isArray(e.detail)) for (let geom of e.detail) layer.add(geom);
                else layer.add(e.detail);
            })
        }
    }
    else if (layer.type == 'GeometryLayer' && type == 'Modify') {
        currentInteraction = new Modify({
            layer: layer,
        });

        if (getView()) {
            getView().addInteraction(currentInteraction);
        }
    }
    else if (layer.type == 'GeometryLayer' && type == 'Delete') {
        currentInteraction = new Select({
            layer: layer,
        });

        if (getView()) {
            getView().addInteraction(currentInteraction);
            currentInteraction.addEventListener('selected', (e) => {
                layer.remove(e.detail.geometry);
            })
        }
    }
}

window.addEventListener('keydown', (e) => {
    if (e.key == 'Escape') clearCurrentInteraction();
})