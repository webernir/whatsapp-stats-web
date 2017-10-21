import * as React from "react";
import { Columns, Column, Label, Box } from "bloomer";
import { sumBy } from "lodash";
import * as numeral from "numeral";
import FileSelector from "../components/FileSelector";
import { getCountByUser, splitLines, UserCount } from "../lib/stats";
import CountByUser from "../components/CountByUser";
import SimpleBarChart from "../components/SimpleBarChart";
import Instructions from "../components/Instructions";

export interface MainProps {}
export interface MainState {
  content: string;
  countByUser: UserCount[];
}

export default class Main extends React.Component<MainProps, MainState> {
  state = {
    content: "",
    countByUser: []
  };

  handleContent = (content: string) => {
   
    this.setState({
      content,
      countByUser: getCountByUser(splitLines(content))
    });
  };

  render() {
    return (
      <div>
        <FileSelector onContent={this.handleContent} />
        {this.state.countByUser.length > 0 ? (
          <div>
            <Box>
              <Label>Total Message Count:</Label>
              <span>
                {numeral(sumBy(this.state.countByUser, "count")).format("0,0")}
              </span>
            </Box>
            <Box>
              <Columns>
                <Column isSize={4}>
                  <div style={{ maxHeight: "500px", overflow: "auto" }}>
                    <CountByUser items={this.state.countByUser} />
                  </div>
                </Column>
                <Column isSize={8}>
                  <SimpleBarChart
                    data={this.state.countByUser.filter(
                      (t: UserCount) => t.count > 50
                    )}
                  />
                </Column>
              </Columns>
            </Box>
          </div>
        ) : (
          <Instructions />
        )}
      </div>
    );
  }
}
