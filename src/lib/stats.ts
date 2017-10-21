import { groupBy, sumBy } from "lodash";
import * as moment from "moment";
import { Moment } from "moment";

export class Message {
  time: Moment;
  member: string;
  index: number;
  line: string;
}

export enum MemberAction {
  message,
  joined,
  added,
  left,
  removed
}

export function splitLines(txt: string) {
  return txt.split("\n");
}

export function filterMemberActivity(lines: string[]) {
  return lines
    .filter(line => !line.includes("group"))
    .filter(line => !line.includes("removed"))
    .filter(line => !line.includes("left"))
    .filter(line => !line.includes("added"))
    .filter(line => !line.includes("changed"))
    .filter(line => !line.includes("joined"))
    .filter(line => line.includes(":", line.indexOf(":") + 1))
    .filter(line => line.substring(0, 5).includes("/"));
}

export function mapMemberTimeMessage(line: string, index: number): Message {
  return {
    time: getTime(line),
    member: getMember(line),
    index,
    line
  };
}

export function getCountByUser(lines: string[]) {
  let items = filterMemberActivity(lines).map(mapMemberTimeMessage);
  let grouped = groupBy(items, "member");

  let result = Object.keys(grouped)
    .map(gr => ({ member: gr, count: grouped[gr].length }))
    .sort((a, b) => b.count - a.count);

  let output = result.map(item => `${item.member},${item.count}\r\n`);

  return output;
}

export function getTime(line: string) {
  const parsed = line.substring(0, line.indexOf(" - "));
  return moment(parsed);
}

export function getAction(line: string): MemberAction {
  if (line.includes("joined")) {
    return MemberAction.joined;
  }
  if (line.includes("added")) {
    return MemberAction.added;
  }
  if (line.includes("left")) {
    return MemberAction.left;
  }
  if (line.includes("removed")) {
    return MemberAction.removed;
  } else {
    return MemberAction.message;
  }
}

export function getMember(line: string) {
  const action = getAction(line);
  const stripped = line.substring(line.indexOf("- ") + 2);
  switch (action) {
    case MemberAction.joined:
      return stripped.substring(0, stripped.indexOf("joined") - 1);
    case MemberAction.added:
      return stripped.substring(stripped.indexOf("added") + "added ".length);
    case MemberAction.left:
      return stripped.substring(0, stripped.indexOf("left") - 1);
    case MemberAction.removed:
      return stripped.substring(
        stripped.indexOf("removed") + "removed ".length
      );
    case MemberAction.message:
      return line.substring(
        line.indexOf("- ") + 2,
        line.indexOf(":", line.indexOf("- "))
      );
    default:
      return "unknwon";
  }
}

function getActionValue(action: MemberAction) {
  switch (action) {
    case MemberAction.joined:
      return 1;
    case MemberAction.added:
      return 1;
    case MemberAction.left:
      return -1;
    case MemberAction.removed:
      return -1;
    default:
      return 0;
  }
}

export function getMemberInOut(lines: string[]) {
  const filterInOut = lines
    .filter(
      line =>
        line.includes("removed") ||
        line.includes("left") ||
        line.includes("added") ||
        line.includes("joined")
    )
    .filter(line => !line.includes(":", line.indexOf(":") + 1))
    .filter(line => line.substring(0, 5).includes("/"));

  const mapped = filterInOut.map((line, index) => ({
    time: getTime(line),
    member: getMember(line),
    action: getAction(line),
    actionValue: getActionValue(getAction(line)),
    index,
    line
  }));

  const grouped = groupBy(mapped, "member");

  const summed = Object.keys(grouped).map(member => {
    return {
      member,
      sum: sumBy(grouped[member], "actionValue")
    };
  });

  let memberInOutOutput = summed.map(item => `${item.member},${item.sum}\r\n`);

  return memberInOutOutput;
}
