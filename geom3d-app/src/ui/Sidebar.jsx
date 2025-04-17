import React from "react";
import LayerList from "./layers/LayerList";

export default function Sidebar(props) {
    return (
        <>
            {
                props.geom3dView && props.geom3dView.layers ?
                    <LayerList geom3dView={props.geom3dView} />
                    :
                    <></>
            }
        </>
    );
}
