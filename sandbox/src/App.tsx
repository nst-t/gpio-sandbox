import * as React from 'react';

import Box from '@mui/material/Box';
import { NstrumentaClient } from 'nstrumenta';
import { createContext, useEffect, useState } from 'react';
import {
  PinData,
  PinTimeSeriesData,
  CommandMessage,
  SendHandler,
} from './types';
import { Dashboard } from './dashboard/Dashboard';

const CHANNEL = 'gpio';
const COMMAND_CHANNEL = 'gpio-command';

const initialTimeSeriesData: PinTimeSeriesData = [];

export const GPIOContext = createContext<PinTimeSeriesData>([]);

export const App = () => {
  const [data, setData] = useState<PinTimeSeriesData>(initialTimeSeriesData);
  const [wsUrl, setWsUrl] = useState(`ws://${window.location.hostname}:8088`);
  const [connected, setConnected] = useState(false);
  const [sendHandler, setSendHandler] = useState<SendHandler>(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    () => () => (_: CommandMessage) => null,
  );

  // Set up nstrumenta listeners
  useEffect(() => {
    try {
      const nst = new NstrumentaClient({
        apiKey: 'file?',
        wsUrl,
        projectId: 'mapbox-geo',
      });

      nst.addListener('open', () => {
        console.log('a connection is made!');
        setConnected(true);
        // Now that the connection is open, we can enable sending a message on user input
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
        });

        nst.subscribe(CHANNEL, (pinData: PinData) => {
          console.log('received message', pinData);
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
      // eslint-disable-next-line no-alert
      alert('problem with the websocket url!');
    }
    // return () => nst.unsubscribe(CHANNEL);
  }, [wsUrl]);

  useEffect(() => {
    const query = window.location.search;
    const wsUrlFromQuery = (new URLSearchParams(query)).get('wsUrl');

    if (wsUrlFromQuery) {
      setWsUrl(wsUrlFromQuery);
    }
  }, [])

  return (
    <GPIOContext.Provider value={data}>
      <Box>
        <Dashboard
          sendHandler={sendHandler}
          wsUrl={wsUrl}
          setWsUrl={setWsUrl}
          connected={connected}
        />
      </Box>
    </GPIOContext.Provider>
  );
};
