
import { List, ListItem, ListItemText, ListItemAvatar, Avatar, IconButton, FormControl, InputLabel, Select, MenuItem, Badge, Grid, Divider, Stack, ListItemButton } from '@mui/material'
import ShapeLine from '@mui/icons-material/ShapeLine';
import DeleteIcon from '@mui/icons-material/Delete';
import TerrainIcon from '@mui/icons-material/Terrain';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import AdsClickIcon from '@mui/icons-material/AdsClick';
import ArchitectureIcon from '@mui/icons-material/Architecture';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import FlipToFrontIcon from '@mui/icons-material/FlipToFront';
import FlipToBackIcon from '@mui/icons-material/FlipToBack';
import { useContext, useEffect, useState } from 'react';
import LayerAddModal from './LayerAddModal';
import { getView } from '../../geom3d/geom3dWrapper';
import { SelectedLayerContext } from '../../ContextWrapper';
import { clearCurrentInteraction, isSnapping, toggleSnap } from '../../interactions/interactionWrapper';
import { GeoJSON } from '../../geom3d/geom3d.es.js';

export default function LayerList(props) {
    const [layerMarkup, setLayerMarkup] = useState([]);
    const [layersComp, setLayersComp] = useState(true);
    const [layerType, setLayerType] = useState('GeometryLayer');
    const layerContext = useContext(SelectedLayerContext);

    let layers = getView().layers;
    layers.sort((a, b) => b.type == 'GeometryLayer');

    useEffect(() => {
        let layerMarkupG = [];
        let i = 0;

        for (let layer of layers) {
            let icon = <ShapeLine />;

            if (layer.type == "PointcloudLayer") icon = <TerrainIcon />;
            if (layer.type == "IFCLayer") icon = <ArchitectureIcon />;

            layerMarkupG.push(
                <ListItemButton
                    key={i}
                    selected={
                        (layerContext.selectedLayer != null && layerContext.selectedLayer == layer)
                    }
                    onClick={() => { 
                            if (layer.type == 'GeometryLayer') {
                                layerContext.setSelectedLayer(layer); 
                                setLayersComp(!layersComp);
                            }
                        }
                    }
                >
                    <ListItem
                        secondaryAction={
                            <>
                                <Stack spacing={1} direction="row">
                                    {
                                        layer.type == 'GeometryLayer' ? 
                                            <IconButton size="small" edge="end" onClick={(e) => { GeoJSON.download(GeoJSON.export(layer), layer.name); e.stopPropagation();  }}>
                                                <FileDownloadIcon></FileDownloadIcon>
                                            </IconButton>
                                        : 
                                            <></>
                                    }
                                    <IconButton size="small" edge="end" onClick={(e) => { toggleSnap(layer); setLayersComp(!layersComp); e.stopPropagation(); }}>
                                        {
                                            isSnapping(layer) ? <AdsClickIcon /> : <AdsClickIcon color='disabled' />
                                        }
                                    </IconButton>
                                    { 
                                        layer.type == 'GeometryLayer' ?
                                        <IconButton size="small" edge="end" onClick={(e) => { if (layer.depthTesting) layer.disableDepthTesting(); else layer.enableDepthTesting(); setLayersComp(!layersComp); e.stopPropagation(); }}>
                                            {
                                                layer.depthTesting ? <FlipToFrontIcon /> : <FlipToBackIcon />
                                            }
                                        </IconButton>
                                        : <></>
                                    }
                                    <IconButton size="small" edge="end" onClick={(e) => { if (layer.visible) layer.hide(); else layer.show(); setLayersComp(!layersComp); e.stopPropagation(); }}>
                                        {
                                            layer.visible ? <VisibilityIcon /> : <VisibilityOffIcon />
                                        }
                                    </IconButton>
                                    <IconButton size="small" edge="end" onClick={(e) => { 
                                        getView().removeLayer(layer); 
                                        
                                        if (layerContext.selectedLayer == layer) {
                                            clearCurrentInteraction(); 
                                            layerContext.setSelectedLayer(null);
                                        }

                                        setLayersComp(!layersComp);
                                        e.stopPropagation();
                                    }}>
                                        <DeleteIcon />
                                    </IconButton>
                                </Stack>
                            </>
                        }
                    >
                        <ListItemAvatar>
                            <Avatar>{icon}</Avatar>
                        </ListItemAvatar>
                        <ListItemText
                            primary={layer.name}
                            secondary={layer.type}
                        />
                    </ListItem>
                </ListItemButton>
            );

            i++;
        }

        setLayerMarkup(layerMarkupG);
    }, [layersComp])

    const handleChange = (e) => {
        setLayerType(e.target.value);
    };

    const addLayer = (layer) => {
        getView().addLayer(layer);
        setLayersComp(!layersComp);
    }

    return (
        <>
            <Grid container sx={{ m: 1 }} alignItems="center" justifyContent="flex-center" spacing={2}>
                <Grid size={8}>
                    <Select
                        fullWidth={true}
                        value={layerType}
                        onChange={handleChange}
                    >
                        <MenuItem value='GeometryLayer'><Badge><ShapeLine /></Badge> Geometry layer</MenuItem>
                        <MenuItem value='PointcloudLayer'><Badge><TerrainIcon /></Badge> Pointcloud layer</MenuItem>
                        <MenuItem value='IFCLayer'><Badge><ArchitectureIcon /></Badge> IFC layer</MenuItem>
                    </Select>
                </Grid>
                <Grid size={4}>
                    <LayerAddModal layerType={layerType} addLayer={addLayer} />
                </Grid>
            </Grid>
            <Divider></Divider>
            <List dense={true}>
                {layerMarkup}
            </List>
        </>
    );
}
