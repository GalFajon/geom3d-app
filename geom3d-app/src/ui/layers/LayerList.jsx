
import { List, ListItem, ListItemText, ListItemAvatar, Avatar, IconButton } from '@mui/material'
import ShapeLine from '@mui/icons-material/ShapeLine';
import DeleteIcon from '@mui/icons-material/Delete';
import TerrainIcon from '@mui/icons-material/Terrain';
import ArchitectureIcon from '@mui/icons-material/Architecture';
import { useEffect, useState } from 'react';

export default function LayerList(props) {
    const [layerMarkup, setLayerMarkup] = useState([]);
    const [layersComp, setlayersComp] = useState(true);

    let layers = props.geom3dView.layers;

    useEffect(() => {
        let layerMarkupG = [];
        let i = 0;

        for (let layer of layers) {
            let icon = <ShapeLine />;

            if (layer.type == "PointcloudLayer") icon = TerrainIcon;
            if (layer.type == "GLTFLayer") icon = ArchitectureIcon;

            layerMarkupG.push(<ListItem key={i}
                secondaryAction={
                    <IconButton edge="end" aria-label="delete" onClick={() => { props.geom3dView.removeLayer(layer); setlayersComp(!layersComp); }}>
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

    return (
        <>
            <List dense={true}>
                {layerMarkup}
            </List>
        </>
    );
}
