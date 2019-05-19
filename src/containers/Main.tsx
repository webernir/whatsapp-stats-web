import { Box, Column, Columns } from "bloomer"
import { sumBy } from "lodash"
import * as moment from "moment"
import * as React from "react"
import CountByUser from "../components/CountByUser"
import FileSelector from "../components/FileSelector"
import Instructions from "../components/Instructions"
import SimpleBarChart from "../components/SimpleBarChart"
import Summary from "../components/Summary"
import {
  getCountByHour,
  getCountByUser,
  getWordCount,
  parseMessages,
  splitLines
} from "../lib/stats"
import { HourCount, Message, UserCount, WordCount } from "../lib/stats.types"

export interface MainProps {}
export interface MainState {
  content: string
  messages: Message[]
  countByUser: UserCount[]
  countByHour: HourCount[]
  wordCount: WordCount[]
}

export default class Main extends React.Component<MainProps, MainState> {
  state = {
    content: "",
    messages: [],
    countByUser: [],
    countByHour: [],
    wordCount: []
  }

  handleContent = (content: string) => {
    const messages = parseMessages(content)
    this.setState({
      content,
      messages,
      countByUser: getCountByUser(splitLines(content)),
      countByHour: getCountByHour(messages),
      wordCount: getWordCount(messages)
    })
  }

  render() {
    const firstMessage = moment.min(
      ...this.state.messages
        .filter((t: Message) => t.time.isValid())
        .map((t: Message) => t.time)
    )
    return (
      <div>
        <FileSelector onContent={this.handleContent} />
        {this.state.countByUser.length > 0 ? (
          <div>
            <Summary
              total={sumBy(this.state.countByUser, "count")}
              firstMessage={firstMessage}
            />
            <Box>
              <Columns>
                <Column isSize={4}>
                  <div style={{ maxHeight: "500px", overflow: "auto" }}>
                    <CountByUser items={this.state.countByUser} />
                  </div>
                </Column>
                <Column isSize={8}>
                  <SimpleBarChart
                    title="Messages per member"
                    data={this.state.countByUser.filter(
                      (t: UserCount) => t.count > 50
                    )}
                    dataKey="name"
                  />
                  <SimpleBarChart
                    title="Messages by Hour of the day"
                    data={this.state.countByHour}
                    dataKey="hour"
                  />
                </Column>
              </Columns>
            </Box>
          </div>
        ) : (
          <Instructions />
        )}
      </div>
    )
  }
}
