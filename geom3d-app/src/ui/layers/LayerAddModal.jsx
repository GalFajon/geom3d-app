import { Modal, Box, Button, Typography, IconButton, TextField, Fade, Stack, Select, MenuItem } from '@mui/material'
import AddIcon from '@mui/icons-material/Add';
import { useEffect, useState } from 'react';
import { getIFCs, getPointclouds } from '../../api/apiWrapper';
import { GeometryLayer, PointcloudLayer } from '../../geom3d/geom3d.es.js';
import { IFCLayer } from '../../geom3d/geom3d.es.js';
import { GeoJSON } from '../../geom3d/geom3d.es.js';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { styled } from '@mui/material/styles';

const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
});

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
    const [tag, setTag] = useState('');

    const [pointclouds, setPointclouds] = useState([]);
    const [ifcs, setIFCs] = useState([]);
    const [selectedPointcloud, setSelectedPointcloud] = useState('fields/cloud.js');
    const [selectedIFC, setSelectedIFC] = useState('test/test.ifc');

    const [customIfcUrl, setCustomIfcUrl] = useState('');
    const [customPtcldUrl, setCustomPtcldUrl] = useState('');
    const [geomLayerGeojson, setGeomLayerGeojson] = useState(null);

    useEffect(() => {
        async function init() {
            let ptclds = await getPointclouds();
            setPointclouds(ptclds);

            let ifcs = await getIFCs();
            setIFCs(ifcs);
        }

        init();
    }, []);

    const handleChange = (e) => {
        setSelectedPointcloud(e.target.value);
    };

    const handleChangeIFC = (e) => {
        setSelectedIFC(e.target.value);
    };

    const handleClick = (e) => {
        let l = null;

        if (props.layerType == 'GeometryLayer') l = new GeometryLayer({ geometries: geomLayerGeojson ? GeoJSON.import(geomLayerGeojson) : [], name: tag })
        else if (props.layerType == 'PointcloudLayer') l = new PointcloudLayer({ urls: [ customPtcldUrl == '' ? `/pointclouds/${selectedPointcloud}` : customPtcldUrl], name: tag })
        else if (props.layerType == 'IFCLayer') l = new IFCLayer({ urls: [customIfcUrl == '' ? `/ifcs/${selectedIFC}` : customIfcUrl], name: tag })

        props.addLayer(l);

        setOpen(false);
    }

    let ptcldOptions = [];
    let ifcOptions = [];

    for (let pointcloud of pointclouds) ptcldOptions.push(<MenuItem value={pointcloud.dir}>{pointcloud.name}</MenuItem>)
    for (let ifc of ifcs) ifcOptions.push(<MenuItem value={ifc.dir}>{ifc.name}</MenuItem>)
    
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
                                props.layerType == 'GeometryLayer' ? <>
                                    <Stack direction={'row'} spacing={2}>
                                        <Button
                                            component="label"
                                            role={undefined}
                                            variant="contained"
                                            tabIndex={-1}
                                            startIcon={<CloudUploadIcon />}
                                            fullWidth
                                        >
                                            Upload GeoJSON
                                            <VisuallyHiddenInput
                                                type="file"
                                                onChange={(event) => {
                                                    let reader = new FileReader();
                                                    
                                                    if (event.target.files.length > 0) {
                                                        reader.readAsText(event.target.files[0], "UTF-8");

                                                        reader.onload = function (evt) {
                                                            try {
                                                                setGeomLayerGeojson(JSON.parse(evt.target.result));
                                                                event.target.value = null;
                                                            }
                                                            catch (err) {
                                                                console.log(err);
                                                                throw ("Error reading file.");
                                                            }
                                                        }
                                                        reader.onerror = function (evt) {
                                                            throw("Error reading file.");
                                                        }
                                                    }
                                                }}
                                            />
                                        </Button>
                                        <Button 
                                            onClick={() => { setGeomLayerGeojson(null); }}
                                            variant="contained"
                                            fullWidth
                                        >
                                            Clear
                                        </Button>
                                    </Stack>
                                    {
                                        geomLayerGeojson ? 
                                        <TextField
                                            style={{textAlign: 'left', color: 'black'}}
                                            multiline
                                            rows={10}
                                            value={`${JSON.stringify(geomLayerGeojson, undefined, 4).substring(0,200)}...`}
                                            disabled={true}
                                        />
                                        : <></>
                                    }
                                </>
                                :
                                <></>
                            }
                            {
                                props.layerType == 'PointcloudLayer' ?
                                    <>
                                    {
                                        pointclouds.length > 0 ?
                                        <Select
                                            fullWidth={true}
                                            value={selectedPointcloud}
                                            onChange={handleChange}
                                        >
                                            {ptcldOptions}
                                        </Select> : <></>
                                    }
                                        <TextField
                                            id="ptcldUrl"
                                            fullWidth={true}
                                            label="Pointcloud URL"
                                            variant="outlined"
                                            value={customPtcldUrl}
                                            onChange={(e) => {
                                                setCustomPtcldUrl(e.target.value);
                                            }}
                                        />
                                    </>
                                    : <></>
                            }
                            {
                                props.layerType == 'IFCLayer' ?
                                    <>
                                    {ifcs.length > 0 ?
                                        <Select
                                            fullWidth={true}
                                            value={selectedIFC}
                                            onChange={handleChangeIFC}
                                        >
                                            {ifcOptions}
                                        </Select> : <></>
                                    }
                                    <TextField
                                        id="ifcUrl"
                                        fullWidth={true}
                                        label="IFC URL"
                                        variant="outlined"
                                        value={customIfcUrl}
                                        onChange={(e) => {
                                            setCustomIfcUrl(e.target.value);
                                        }}
                                    />
                                    </>
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