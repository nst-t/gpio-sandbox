import { useContext, useEffect, useMemo, useState } from 'react';
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
import { Switch, TextField, useMediaQuery } from '@mui/material';
import { CastConnectedRounded } from '@mui/icons-material';
import { MainListItems } from './ListItems';
import { PinData } from './PinData';
import { Pinout } from './Pinout';
import { GPIOContext } from '../App';
import { OpenViews, SendHandler } from '../types';

const Copyright = (props: any) => (
  <Typography variant="body2" color="text.secondary" align="center" {...props}>
    {'Copyright © '}
    <Link color="inherit" href="https://nstrumenta.com/">
      nstrumenta
    </Link>
    {' '}
    {new Date().getFullYear()}
    .
  </Typography>
);

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
    },
  }),
  light: createTheme({
    palette: {
      mode: 'light',
    },
  }),
};

// const time = new Date(2021, 11, 20, 8, 0, 0);

export interface DashboardProps {
  sendHandler: SendHandler,
  wsUrl: string,
  setWsUrl: (url: string) => void,
  connected: boolean,
}

export const Dashboard = ({
  wsUrl,
  setWsUrl,
  connected,
  sendHandler,
}: DashboardProps) => {
  const [activePins, setActivePins] = useState<number[]>([]);
  const [tempPinsList, setTempPinsList] = useState<string>('');
  const [updatedWsUrl, setUpdatedWsUrl] = useState<string>(wsUrl); // temp state of input field before, blur
  const [openViews, setOpenViews] = useState<OpenViews>({ pins: true, data: true });
  const [themePreference, setThemePreference] = useState<'light' | 'dark'>('light');
  const [error, setError] = useState<Record<string, unknown>>({});

  const systemPrefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  useEffect(() => {
    setThemePreference(systemPrefersDarkMode ? 'dark' : 'light');
  }, [systemPrefersDarkMode]);

  useEffect(() => {
    if (error.wsHost === undefined) return;

    setError({ ...error, wsHost: !connected });
  }, [connected, error.wsHost]);

  useEffect(() => {
    setUpdatedWsUrl(wsUrl);
  }, [wsUrl]);

  const data = useContext(GPIOContext);

  const handleWsUrlChange = useMemo(() => {
    return (url: string) => {
      setWsUrl(url);
      const params = new URLSearchParams(window.location.search);
      params.set('wsUrl', url);
      const newUrl = new URL(`${window.location.origin}?${decodeURIComponent(params.toString())}`);
      window.history.pushState('', '', newUrl);
      console.log(`updated wsUrl to ${url}`);
    };
  }, [])

  const updateViews = (name: string, state: boolean) => {
    setOpenViews({ ...openViews, [name]: state });
  };

  // TODO: sendHandler is being passed through multiple levels of components; use context and hook

  const handlePinsChange = useMemo(() => {
    return (list: string) => {
      const enteredPins = list.replace(/\s/g, '').split(',');
      const pins = enteredPins.map(Number).filter(p => (p > 0 && p <= 40));
      console.log({ pins });
      setActivePins(pins);
    }
  }, []);

  useEffect(() => {
    setTempPinsList(activePins.join(','));
  }, [activePins]);

  return (
    <ThemeProvider theme={theme[themePreference]}>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
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
            <Typography>Theme</Typography>
            <Switch
              value={themePreference}
              onChange={() => setThemePreference((prev) => (prev === 'light' ? 'dark' : 'light'))}
            />
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
            <CastConnectedRounded color={connected ? 'secondary' : 'disabled'} sx={{ backgroundColor: 'action' }} />
          </Toolbar>

          <Divider />
          <List><MainListItems updateViews={updateViews} openViews={openViews} /></List>
        </Drawer>

        <Box
          component="main"
          sx={{
            flexGrow: 1,
            height: '100vh',
            overflow: 'auto',
          }}
        >
          <Toolbar />
          <Container maxWidth={false} sx={{ mt: 4, mb: 4 }}>
            <Grid container spacing={3}>
              {/* ws url entry */}
              <Grid item xs={6}>
                <Paper sx={{ padding: 2 }}>
                  <TextField
                    variant="standard"
                    label="websocket host"
                    onChange={(e) => setUpdatedWsUrl(e.target.value)}
                    onBlur={() => handleWsUrlChange(updatedWsUrl)}
                    value={updatedWsUrl}
                    onKeyDown={(e) => {
                      if (e.key.toLowerCase() === 'enter') handleWsUrlChange(updatedWsUrl);
                    }}
                    error={Boolean(error.wsHost)}
                    fullWidth
                  />
                </Paper>
              </Grid>
              {/* filter pin list */}
              <Grid item xs={6}>
                <Paper sx={{ padding: 2 }}>
                  <TextField
                    variant="standard"
                    label="pin filter (comma separated list)"
                    onChange={(e) => setTempPinsList(e.target.value)}
                    onBlur={() => handlePinsChange(tempPinsList)}
                    value={tempPinsList}
                    onKeyDown={(e) => {
                      if (e.key.toLowerCase() === 'enter') handlePinsChange(tempPinsList);
                    }}
                    fullWidth
                  />
                </Paper>
              </Grid>
              {/* Pinout */}
              {openViews.pins && (
                <Grid item xs={12} sx={{ maxHeight: '60vh', padding: 2, overflow: 'auto' }}>
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
                      activePins={activePins}
                      connected={connected}
                      sendHandler={sendHandler}
                      setError={setError}
                    />
                  </Paper>
                </Grid>
              )}
              {/* Recent PinData */}
              <Grid item xs={12}>
                <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                  <PinData data={data} />
                </Paper>
              </Grid>

            </Grid>
            <Copyright sx={{ pt: 4 }} />
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
};
