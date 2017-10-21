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
import { Title } from "bloomer";

export interface SimpleBarChartProps {
  title: string;
  data: any;
  dataKey: string;
}

export default class SimpleBarChart extends React.Component<
  SimpleBarChartProps,
  {}
> {
  render() {
    const { data, dataKey, title } = this.props;
    return (
      <div>
        <Title hasTextAlign="centered" isSize={5}>
          {title}
        </Title>
        <ResponsiveContainer width={"100%"} height={400}>
          <BarChart
            width={600}
            height={300}
            data={data}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <XAxis dataKey={dataKey} />
            <YAxis />
            <CartesianGrid strokeDasharray="3 3" />
            <Tooltip />
            <Legend />
            <Bar dataKey={"count"} fill="#82ca9d" name={dataKey} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    );
  }
}
