import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { Title } from './Title';
import { PinTimeSeriesData } from '../types';

export const PinData = ({ data }: { data: PinTimeSeriesData }) => (
  <>
    <Title>GPIO Pin Data</Title>
    <Table size="small">
      <TableHead>
        <TableRow>
          <TableCell width={100}>Pin Id</TableCell>
          <TableCell width={100}>Time</TableCell>
          <TableCell align="right">Value</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {data.map(({ id, date, value }) => (
          <TableRow key={`pin-${id}:${date}`}>
            <TableCell>{id}</TableCell>
            <TableCell>{date}</TableCell>
            <TableCell align="right">{value ? '1' : '0'}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </>
);
