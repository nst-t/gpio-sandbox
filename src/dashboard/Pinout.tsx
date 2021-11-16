import * as React from 'react';
import {
  Paper,
  Table,
  TableRow,
  TableBody,
  Box,
  TableCell,
  TableContainer,
  Typography,
  IconProps,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { CircleTwoTone } from '@mui/icons-material';

function preventDefault(event: React.MouseEvent) {
  event.preventDefault();
}

enum PinType {
  IO = 'io',
  POWER = 'power',
  GROUND = 'ground'
}

export interface GPIOPin {
  id: string,
  name: string,
  state: 'in' | 'out' | null,
  type: PinType,
}

export const gpio: [GPIOPin, GPIOPin][] = [
  [{ id: '1', name: 'pow3v3', state: null, type: PinType.GROUND }, {
    id: '2',
    name: 'pow5v',
    state: 'out',
    type: PinType.POWER
  }],
  [{ id: '3', name: 'gpio 2', state: 'out', type: PinType.IO }, {
    id: '4',
    name: 'pow5v',
    state: 'out',
    type: PinType.POWER
  }],
  [{ id: '5', name: 'gpio 3', state: 'out', type: PinType.IO }, {
    id: '6',
    name: 'gnd',
    state: 'out',
    type: PinType.GROUND
  }],
  [{ id: '7', name: 'gpio 4', state: 'out', type: PinType.IO }, {
    id: '8',
    name: 'gpio uart',
    state: 'out',
    type: PinType.IO
  }],
  [{ id: '9', name: 'gnd', state: null, type: PinType.GROUND }, {
    id: '10',
    name: 'gpio uart',
    state: 'out',
    type: PinType.IO
  }],
  [{ id: '11', name: 'gpio 17', state: 'out', type: PinType.IO }, {
    id: '12',
    name: 'gpio pcm',
    state: 'out',
    type: PinType.IO
  }],
  [{ id: '13', name: 'gpio 27', state: 'out', type: PinType.IO }, {
    id: '14',
    name: 'gnd',
    state: 'out',
    type: PinType.GROUND
  }],
  [{ id: '15', name: 'gpio 22', state: 'out', type: PinType.IO }, {
    id: '16',
    name: 'gpio',
    state: 'out',
    type: PinType.IO
  }],
  [{ id: '17', name: 'pow3v3', state: null, type: PinType.POWER }, {
    id: '18',
    name: 'gpio',
    state: 'out',
    type: PinType.IO
  }],
  [{ id: '19', name: 'gpio 10', state: 'out', type: PinType.IO }, {
    id: '20',
    name: 'gnd',
    state: 'out',
    type: PinType.IO
  }],
  [{ id: '21', name: 'gpio 9', state: 'out', type: PinType.IO }, {
    id: '22',
    name: 'gpio',
    state: 'out',
    type: PinType.IO
  }],
  [{ id: '23', name: 'gpio 11', state: 'out', type: PinType.IO }, {
    id: '24',
    name: 'gpio spi',
    state: 'out',
    type: PinType.IO
  }],
  [{ id: '25', name: 'gnd', state: null, type: PinType.GROUND }, {
    id: '26',
    name: 'gpio spi',
    state: 'out',
    type: PinType.IO
  }],
  [{ id: '27', name: 'gpio 0', state: 'out', type: PinType.IO }, {
    id: '28',
    name: 'gpio i2c',
    state: 'out',
    type: PinType.IO
  }],
  [{ id: '29', name: 'gpio 5', state: 'out', type: PinType.IO }, {
    id: '30',
    name: 'gnd',
    state: 'out',
    type: PinType.GROUND
  }],
  [{ id: '31', name: 'gpio 6', state: 'out', type: PinType.IO }, {
    id: '32',
    name: 'gpio',
    state: 'out',
    type: PinType.IO
  }],
  [{ id: '33', name: 'gpio 13', state: 'out', type: PinType.IO }, {
    id: '34',
    name: 'gnd',
    state: 'out',
    type: PinType.GROUND
  }],
  [{ id: '35', name: 'gpio 19', state: 'out', type: PinType.IO }, {
    id: '36',
    name: 'gpio',
    state: 'out',
    type: PinType.IO
  }],
  [{ id: '37', name: 'gpio 26', state: 'out', type: PinType.IO }, {
    id: '38',
    name: 'gpio pcm',
    state: 'out',
    type: PinType.IO
  }],
  [{ id: '39', name: 'gnd', state: null, type: PinType.GROUND }, {
    id: '40',
    name: 'gpio pcm',
    state: 'out',
    type: PinType.IO
  }],
];

const PinIcon = ({ type }: IconProps & { type: PinType }) => {
  return (<CircleTwoTone color={
    type === PinType.IO
      ? 'primary'
      : type === PinType.POWER
        ? 'secondary'
        : 'disabled'
  }
  />)
};

export default function Pinout({ setActivePin }: { setActivePin: (id: string) => void }) {
  return (
    <React.Fragment><TableContainer component={Paper}>
      <Table size="small" aria-label="GPIO Pinout">
        <TableBody>
          {gpio.map((row) => (
            <TableRow
              key={`${row[0].id}:${row[1].id}`}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell onClick={() => setActivePin(row[0].id)} component="td" sx={{ backgroundColor: 'default' }}>
                <Typography fontSize={10}>{row[0].name}</Typography>
              </TableCell>
              <TableCell sx={{ borderRight: 1, backgroundColor: 'background' }} align="right"><PinIcon
                type={row[0].type}/></TableCell>
              <TableCell align="left"><PinIcon type={row[0].type}/></TableCell>
              <TableCell onClick={() => setActivePin(row[1].id)} component="td">
                <Typography fontSize={10}>{row[1].name}</Typography>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </React.Fragment>
  );
}
