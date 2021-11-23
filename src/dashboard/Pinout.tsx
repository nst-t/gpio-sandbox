import * as React from 'react';
import {
  Paper,
  Table,
  TableRow,
  TableBody,
  TableCell,
  TableContainer,
  Typography,
  IconProps,
  IconButton, ToggleButtonGroup, ToggleButton,
} from '@mui/material';
import { CircleTwoTone } from '@mui/icons-material';
import { useMemo, useState } from 'react';
import { SendHandler } from '../types';

enum PinType {
  IO = 'io',
  POWER = 'power',
  GROUND = 'ground'
}

export interface GPIOPin {
  name: string,
  direction: 'in' | 'out' | null,
  type: PinType,
}

export const gpio: Map<number, GPIOPin> = new Map([
  [1, { name: 'pow3v3', direction: null, type: PinType.GROUND }], [2,
    {
      name: 'pow5v',
      direction: null,
      type: PinType.POWER
    }],
  [3, { name: 'gpio 2', direction: 'out', type: PinType.IO }], [4,
    {
      name: 'pow5v',
      direction: null,
      type: PinType.POWER
    }],
  [5, { name: 'gpio 3', direction: 'out', type: PinType.IO }], [6,
    {
      name: 'gnd',
      direction: null,
      type: PinType.GROUND
    }],
  [7, { name: 'gpio 4', direction: 'out', type: PinType.IO }], [8,
    {
      name: 'gpio uart',
      direction: 'out',
      type: PinType.IO
    }],
  [9, { name: 'gnd', direction: null, type: PinType.GROUND }], [10, {
    name: 'gpio uart',
    direction: 'out',
    type: PinType.IO
  }],
  [11, { name: 'gpio 17', direction: 'out', type: PinType.IO }], [12, {
    name: 'gpio pcm',
    direction: 'out',
    type: PinType.IO
  }],
  [13, { name: 'gpio 27', direction: 'out', type: PinType.IO }], [14, {
    name: 'gnd',
    direction: null,
    type: PinType.GROUND
  }],
  [15, { name: 'gpio 22', direction: 'out', type: PinType.IO }], [16, {
    name: 'gpio',
    direction: 'out',
    type: PinType.IO
  }],
  [17, { name: 'pow3v3', direction: null, type: PinType.POWER }], [18, {
    name: 'gpio',
    direction: 'out',
    type: PinType.IO
  }],
  [19, { name: 'gpio 10', direction: 'out', type: PinType.IO }], [20, {
    name: 'gnd',
    direction: 'out',
    type: PinType.IO
  }],
  [21, { name: 'gpio 9', direction: 'out', type: PinType.IO }], [22, {
    name: 'gpio',
    direction: 'out',
    type: PinType.IO
  }],
  [23, { name: 'gpio 11', direction: 'out', type: PinType.IO }], [24, {
    name: 'gpio spi',
    direction: 'out',
    type: PinType.IO
  }],
  [25, { name: 'gnd', direction: null, type: PinType.GROUND }], [26, {
    name: 'gpio spi',
    direction: 'out',
    type: PinType.IO
  }],
  [27, { name: 'gpio 0', direction: 'out', type: PinType.IO }], [28, {
    name: 'gpio i2c',
    direction: 'out',
    type: PinType.IO
  }],
  [29, { name: 'gpio 5', direction: 'out', type: PinType.IO }], [30, {
    name: 'gnd',
    direction: null,
    type: PinType.GROUND
  }],
  [31, { name: 'gpio 6', direction: 'out', type: PinType.IO }], [32, {
    name: 'gpio',
    direction: 'out',
    type: PinType.IO
  }],
  [33, { name: 'gpio 13', direction: 'out', type: PinType.IO }], [34, {
    name: 'gnd',
    direction: null,
    type: PinType.GROUND
  }],
  [35, { name: 'gpio 19', direction: 'out', type: PinType.IO }], [36, {
    name: 'gpio',
    direction: 'out',
    type: PinType.IO
  }],
  [37, { name: 'gpio 26', direction: 'out', type: PinType.IO }], [38, {
    name: 'gpio pcm',
    direction: 'out',
    type: PinType.IO
  }],
  [39, { name: 'gnd', direction: null, type: PinType.GROUND }], [40, {
    name: 'gpio pcm',
    direction: 'out',
    type: PinType.IO
  }]]);

const PinIcon = ({ onClick, type }: IconProps & { type: PinType }) => {
  return (
    <IconButton onClick={onClick}>
      <CircleTwoTone color={
        type === PinType.IO
          ? 'primary'
          : type === PinType.POWER
            ? 'secondary'
            : 'disabled'
      }
      />
    </IconButton>)
};

export default function Pinout({
  sendHandler,
  setActivePin,
  connected,
}: { sendHandler: SendHandler, setActivePin: (id: number) => void, connected: boolean }) {
  const [pins, setPins] = useState<GPIOPin[]>(Array.from(gpio.values()));
  const topPins = pins.filter((pin, id) => id % 2 === 0);
  const bottomPins = pins.filter((pin, id) => id % 2 === 1);

  const handleSetDirection = useMemo(() => {
    return ({ id, newDirection }: { id: number, newDirection: 'in' | 'out' | null }) => {
      const pin = gpio.get(id);
      if (!pin || pin.type !== 'io') {
        return;
      }
      const direction = newDirection ? newDirection : pin.direction;
      gpio.set(id, { ...pin, direction });
      setPins(Array.from(gpio.values()));
      sendHandler({ action: 'set', direction, id })
    }
  }, [sendHandler]);

  return (
    <React.Fragment><TableContainer component={Paper}>
      <Table size="small" aria-label="GPIO Pinout">
        <TableBody>
          {topPins
            .map((pin, index) => {
              const pinId = 2 * index + 1;
              // TODO: This splitting of the array into two is not a good idea
              return (
                <TableRow
                  key={`${index}:${index + 1}`}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell onClick={() => setActivePin(pinId)} component="td"
                             sx={{ backgroundColor: 'default', cursor: 'pointer' }}>
                    <Typography fontSize={10}>{topPins[index].name}</Typography>
                  </TableCell>
                  <TableCell>
                    {pin.type === 'io' && <ToggleButtonGroup
                      size="small"
                      color="primary"
                      value={pin.direction}
                      exclusive
                      sx={{ fontSize: 6, height: '10px', lineHeight: '10px' }}
                      onChange={(event: React.MouseEvent<HTMLElement>, newDirection: 'in' | 'out' | null) => {
                        if (!connected) return;
                        handleSetDirection({
                          id: pinId,
                          newDirection,
                        });
                      }}
                    >
                      <ToggleButton sx={{ fontSize: 8 }} value="in">In</ToggleButton>
                      <ToggleButton sx={{ fontSize: 8 }} value="out">Out</ToggleButton>
                    </ToggleButtonGroup>}
                  </TableCell>
                  <TableCell align="right"><PinIcon  type={topPins[index].type}/></TableCell>
                  <TableCell align="left"><PinIcon type={bottomPins[index].type}/></TableCell>
                  <TableCell>
                    {bottomPins[index].type === 'io' && <ToggleButtonGroup
                      size="small"
                      color="primary"
                      value={bottomPins[index].direction}
                      exclusive
                      sx={{ fontSize: 6, height: '10px', lineHeight: '10px' }}
                      onChange={(event: React.MouseEvent<HTMLElement>, newDirection: 'in' | 'out' | null) => {
                        if (!connected) return;
                        handleSetDirection({
                          id: pinId + 1,
                          newDirection,
                        });
                      }}
                    >
                      <ToggleButton sx={{ fontSize: 8 }} value="in">In</ToggleButton>
                      <ToggleButton sx={{ fontSize: 8 }} value="out">Out</ToggleButton>
                    </ToggleButtonGroup>}
                  </TableCell>
                  <TableCell onClick={() => connected && setActivePin(pinId + 1)} component="td"
                             sx={{ cursor: 'pointer' }}>
                    <Typography fontSize={10}>{bottomPins[index].name}</Typography>
                  </TableCell>
                </TableRow>
              );
            })}
        </TableBody>
      </Table>
    </TableContainer>
    </React.Fragment>
  );
}
