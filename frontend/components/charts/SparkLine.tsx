'use client';
import { LineChart, Line, Tooltip, ResponsiveContainer } from 'recharts';
export const SparkLine = ({ data, height = 40, stroke = '#16a34a' }:{
  data: number[]; height?: number; stroke?: string;
}) => (
  <ResponsiveContainer width="100%" height={height}>
    <LineChart data={data.map(v => ({ v }))}>
      <Line type="monotone" dataKey="v" stroke={stroke} dot={false} isAnimationActive={false}/>
      <Tooltip contentStyle={{ fontSize: 12 }} />
    </LineChart>
  </ResponsiveContainer>
);
