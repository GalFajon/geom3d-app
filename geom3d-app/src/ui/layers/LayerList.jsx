
import { List, ListItem, ListItemText, ListItemAvatar, Avatar, IconButton, FormControl, InputLabel, Select, MenuItem, Badge, Grid, Divider } from '@mui/material'
import ShapeLine from '@mui/icons-material/ShapeLine';
import DeleteIcon from '@mui/icons-material/Delete';
import TerrainIcon from '@mui/icons-material/Terrain';
import ArchitectureIcon from '@mui/icons-material/Architecture';
import { useEffect, useState } from 'react';
import LayerAddModal from './LayerAddModal';

export default function LayerList(props) {
    const [layerMarkup, setLayerMarkup] = useState([]);
    const [layersComp, setLayersComp] = useState(true);
    const [layerType, setLayerType] = useState('GeometryLayer');

    let layers = props.geom3dView.layers;

    useEffect(() => {
        let layerMarkupG = [];
        let i = 0;

        for (let layer of layers) {
            let icon = <ShapeLine />;

            if (layer.type == "PointcloudLayer") icon = <TerrainIcon />;
            if (layer.type == "GLTFLayer") icon = <ArchitectureIcon />;

            layerMarkupG.push(<ListItem key={i}
                secondaryAction={
                    <IconButton edge="end" onClick={() => { props.geom3dView.removeLayer(layer); setLayersComp(!layersComp); }}>
                        <DeleteIcon />
                    </IconButton>
                }
            >
                <ListItemAvatar>
                    <Avatar>{icon}</Avatar>
                </ListItemAvatar>
                <ListItemText
                    primary={layer.name}
                    secondary={layer.type}
                />
            </ListItem>);

            i++;
        }

        setLayerMarkup(layerMarkupG);
    }, [layersComp])

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
