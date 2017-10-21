import * as React from "react";
import {
  BarChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Bar,
  ResponsiveContainer
} from "recharts";
import { UserCount } from "../lib/stats";

export interface SimpleBarChartProps {
  data: UserCount[];
}

export default class SimpleBarChart extends React.Component<
  SimpleBarChartProps,
  {}
> {
  render() {
    const { data } = this.props;
    return (
      <ResponsiveContainer width={'100%'} height={400}>
        <BarChart
          width={600}
          height={300}
          data={data}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
          <XAxis dataKey="name" />
          <YAxis />
          <CartesianGrid strokeDasharray="3 3" />
          <Tooltip />
          <Legend />
          <Bar dataKey="count" fill="#82ca9d" />
        </BarChart>
      </ResponsiveContainer>
    );
  }
}
