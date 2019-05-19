import * as moment from "moment"

export class Message {
  time: moment.Moment
  member: string
  index: number
  line: string
}

export enum MemberAction {
  message,
  joined,
  added,
  left,
  removed
}

export type UserCount = {
  name: string
  count: number
}

export type HourCount = {
  hour: number
  count: number
}

export type WordCount = {
  word: string
  count: number
}
