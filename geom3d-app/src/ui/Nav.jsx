import React from "react";
import LayerList from "./layers/LayerList";
import { AppBar, Toolbar, Button, Grid, IconButton, Box, Stack } from '@mui/material';
import ModeIcon from '@mui/icons-material/Mode';
import CenterFocusStrongIcon from '@mui/icons-material/CenterFocusStrong';
import DesignServicesIcon from '@mui/icons-material/DesignServices';

export default function Nav(props) {
    return (
        <AppBar sx={{ zIndex: 2147483647 }} position="static">
            <Toolbar>
                <Box display='flex' flexGrow={1}></Box>
                <Stack spacing={2} direction="row">
                    <IconButton onClick={() => { if (props.geom3dView) props.geom3dView.center() }} color="inherit">
                        <CenterFocusStrongIcon />
                    </IconButton>
                    <IconButton color="inherit">
                        <DesignServicesIcon />
                    </IconButton>
                    <IconButton color="inherit">
                        <ModeIcon />
                    </IconButton>
                </Stack>
            </Toolbar>
        </AppBar>
    );
}
