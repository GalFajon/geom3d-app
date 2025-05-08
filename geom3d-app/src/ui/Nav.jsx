import React, { useContext, useState } from "react";
import LayerList from "./layers/LayerList";
import { AppBar, Toolbar, Button, Grid, IconButton, Box, Stack, Menu, MenuItem, ListItemIcon, Typography, Tooltip } from '@mui/material';
import ModeIcon from '@mui/icons-material/Mode';
import CenterFocusStrongIcon from '@mui/icons-material/CenterFocusStrong';
import DesignServicesIcon from '@mui/icons-material/DesignServices';
import { getView } from "../geom3d/geom3dWrapper";
import { clearCurrentInteraction, setCurrentInteraction } from "../interactions/interactionWrapper";
import { SelectedLayerContext } from "../ContextWrapper";

import PentagonIcon from '@mui/icons-material/Pentagon';
import TimelineIcon from '@mui/icons-material/Timeline';
import LocationPinIcon from '@mui/icons-material/LocationPin';
import DeleteIcon from '@mui/icons-material/Delete';

export default function Nav(props) {
    const layerContext = useContext(SelectedLayerContext);
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    const handleClick = (e) => {
      if (layerContext.selectedLayer) setAnchorEl(e.currentTarget);
    };
    const handleClose = () => {
      setAnchorEl(null);
    };

    function addDelete() {
        clearCurrentInteraction();

        if (layerContext.selectedLayer) { 
            setCurrentInteraction(layerContext.selectedLayer,'Delete');
        }
    }

    function addModify() {
        clearCurrentInteraction();

        if (layerContext.selectedLayer) { 
            setCurrentInteraction(layerContext.selectedLayer,'Modify');
        }
    }
    
    function addDraw(geomType) {
        clearCurrentInteraction();

        if (layerContext.selectedLayer) { 
            setCurrentInteraction(layerContext.selectedLayer,'Draw', geomType);
        }
    }

    return (
        <AppBar sx={{ zIndex: 2147483647 }} position="static">
            <Toolbar>
                <Typography variant="h5">Geom3D</Typography>
                <Box display='flex' flexGrow={1}></Box>
                <Stack spacing={2} direction="row">
                    <Tooltip title="Center view">
                        <span>
                            <IconButton onClick={() => { if (getView()) getView().center() }} color="inherit">
                                <CenterFocusStrongIcon />
                            </IconButton>
                        </span>
                    </Tooltip>
                    <Tooltip title={layerContext.selectedLayer ? "Delete geometry" : "Create and select a geometry layer to use this tool."}>
                        <span>
                            <IconButton 
                                color="inherit"
                                disabled={!layerContext.selectedLayer}
                                onClick={() => { addDelete() }}
                            >
                                <DeleteIcon/>
                            </IconButton>
                        </span>
                    </Tooltip>
                    <Tooltip title={layerContext.selectedLayer ? "Modify geometry on selected layer" : "Create and select a geometry layer to use this tool."}>
                        <span>
                            <IconButton 
                                color="inherit"
                                disabled={!layerContext.selectedLayer}
                                onClick={() => { addModify() }}
                            >
                                <DesignServicesIcon />
                            </IconButton>
                        </span>
                    </Tooltip>
                    <Tooltip title={layerContext.selectedLayer ? "Draw geometry on selected layer" : "Create and select a geometry layer to use this tool."}>
                        <span>
                            <IconButton 
                                color="inherit"
                                id="draw-dropdown-button"
                                aria-controls={open ? 'basic-menu' : undefined}
                                aria-haspopup="true"
                                aria-expanded={open ? 'true' : undefined}
                                onClick={handleClick}
                                disabled={!layerContext.selectedLayer}
                            >
                                <ModeIcon />
                            </IconButton>
                        </span>
                    </Tooltip>
                    <Menu
                        id="draw-dropdown-menu"
                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleClose}
                        MenuListProps={{
                        'aria-labelledby': 'draw-dropdown-button',
                        }}
                        sx={{ zIndex: 2147483647 }}
                    >
                        <MenuItem onClick={() => { addDraw('Polygon'); handleClose(); }}>
                            <ListItemIcon>
                                <PentagonIcon fontSize="small" />
                            </ListItemIcon>
                            Polygon
                        </MenuItem>
                        <MenuItem onClick={() => { addDraw('Line'); handleClose(); }}>
                            <ListItemIcon>
                                <TimelineIcon fontSize="small" />
                            </ListItemIcon>
                            Line
                        </MenuItem>
                        <MenuItem onClick={() => { addDraw('Point'); handleClose(); }}>
                            <ListItemIcon>
                                <LocationPinIcon fontSize="small" />
                            </ListItemIcon>
                            Point
                        </MenuItem>
                    </Menu>
                </Stack>
            </Toolbar>
        </AppBar>
    );
}
