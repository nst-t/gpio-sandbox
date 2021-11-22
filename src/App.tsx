import * as React from 'react';

import Dashboard from './dashboard/Dashboard';
import Box from '@mui/material/Box';
import { NstrumentaClient } from 'nstrumenta';
import {
  PinIOStateType,
  GPIOTimeSeriesData,
  GPIOState,
  PinData,
  SendMessageHandlerSignature,
  SendHandler,
} from './types';
import { createContext, useEffect, useState } from 'react';

const CHANNEL = 'gpio';
const COMMAND_CHANNEL = 'gpio-command'

const initialGPIOState: GPIOState = {};
for (let i = 1; i <= 40; i += 1) {
  initialGPIOState[i.toString()] = {
    id: i.toString(),
    updatedAt: new Date(),
    io: PinIOStateType.IN,
  };
}

const initialTimeSeriesData: GPIOTimeSeriesData = [];
for (let i = 1; i <= 40; i += 1) {
  initialTimeSeriesData[i] = [
    {
      id: i,
      date: new Date(Date.now() + 30 * 60 * 1000),
      value: null,
    },
  ];
}

export const GPIOContext = createContext<GPIOTimeSeriesData>([]);

export default function App() {
  const [data, setData] = useState<GPIOTimeSeriesData>(initialTimeSeriesData);
  const [wsUrl, setWsUrl] = useState(`ws://${window.location.hostname}:8088`);
  const [connected, setConnected] = useState(false);
  const [sendHandler, setSendHandler] = useState<SendHandler>(() => () => (_: SendMessageHandlerSignature) => null);

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
        setSendHandler(() => (message: SendMessageHandlerSignature) => {
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
          setData((prevData) => {
            // Data is an array of arrays. To avoid unexpected state issues in React,
            // we want to treat arrays as immutable, and clone them to set new state.
            // First, the top level array is mapped to a new array
            const newData = prevData.map((singlePinSeries, index) => {
              // And each pin's individual timeseries array is cloned
              if (index === pinData.id) {
                // In the case of the particular pin receiving an update, we concatenate onto the clone
                return [...singlePinSeries, pinData];
              }
              return [...singlePinSeries];
            });
            return newData;
          });
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
