import * as React from "react";
import { Table } from "bloomer";
import { UserCount } from "../containers/Main";
import * as numeral from "numeral";

export interface CountByUserProps {
  items: UserCount[];
}

const CountByUserItem = ({
  item,
  rating
}: {
  item: UserCount;
  rating: number;
}) => {
  return (
    <tr>
      <td>{rating}</td>
      <td>{item.name}</td>
      <td>{numeral(item.count).format("0,0")}</td>
    </tr>
  );
};

export default class CountByUser extends React.Component<CountByUserProps, {}> {
  render() {
    const { items } = this.props;
    return (
      <Table isBordered isStriped isNarrow>
        <thead>
          <tr>
            <th>Rating</th>
            <th>Name</th>
            <th>Count</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item, index) => (
            <CountByUserItem key={index} rating={index + 1} item={item} />
          ))}
        </tbody>
      </Table>
    );
  }
}
