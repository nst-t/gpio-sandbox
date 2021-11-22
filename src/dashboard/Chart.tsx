import * as React from "react";
import { useTheme } from "@mui/material/styles";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Label,
  ResponsiveContainer,
} from "recharts";
import Title from "./Title";
import { PinTimeSeriesData } from "../types";

export default function Chart({ data }: { data: PinTimeSeriesData[] }) {
  const theme = useTheme();

  const displayFormattedData = data.map((pinData) => {
    return pinData.map((d) => {
      return {
        ...d,
        time: `${new Date(d.date).getHours()}:${new Date(
          d.date
        ).getMinutes()}`,
      };
    })
  });

  console.log(data);
  return (
    <React.Fragment>
      <Title>Data</Title>
      <ResponsiveContainer>
        <LineChart
          data={displayFormattedData}
          margin={{
            top: 16,
            right: 16,
            bottom: 0,
            left: 24,
          }}
        >
          <XAxis
            dataKey="time"
            stroke={theme.palette.text.secondary}
            style={theme.typography.body2}
          >
            <Label
              position="bottom"
              style={{
                textAnchor: "middle",
                fill: theme.palette.text.primary,
                ...theme.typography.body1,
              }}
            >
              Time
            </Label>
          </XAxis>
          <YAxis
            stroke={theme.palette.text.secondary}
            style={theme.typography.body2}
          >
            <Label
              angle={270}
              position="left"
              style={{
                textAnchor: "middle",
                fill: theme.palette.text.primary,
                ...theme.typography.body1,
              }}
            >
              Value
            </Label>
          </YAxis>
          {data.map((pinData, index) => {
            // return (<Line
            //   key={index}
            //   isAnimationActive={false}
            //   type="stepAfter"
            //   dataKey="value"
            //   stroke={theme.palette.primary.main}
            //   dot={false}
            //   connectNulls={false}
            //   strokeLinejoin={"miter"}
            // />)
          })}
        </LineChart>
      </ResponsiveContainer>
    </React.Fragment>
  );
}
