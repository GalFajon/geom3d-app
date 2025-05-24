import React, { useContext, useEffect, useState } from "react";
import LayerList from "./layers/LayerList";
import { AppBar, Toolbar, Button, Grid, IconButton, Box, Stack, Menu, MenuItem, ListItemIcon, Typography, Tooltip } from '@mui/material';
import ModeIcon from '@mui/icons-material/Mode';
import CenterFocusStrongIcon from '@mui/icons-material/CenterFocusStrong';
import DesignServicesIcon from '@mui/icons-material/DesignServices';
import { getView } from "../geom3d/geom3dWrapper";
import { clearCurrentInteraction, setCurrentInteraction } from "../interactions/interactionWrapper";
import { SelectedLayerContext } from "../ContextWrapper";
import { SelectedGeometryContext } from "../ContextWrapper";
import GeometryPropertyDrawer from "../ui/GeometryPropertyDrawer.jsx";
import PentagonIcon from '@mui/icons-material/Pentagon';
import TimelineIcon from '@mui/icons-material/Timeline';
import LocationPinIcon from '@mui/icons-material/LocationPin';
import DeleteIcon from '@mui/icons-material/Delete';
import InfoIcon from '@mui/icons-material/Info';
import ContentCutIcon from '@mui/icons-material/ContentCut';
import HealingIcon from '@mui/icons-material/Healing';

export default function Nav(props) {
    const layerContext = useContext(SelectedLayerContext);
    const selectedGeometryContext = useContext(SelectedGeometryContext);
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const [geomProperties, setGeomProperties] = useState({});
    const [geomPropertiesOpen, setGeomPropertiesOpen] = useState(false);

    const handleClick = (e) => {
      if (layerContext.selectedLayer) setAnchorEl(e.currentTarget);
    };
    
    const handleClose = () => {
      setAnchorEl(null);
    };

    function addDelete() {
        clearCurrentInteraction();
        setGeomPropertiesOpen(false); 

        if (layerContext.selectedLayer) { 
            setCurrentInteraction(layerContext.selectedLayer,'Delete');
        }
    }

    function addCarve() {
        clearCurrentInteraction();
        setGeomPropertiesOpen(false); 

        if (layerContext.selectedLayer) { 
            setCurrentInteraction(layerContext.selectedLayer,'Carve');
        }
    }

    function addFill() {
        clearCurrentInteraction();
        setGeomPropertiesOpen(false); 

        if (layerContext.selectedLayer) { 
            setCurrentInteraction(layerContext.selectedLayer,'Fill');
        }
    }

    function addModify() {
        clearCurrentInteraction();
        setGeomPropertiesOpen(false); 

        if (layerContext.selectedLayer) { 
            setCurrentInteraction(layerContext.selectedLayer,'Modify');
        }
    }
    
    function addDraw(geomType) {
        clearCurrentInteraction();
        setGeomPropertiesOpen(false); 

        if (layerContext.selectedLayer) { 
            setCurrentInteraction(layerContext.selectedLayer,'Draw', geomType);
        }
    }

    window.addEventListener('keydown', (e) => {
        if (e.key == 'Escape' && geomPropertiesOpen) setGeomPropertiesOpen(false); 
    })

    //useEffect(() => {
    //    selectedGeometryContext.selectedGeometry.properties = geomProperties;
    //}, [geomProperties])

    function addSelect() {
        clearCurrentInteraction();

        if (layerContext.selectedLayer) { 
            let select = setCurrentInteraction(layerContext.selectedLayer,'Select');

            select.addEventListener('selected', (e) => {
                selectedGeometryContext.setSelectedGeometry(e.detail.geometry);
                setGeomProperties(e.detail.geometry.properties);
                setGeomPropertiesOpen(true);
            });
        }
    }

    const onAdd = (key,value) => {
        let o = JSON.parse(JSON.stringify(geomProperties));
        o[key] = value;
        setGeomProperties(o);

        selectedGeometryContext.selectedGeometry.properties = o;
    }
    
    const onRemove = (key) => {
        let o = JSON.parse(JSON.stringify(geomProperties));
        delete o[key];
        setGeomProperties(o);

        selectedGeometryContext.selectedGeometry.properties = o;
    }

    return (
        <>
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
                    <Tooltip title={layerContext.selectedLayer ? "Carve holes into geometry" : "Create and select a geometry layer to use this tool."}>
                        <span>
                            <IconButton 
                                color="inherit"
                                disabled={!layerContext.selectedLayer}
                                onClick={() => { addCarve() }}
                            >
                                <ContentCutIcon/>
                            </IconButton>
                        </span>
                    </Tooltip>
                    <Tooltip title={layerContext.selectedLayer ? "Fill holes in geometry" : "Create and select a geometry layer to use this tool."}>
                        <span>
                            <IconButton 
                                color="inherit"
                                disabled={!layerContext.selectedLayer}
                                onClick={() => { addFill() }}
                            >
                                <HealingIcon/>
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
                    <Tooltip title={layerContext.selectedLayer ? "View geometry attributes" : "Create and select a geometry layer to use this tool."}>
                        <span>
                            <IconButton 
                                color="inherit"
                                id="draw-dropdown-button"
                                aria-controls={open ? 'basic-menu' : undefined}
                                aria-haspopup="true"
                                aria-expanded={open ? 'true' : undefined}
                                onClick={() => { addSelect() }}
                                disabled={!layerContext.selectedLayer}
                            >
                                <InfoIcon />
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
        <GeometryPropertyDrawer open={geomPropertiesOpen} value={geomProperties} onAdd={onAdd} onRemove={onRemove}/>
        </>
    );
}
