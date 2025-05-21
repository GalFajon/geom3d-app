import React from "react";
import LayerList from "./layers/LayerList";
import { Drawer, Toolbar, Box } from "@mui/material";
import { getView } from "../geom3d/geom3dWrapper";

export default function Sidebar(props) {
    return (
        <Drawer variant="permanent">
            <Box sx={{ width: '450px' }}>
                <Toolbar />
                {
                    getView() && getView().layers ?
                        <LayerList/>
                        :
                        <></>
                }
            </Box>
        </Drawer>
    );
}
