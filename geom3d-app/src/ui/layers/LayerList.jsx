
import { List, ListItem, ListItemText, ListItemAvatar, Avatar, IconButton, FormControl, InputLabel, Select, MenuItem, Badge, Grid, Divider, Stack, ListItemButton } from '@mui/material'
import ShapeLine from '@mui/icons-material/ShapeLine';
import DeleteIcon from '@mui/icons-material/Delete';
import TerrainIcon from '@mui/icons-material/Terrain';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

import ArchitectureIcon from '@mui/icons-material/Architecture';
import { useEffect, useState } from 'react';
import LayerAddModal from './LayerAddModal';

export default function LayerList(props) {
    const [layerMarkup, setLayerMarkup] = useState([]);
    const [layersComp, setLayersComp] = useState(true);
    const [layerType, setLayerType] = useState('GeometryLayer');
    const [selectedGeometryLayer, setSelectedGeometryLayer] = useState(null);

    let layers = props.geom3dView.layers;

    useEffect(() => {
        let layerMarkupG = [];
        let i = 0;

        console.log(selectedGeometryLayer);

        for (let layer of layers) {
            let icon = <ShapeLine />;

            if (layer.type == "PointcloudLayer") icon = <TerrainIcon />;
            if (layer.type == "GLTFLayer") icon = <ArchitectureIcon />;

            layerMarkupG.push(
                <ListItemButton
                    key={i}
                    selected={
                        (selectedGeometryLayer != null && selectedGeometryLayer == layers.indexOf(layer))
                    }
                    onClick={() => { if (layer.type == 'GeometryLayer') setSelectedGeometryLayer(layers.indexOf(layer)); }}
                >
                    <ListItem
                        secondaryAction={
                            <>
                                <Stack spacing={2} direction="row">
                                    <IconButton edge="end" onClick={() => { if (layer.visible) layer.hide(); else layer.show(); setLayersComp(!layersComp); }}>
                                        {
                                            layer.visible ? <VisibilityIcon /> : <VisibilityOffIcon />
                                        }
                                    </IconButton>
                                    <IconButton edge="end" onClick={() => { props.geom3dView.removeLayer(layer); setLayersComp(!layersComp); }}>
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
    }, [layersComp, selectedGeometryLayer])

    const handleChange = (e) => {
        setLayerType(e.target.value);
    };

    const addLayer = (layer) => {
        console.log(layer);
        props.geom3dView.addLayer(layer);
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
