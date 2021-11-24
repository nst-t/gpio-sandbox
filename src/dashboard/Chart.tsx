import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Label,
  ResponsiveContainer,
} from 'recharts';
import Title from './Title';
import { PinTimeSeriesData } from '../types';
import Box from '@mui/material/Box';

export type ChartMeta = {
  maxTime: number;
  minTime: number;
  dataPoints: number;
};

export default function Chart({
  data,
  meta,
}: {
  data: PinTimeSeriesData;
  meta: ChartMeta;
}) {
  const theme = useTheme();
  const displayInterval = 60 * 1000;

  let displayFormattedData: PinTimeSeriesData = [];

  if (data) {
    displayFormattedData = data
      .filter((item) => {
        return item.date > Date.now() - displayInterval;
      })
      .map((data) => {
        return {
          ...data,
          value: data.value === null ? null : Number(data.value),
        };
      });
  }

  const TroubleshootableLine = () => {
    console.log('render line');
    return (
      <Line
        isAnimationActive={false}
        type="stepBefore"
        dataKey="value"
        stroke={theme.palette.primary.main}
        dot={false}
        connectNulls={false}
        strokeLinejoin={'miter'}
      />
    );
  };

  return (
    <Box width="100%" height="100%" sx={{ backgroundColor: 'primary' }}>
      <ResponsiveContainer>
        <LineChart
          data={displayFormattedData}
          margin={{
            top: 0,
            right: 0,
            bottom: 0,
            left: 0,
          }}
        >
          <XAxis
            hide
            dataKey="date"
            type="number"
            domain={[Date.now() - displayInterval, Date.now()]}
            stroke={theme.palette.text.secondary}
            style={theme.typography.body2}
          >
            <Label
              position="bottom"
              style={{
                textAnchor: 'middle',
                fill: theme.palette.text.primary,
                ...theme.typography.body1,
              }}
            >
              Time
            </Label>
          </XAxis>
          <YAxis
            hide
            type="number"
            domain={[0, 1]}
            stroke={theme.palette.text.secondary}
            style={theme.typography.body2}
          ></YAxis>
          <Line
            isAnimationActive={false}
            type="stepBefore"
            dataKey="value"
            stroke={theme.palette.primary.main}
            dot={false}
            connectNulls={false}
            strokeLinejoin={'miter'}
          />
        </LineChart>
      </ResponsiveContainer>
    </Box>
  );
}
