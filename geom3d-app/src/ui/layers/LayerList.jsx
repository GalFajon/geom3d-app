
import { List, ListItem, ListItemText, ListItemAvatar, Avatar, IconButton, FormControl, InputLabel, Select, MenuItem, Badge, Grid, Divider, Stack, ListItemButton } from '@mui/material'
import ShapeLine from '@mui/icons-material/ShapeLine';
import DeleteIcon from '@mui/icons-material/Delete';
import TerrainIcon from '@mui/icons-material/Terrain';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import AdsClickIcon from '@mui/icons-material/AdsClick';
import ArchitectureIcon from '@mui/icons-material/Architecture';
import { useContext, useEffect, useState } from 'react';
import LayerAddModal from './LayerAddModal';
import { getView } from '../../geom3d/geom3dWrapper';
import { SelectedLayerContext } from '../../ContextWrapper';
import { clearCurrentInteraction, isSnapping, toggleSnap } from '../../interactions/interactionWrapper';

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
            if (layer.type == "GLTFLayer") icon = <ArchitectureIcon />;

            layerMarkupG.push(
                <ListItemButton
                    key={i}
                    selected={
                        (layerContext.selectedLayer != null && layerContext.selectedLayer == layer)
                    }
                    onClick={() => { 
                            if (layer.type == 'GeometryLayer') layerContext.setSelectedLayer(layer); 

                        }
                    }
                >
                    <ListItem
                        secondaryAction={
                            <>
                                <Stack spacing={2} direction="row">
                                    <IconButton edge="end" onClick={() => { toggleSnap(layer); setLayersComp(!layersComp); }}>
                                        {
                                            isSnapping(layer) ? <AdsClickIcon /> : <AdsClickIcon color='disabled' />
                                        }
                                    </IconButton>
                                    <IconButton edge="end" onClick={() => { if (layer.visible) layer.hide(); else layer.show(); setLayersComp(!layersComp); }}>
                                        {
                                            layer.visible ? <VisibilityIcon /> : <VisibilityOffIcon />
                                        }
                                    </IconButton>
                                    <IconButton edge="end" onClick={() => { 
                                        getView().removeLayer(layer); 
                                        if (layerContext.selectedLayer == layer) clearCurrentInteraction(); 
                                        setLayersComp(!layersComp); 
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
    }, [layersComp, layerContext.selectedLayer])

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
