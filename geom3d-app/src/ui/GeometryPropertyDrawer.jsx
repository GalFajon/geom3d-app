import { Button, Drawer, Table, TableBody, TableCell, TableHead, TableRow, TextField, IconButton } from '@mui/material';
import { useState } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';

export default function GeometryPropertyDrawer(props) {
    const [key, setKey] = useState('');
    const [value, setValue] = useState('');

    const callback = (key,value) => {
        props.onAdd(key,value);
    }

    const callbackRemove = (key) => {
        props.onRemove(key);
    }

    return <>
        <Drawer
        anchor={'bottom'}
        open={props.open}
        variant='persistent'
        slotProps={{
            paper: {
                sx: { marginLeft: "450px", width:"calc(100%-450px)", height: '20%' },
            }
        }}
        >
            <Table sx={{ minWidth: 400 }} size="small" aria-label="a dense table">
                <TableHead>
                <TableRow>
                    <TableCell>Property</TableCell>
                    <TableCell>Value</TableCell>
                    <TableCell></TableCell>
                </TableRow>
                </TableHead>
                <TableBody>
                        {
                            Object.entries(props.value).map((v, i) => { 
                                return <TableRow key={i} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                    <TableCell component="th" scope="row">{v[0]}</TableCell>
                                    <TableCell>{v[1]}</TableCell>
                                    <TableCell><IconButton variant="contained" size="small" onClick={() => {callbackRemove(v[0])}}><DeleteIcon/></IconButton></TableCell>
                                </TableRow>;
                            })
                        }
                        <TableRow>
                            <TableCell><TextField value={key} onChange={(event) => {setKey(event.target.value); }} size="small" variant="standard"></TextField></TableCell>
                            <TableCell><TextField value={value} onChange={(event) => {setValue(event.target.value); }} size="small" variant="standard"></TextField></TableCell>
                            <TableCell><Button variant="contained" size="small" onClick={() => {callback(key,value)}}>Add</Button></TableCell>
                        </TableRow>
                </TableBody>
            </Table>
        </Drawer>
    </>
}