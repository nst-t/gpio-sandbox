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
import { Switch, TextField } from '@mui/material';
import { CastConnectedRounded } from '@mui/icons-material';
import { MainListItems } from './listItems';
import PinData from './PinData';
import Pinout from './Pinout';
import { GPIOContext } from '../App';
import { SendHandler } from '../types';
import Chart from './Chart';


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

const theme = {
  dark: createTheme({
    palette: {
      mode: 'dark',
    }
  }),
  light: createTheme({
    palette: {
      mode: 'light',
    }
  })
}

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
  const [themePreference, setThemePreference] = useState<'light' | 'dark'>('light');
  const [error, setError] = useState<Record<string, unknown>>({});

  useEffect(() => {
    if (error.wsHost === undefined) return;

    setError({ ...error, wsHost: !connected })
  }, [connected, error.wsHost]);

  const data = useContext(GPIOContext);

  const updateViews = (name: string, state: boolean) => {
    console.log('updateViews', name, state)
    setOpenViews({ ...openViews, [name]: state })
  };

  // TODO: sendHandler is being passed through multiple levels of components; use context and hook

  return (
    <ThemeProvider theme={theme[themePreference]}>
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
            <Typography>Theme</Typography><Switch value={themePreference}
                                                  onChange={() => setThemePreference((prev) => prev === 'light' ? 'dark' : 'light')}/>
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
            flexGrow: 1,
            height: '100vh',
            overflow: 'auto',
          }}
        >
          <Toolbar/>
          <Container maxWidth={false} sx={{ mt: 4, mb: 4 }}>
            <Grid container spacing={3}>
              <Grid item xs={6}>
                <Paper sx={{ padding: 2 }}>
                  <TextField
                    variant="standard"
                    label="websocket host"
                    onChange={(e) => setUpdatedWsUrl(e.target.value)}
                    onBlur={() => setWsUrl(updatedWsUrl)} value={updatedWsUrl}
                    onKeyDown={(e) => {
                      if (e.key.toLowerCase() === 'enter') setWsUrl(updatedWsUrl);
                    }}
                    error={Boolean(error.wsHost)}
                    fullWidth
                  />
                </Paper>
              </Grid>
              {/* Pinout */}
              {openViews.pins && (<Grid item xs={12} height="60vh" sx={{ padding: 2, overflow: 'auto' }}>
                <Paper
                  sx={{
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    width: '100%',
                    height: '100%',
                  }}
                >
                  <Pinout
                    connected={connected}
                    sendHandler={sendHandler}
                    setError={setError}
                  />
                </Paper>
              </Grid>)}
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