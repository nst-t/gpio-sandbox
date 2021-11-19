import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Title from "./Title";
import { PinTimeSeriesData } from "../types";

export default function PinData({ data }: { data: PinTimeSeriesData }) {
  return (
    <React.Fragment>
      <Title>GPIO Pin Data</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell width={100}>Pin</TableCell>
            <TableCell width={100}>Time</TableCell>
            <TableCell align="right">I/O</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map(({ id, date, value }) => (
            <TableRow key={id}>
              <TableCell>{`${new Date(date).getHours()}:${new Date(
                date
              ).getMinutes()}`}</TableCell>
              <TableCell>{value}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </React.Fragment>
  );
}
