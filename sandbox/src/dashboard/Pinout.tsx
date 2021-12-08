import React, {
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import {
  IconButton,
  IconProps,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from '@mui/material';
import { CircleTwoTone } from '@mui/icons-material';
import {
  PinIOStateType,
  PinState,
  PinTimeSeriesData,
  PinType,
  SendHandler,
} from '../types';
import { Chart } from './Chart';
import { GPIOContext } from '../App';

interface ExtendedPinState extends PinState {
  value?: 1 | 0,
  data?: PinTimeSeriesData,
}

export const gpio: Map<number, ExtendedPinState> = new Map([
  [1, {
    name: 'pow3v3',
    direction: null,
    type: PinType.GROUND,
  }],
  [2, {
    name: 'pow5v',
    direction: null,
    type: PinType.POWER,
  }],
  [3, {
    name: 'gpio 2',
    direction: null,
    type: PinType.IO,
  }],
  [4, {
    name: 'pow5v',
    direction: null,
    type: PinType.POWER,
  }],
  [5, {
    name: 'gpio 3',
    direction: null,
    type: PinType.IO,
  }],
  [6, {
    name: 'gnd',
    direction: null,
    type: PinType.GROUND,
  }],
  [7, {
    name: 'gpio 4',
    direction: null,
    type: PinType.IO,
  }],
  [8, {
    name: 'gpio uart',
    direction: null,
    type: PinType.IO,
  }],
  [9, {
    name: 'gnd',
    direction: null,
    type: PinType.GROUND,
  }],
  [10, {
    name: 'gpio uart',
    direction: null,
    type: PinType.IO,
  }],
  [11, {
    name: 'gpio 17',
    direction: null,
    type: PinType.IO,
  }],
  [12, {
    name: 'gpio pcm',
    direction: null,
    type: PinType.IO,
  }],
  [13, {
    name: 'gpio 27',
    direction: null,
    type: PinType.IO,
  }],
  [14, {
    name: 'gnd',
    direction: null,
    type: PinType.GROUND,
  }],
  [15, {
    name: 'gpio 22',
    direction: null,
    type: PinType.IO,
  }],
  [16, {
    name: 'gpio',
    direction: null,
    type: PinType.IO,
  }],
  [17, {
    name: 'pow3v3',
    direction: null,
    type: PinType.POWER,
  }],
  [18, {
    name: 'gpio',
    direction: null,
    type: PinType.IO,
  }],
  [19, {
    name: 'gpio 10',
    direction: null,
    type: PinType.IO,
  }],
  [20, {
    name: 'gnd',
    direction: null,
    type: PinType.IO,
  }],
  [21, {
    name: 'gpio 9',
    direction: null,
    type: PinType.IO,
  }],
  [22, {
    name: 'gpio',
    direction: null,
    type: PinType.IO,
  }],
  [23, {
    name: 'gpio 11',
    direction: null,
    type: PinType.IO,
  }],
  [24, {
    name: 'gpio spi',
    direction: null,
    type: PinType.IO,
  }],
  [25, {
    name: 'gnd',
    direction: null,
    type: PinType.GROUND,
  }],
  [26, {
    name: 'gpio spi',
    direction: null,
    type: PinType.IO,
  }],
  [27, {
    name: 'gpio 0',
    direction: null,
    type: PinType.IO,
  }],
  [28, {
    name: 'gpio i2c',
    direction: null,
    type: PinType.IO,
  }],
  [29, {
    name: 'gpio 5',
    direction: null,
    type: PinType.IO,
  }],
  [30, {
    name: 'gnd',
    direction: null,
    type: PinType.GROUND,
  }],
  [31, {
    name: 'gpio 6',
    direction: null,
    type: PinType.IO,
  }],
  [32, {
    name: 'gpio',
    direction: null,
    type: PinType.IO,
  }],
  [33, {
    name: 'gpio 13',
    direction: null,
    type: PinType.IO,
  }],
  [34, {
    name: 'gnd',
    direction: null,
    type: PinType.GROUND,
  }],
  [35, {
    name: 'gpio 19',
    direction: null,
    type: PinType.IO,
  }],
  [36, {
    name: 'gpio',
    direction: null,
    type: PinType.IO,
  }],
  [37, {
    name: 'gpio 26',
    direction: null,
    type: PinType.IO,
  }],
  [38, {
    name: 'gpio pcm',
    direction: null,
    type: PinType.IO,
  }],
  [39, {
    name: 'gnd',
    direction: null,
    type: PinType.GROUND,
  }],
  [40, {
    name: 'gpio pcm',
    direction: null,
    type: PinType.IO,
  }]]);

const PinIcon = ({ onClick, type }: IconProps & { type: PinType }) => (
  <IconButton onClick={onClick}>
    <CircleTwoTone color={
      type === PinType.IO
        ? 'primary'
        : type === PinType.POWER
          ? 'secondary'
          : 'disabled'
    }
    />
  </IconButton>
);

export const Pinout = ({
  activePins,
  sendHandler,
  connected,
  setError,
}: {
  activePins: number[],
  sendHandler: SendHandler,
  connected: boolean,
  setError: Dispatch<SetStateAction<Record<string, unknown>>>
}) => {
  const [pins, setPins] = useState(gpio);

  const data = useContext(GPIOContext);

  const handleSetPinValue = useMemo(() => ({ id, value }: { id: number, value: 1 | 0 }) => {
    const pin = gpio.get(id);
    if (!pin || pin.type !== 'io') {
      return;
    }

    // update the react state
    gpio.set(id, { ...pin, value });
    setPins(new Map(gpio));

    // send command to write the pin value
    sendHandler({ id, value, action: 'write' });
  }, [sendHandler]);
  const handleSetDirection = useMemo(() => ({
    id,
    newDirection,
  }: { id: number, newDirection: PinIOStateType | null }) => {
    const pin = gpio.get(id);
    if (!pin || pin.type !== 'io') {
      return;
    }
    const direction = newDirection || pin.direction;
    gpio.set(id, { ...pin, direction });
    setPins(new Map(gpio));
    sendHandler({ action: 'set', direction, id });
  }, [sendHandler]);

  useEffect(() => {
    let dataPoints = 0;
    Array.from(pins.entries()).forEach(([id, pin]) => {
      // eslint-disable-next-line no-param-reassign
      pin.data = data.filter(({ id: dataId }) => id === dataId);
      if (pin.data.length > dataPoints) {
        dataPoints = pin.data.length;
      }
    });
  }, [data, pins]);

  return (
    <TableContainer component={Paper} sx={{ flexGrow: 1 }}>
      <Table aria-label="GPIO Pinout">
        <colgroup>
          <col style={{ width: 'auto' }}/>
          <col style={{ width: 'auto' }}/>
          <col style={{ width: 'auto' }}/>
          <col style={{ width: '24px' }}/>
          <col style={{ width: '80%' }}/>
        </colgroup>
        <TableBody>
          {Array.from(pins.entries())
            .filter(activePins.length > 0 ? ([id]) => (activePins.includes(id)) : (p) => p)
            .map(([id, pin]) => (
              <TableRow
                key={id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell sx={{ minWidth: '100px', backgroundColor: 'default', cursor: 'pointer' }}>
                  <Typography paragraph={false} fontSize={10}>[{id}] {pin.name}</Typography>
                </TableCell>
                <TableCell align="left">
                  {pin.type === 'io'
                  && (
                    <ToggleButtonGroup
                      size="small"
                      color="primary"
                      value={pin.direction}
                      exclusive
                      sx={{ fontSize: 6, height: '10px', lineHeight: '10px' }}
                      onChange={
                        (
                          event: React.MouseEvent<HTMLElement>,
                          newDirection: PinIOStateType | null,
                        ) => {
                          if (!connected) {
                            setError({ wsHost: true });
                            return;
                          }
                          handleSetDirection({
                            id,
                            newDirection,
                          });
                        }
                      }
                    >
                      <ToggleButton sx={{ fontSize: 8 }} value="in">In</ToggleButton>
                      <ToggleButton sx={{ fontSize: 8 }} value="out">Out</ToggleButton>
                    </ToggleButtonGroup>
                  )}
                </TableCell>
                <TableCell align="left">
                  {pin.type === 'io'
                  && (
                    <ToggleButtonGroup
                      size="small"
                      color={pin.direction === 'out' ? 'primary' : 'secondary'}
                      value={pin.value}
                      exclusive
                      sx={{ fontSize: 6, height: '10px', lineHeight: '10px' }}
                      disabled={pin.direction !== PinIOStateType.OUT}
                      onChange={(event: React.MouseEvent<HTMLElement>, newValue: 1 | 0 | null) => {
                        if (!connected) return;

                        const value = newValue === null ? pin.value : newValue;
                        if (value === undefined) return;

                        handleSetPinValue({
                          id,
                          value,
                        });
                      }}
                    >
                      <ToggleButton sx={{ fontSize: 8 }} value={1}>1</ToggleButton>
                      <ToggleButton sx={{ fontSize: 8 }} value={0}>0</ToggleButton>
                    </ToggleButtonGroup>
                  )}
                </TableCell>
                <TableCell align="left"><PinIcon type={pin.type}/></TableCell>
                <TableCell align="right">
                  <Paper sx={{
                    p: 2, display: 'flex', flexDirection: 'column', height: '80px', minWidth: '240px',
                  }}
                  >
                    <Chart data={pin.data || []}/>
                  </Paper>
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
