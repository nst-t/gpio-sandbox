import * as React from 'react';

import Dashboard from './dashboard/Dashboard';
import Box from '@mui/material/Box';
import { NstrumentaClient } from 'nstrumenta';
import {
  PinData,
  PinTimeSeriesData,
  CommandMessage,
  SendHandler,
} from './types';
import { createContext, useEffect, useState } from 'react';

const CHANNEL = 'gpio';
const COMMAND_CHANNEL = 'gpio-command'

const initialTimeSeriesData: PinTimeSeriesData = [];

export const GPIOContext = createContext<PinTimeSeriesData>([]);

export default function App() {
  const [data, setData] = useState<PinTimeSeriesData>(initialTimeSeriesData);
  const [wsUrl, setWsUrl] = useState(`ws://${window.location.hostname}:8088`);
  const [connected, setConnected] = useState(false);
  const [sendHandler, setSendHandler] = useState<SendHandler>(() => () => (_: CommandMessage) => null);

  // Set up nstrumenta listeners
  useEffect(() => {
    console.log(`wsUrl updated to ${wsUrl}`);
    try {
      const nst = new NstrumentaClient({
        apiKey: 'file?',
        wsUrl: wsUrl,
        projectId: 'mapbox-geo',
      });

      nst.addListener('open', () => {
        console.log('a connection is made!');
        setConnected(true);
        // Now that the connection is open, we can enable sending a message on user input
        // console.log('handler should be', handler, 'but set to 2 instead');
        setSendHandler(() => (message: CommandMessage) => {
            console.log('send message', message);
            if (!message) {
              console.log('nothing to send');
              return;
            }
            nst.send(COMMAND_CHANNEL, {
              action: message.action,
              id: message.id,
              value: message.value,
              direction: message.direction,
            });
          }
        );

        console.log('sendHandler should be set, now subscribe to channel');
        nst.subscribe(CHANNEL, (pinData: PinData) => {
          console.log(`received message`, pinData);
          setData((prevData) => prevData.concat(pinData));
        });
      });

      nst.addListener('close', () => {
        console.log('lost ws connection');
        setConnected(false);
      });

      nst.init();
    } catch (e) {
      console.log(e);
      console.log(wsUrl);
      alert('problem with the websocket url!');
    }
    // return () => nst.unsubscribe(CHANNEL);
  }, [wsUrl]);

  return (
    <GPIOContext.Provider value={data}>
      <Box>
        <Dashboard sendHandler={sendHandler} wsUrl={wsUrl} setWsUrl={setWsUrl} connected={connected}/>
      </Box>
    </GPIOContext.Provider>
  );
}
