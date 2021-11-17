import * as React from 'react';

import Dashboard from './dashboard/Dashboard'
import Box from '@mui/material/Box';
import { NstrumentaClient } from 'nstrumenta';
import { PinState, PinIOStateType, GPIOTimeSeriesData, GPIOState, PinData } from './types';
import { createContext, useEffect, useState } from 'react';

const CHANNEL = 'gpio';

const initialGPIOState: GPIOState = {};
for (let i = 1; i <= 40; i += 1) {
  initialGPIOState[i.toString()] = {
    id: i.toString(),
    updatedAt: new Date(),
    io: PinIOStateType.IN,
  }
}

const initialTimeSeriesData: GPIOTimeSeriesData = {};
for (let i = 1; i <= 40; i += 1) {
  initialTimeSeriesData[i.toString()] = [{
    id: i.toString(),
    date: new Date(Date.now() + 30 * 60 * 1000),
    value: null,
  }
  ]
}

export const GPIOContext = createContext<GPIOTimeSeriesData>({});

export default function App() {
  const [data, setData] = useState<GPIOTimeSeriesData>(initialTimeSeriesData);
  const [wsUrl, setWsUrl] = useState('ws://localhost:8088');

  // Set up nstrumenta listeners
  useEffect(() => {
    console.log(`wsUrl updated to ${wsUrl}`);
    try {
      const nst = new NstrumentaClient({
        apiKey: 'file?',
        wsUrl: wsUrl,
        projectId: 'mapbox-geo'
      });

      nst.addListener('open', () => {
        console.log('a connection is made!');
        nst.subscribe(CHANNEL, (message: string) => {
          const pinData: PinData = JSON.parse(message);
          pinData.date = new Date(pinData.date);
          setData((prev) => ({
            ...prev, [pinData.id]: [...prev[pinData.id], pinData]
          }))
        })
      });

      nst.init();
    } catch (e) {
      alert('problem with the websocket url!');
    }
    // return () => nst.unsubscribe(CHANNEL);
  }, [wsUrl]);


  return (
    <GPIOContext.Provider value={data}>
      <Box>
        <Dashboard wsUrl={wsUrl} setWsUrl={setWsUrl} />
      </Box>
    </GPIOContext.Provider>

  );
}
