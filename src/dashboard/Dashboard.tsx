import React, { useContext, useEffect, useState } from 'react';
import { createTheme, styled, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import MuiDrawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Link from '@mui/material/Link';
import { TextField } from '@mui/material';
import { CastConnectedRounded } from '@mui/icons-material';
import { MainListItems } from './listItems';
import Chart from './Chart';
import PinData from './PinData';
import Pinout from './Pinout';
import { GPIOContext } from '../App';
import { SendHandler } from '../types';


function Copyright(props: any) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://nstrumenta.com/">
        nstrumenta
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const drawerWidth: number = 72;

interface AppBarProps extends MuiAppBarProps {
}

const AppBar = styled(MuiAppBar, {})<AppBarProps>(({ theme }) => ({
  zIndex: theme.zIndex.drawer + 1,
  marginLeft: drawerWidth,
  width: `calc(100% - ${drawerWidth}px)`,
}));

const Drawer = styled(MuiDrawer, {})(
  ({ theme }) => ({
    '& .MuiDrawer-paper': {
      position: 'relative',
      whiteSpace: 'nowrap',
      width: drawerWidth,
      boxSizing: 'border-box',
      overflowX: 'hidden',
      [theme.breakpoints.up('sm')]: {
        width: theme.spacing(9),
      },
    },
  }),
);

const mdTheme = createTheme();
// const darkTheme = createTheme({
//   palette: {
//     mode: 'dark',
//   }
// })

// const time = new Date(2021, 11, 20, 8, 0, 0);

export interface OpenViews {
  pins: boolean,
  data: boolean,
}

export default function Dashboard({
  wsUrl,
  setWsUrl,
  connected,
  sendHandler,
}: { sendHandler: SendHandler, wsUrl: string, setWsUrl: (url: string) => void, connected: boolean }) {
  const [updatedWsUrl, setUpdatedWsUrl] = useState<string>(wsUrl);
  const [openViews, setOpenViews] = useState<OpenViews>({ pins: true, data: true });
  const [activePin, setActivePin] = useState<number>(1);
  const [sendValue, setSendValue] = useState<1 | 0>(0);

  useEffect(() => {
    console.log({ sendHandler });
  }, [sendHandler])

  const data = useContext(GPIOContext);

  const updateViews = (name: string, state: boolean) => {
    console.log('updateViews', name, state)
    setOpenViews({ ...openViews, [name]: state })
  };

  // TODO: sendHandler is being passed through multiple levels of components; use context and hook
  console.log('[Dashboard:render], sendHandler:', sendHandler);

  return (
    <ThemeProvider theme={mdTheme}>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline/>
        <AppBar position="absolute">

          <Toolbar>
            <Typography
              component="h1"
              variant="h6"
              color="inherit"
              noWrap
              sx={{ flexGrow: 1 }}
            >
              Raspberry PI GPIO
            </Typography>
          </Toolbar>
        </AppBar>
        <Drawer variant="permanent">
          <Toolbar
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              px: [1],
            }}
          >
            <CastConnectedRounded color={connected ? 'secondary' : 'disabled'} sx={{ backgroundColor: 'action' }}/>
          </Toolbar>

          <Divider/>
          <List><MainListItems updateViews={updateViews} openViews={openViews}/></List>
        </Drawer>

        <Box
          component="main"
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === 'light'
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
            flexGrow: 1,
            height: '100vh',
            overflow: 'auto',
          }}
        >
          <Toolbar/>
          <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Grid container spacing={3}>
              <Grid item xs={6} lg={12}>
                {/*<Paper sx={{ padding: 2 }}>*/}
                {/*  <TextField disabled={!connected} variant="standard"*/}
                {/*             label={`Pin ${activePin}`}*/}
                {/*             onChange={(e) => {*/}
                {/*               console.log(`set send value to ${e.target.value ? 1 : 0}`)*/}
                {/*               setSendValue(e.target.value ? 1 : 0)*/}
                {/*             }}*/}
                {/*  />*/}
                {/*  <Button disabled={!connected} onClick={() => {*/}
                {/*    sendHandler({ action: 'write', id: activePin, value: sendValue });*/}
                {/*  }}*/}
                {/*          variant="outlined" type="submit" aria-label="send to pin">Send</Button>*/}
                {/*</Paper>*/}
              </Grid>
              <Grid item xs={6} lg={12}>
                <Paper sx={{ padding: 2 }}>
                  <TextField variant="standard"
                             label="websocket host"
                             onChange={(e) => setUpdatedWsUrl(e.target.value)}
                             onBlur={() => setWsUrl(updatedWsUrl)} value={updatedWsUrl}
                             onKeyDown={(e) => {
                               if (e.key.toLowerCase() === 'enter') setWsUrl(updatedWsUrl);
                             }}
                             fullWidth
                  />
                </Paper>
              </Grid>
              {/* Pinout */}
              {openViews.pins && (<Grid item xs={12} md={5}>
                <Paper
                  sx={{
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    width: 1,
                  }}
                >
                  <Pinout
                    connected={connected}
                    sendHandler={sendHandler}
                    setActivePin={(id: number) => setActivePin(id)}
                  />
                </Paper>
              </Grid>)}

              {/* Chart */}
              <Grid item xs={12} md={openViews.pins ? 7 : 12}>
                <Paper
                  sx={{
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    height: 480,
                  }}
                >
                  <Chart data={data}/>
                </Paper>
              </Grid>
              {/* Recent PinData */}
              <Grid item xs={12}>
                <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                  <PinData data={data}/>
                </Paper>
              </Grid>
            </Grid>
            <Copyright sx={{ pt: 4 }}/>
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
}
