import { Modal, Box, Button, Typography, IconButton, TextField, Fade, Stack, Select, MenuItem } from '@mui/material'
import AddIcon from '@mui/icons-material/Add';
import { useEffect, useState } from 'react';
import { getPointclouds } from '../../api/apiWrapper';
import { GeometryLayer, PointcloudLayer } from '../../geom3d/geom3d.es';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

export default function LayerAddModal(props) {
    const [open, setOpen] = useState(false);
    const [pointclouds, setPointclouds] = useState([]);
    const [tag, setTag] = useState('');
    const [selectedPointcloud, setSelectedPointcloud] = useState('fields/cloud.js');

    useEffect(() => {
        async function init() {
            let ptclds = await getPointclouds();
            setPointclouds(ptclds);
        }

        init();
    }, []);

    const handleChange = (e) => {
        setSelectedPointcloud(e.target.value);
    };

    const handleClick = (e) => {
        let l = null;

        if (props.layerType == 'GeometryLayer') {
            l = new GeometryLayer({ geometries: [], name: tag })
        }
        else if (props.layerType == 'PointcloudLayer') {
            l = new PointcloudLayer({ urls: [`/pointclouds/${selectedPointcloud}`], name: tag })
        }

        props.addLayer(l);

        setOpen(false);
    }

    let ptcldOptions = [];

    for (let pointcloud of pointclouds) ptcldOptions.push(<MenuItem value={pointcloud.dir}>{pointcloud.name}</MenuItem>)

    return (
        <>
            <IconButton onClick={() => { setOpen(true) }}>
                <AddIcon />
            </IconButton>
            <Modal
                open={open}
                onClose={() => { setOpen(false) }}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Fade in={open}>
                    <Box sx={style} >
                        <Stack spacing={2}>
                            <TextField
                                id="layerName"
                                fullWidth={true}
                                label="Name"
                                variant="outlined"
                                value={tag}
                                onChange={(e) => {
                                    setTag(e.target.value);
                                }}
                            />
                            {
                                props.layerType == 'PointcloudLayer' && pointclouds.length > 0 ?
                                    <Select
                                        fullWidth={true}
                                        value={selectedPointcloud}
                                        onChange={handleChange}
                                    >
                                        {ptcldOptions}
                                    </Select>
                                    : <></>
                            }
                            <Button onClick={handleClick} variant="outlined">Add</Button>
                        </Stack>
                    </Box>
                </Fade>
            </Modal>
        </>
    )
}