import React from "react";
import LayerList from "./layers/LayerList";
import { Drawer, Toolbar, Box } from "@mui/material";

export default function Sidebar(props) {
    return (
        <Drawer variant="permanent">
            <Box sx={{ width: '400px' }}>
                <Toolbar />
                {
                    props.geom3dView && props.geom3dView.layers ?
                        <LayerList geom3dView={props.geom3dView} />
                        :
                        <></>
                }
            </Box>
        </Drawer>
    );
}
