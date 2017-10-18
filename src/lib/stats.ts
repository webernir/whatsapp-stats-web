import { groupBy, sumBy } from "lodash";

export function splitLines(txt: string) {
  return txt.split("\n");
}

export function getCountByUser(lines: string[]) {
  let filtered = lines
    .filter(line => !line.includes("group"))
    .filter(line => !line.includes("removed"))
    .filter(line => !line.includes("left"))
    .filter(line => !line.includes("added"))
    .filter(line => !line.includes("changed"))
    .filter(line => !line.includes("joined"))
    .filter(line => line.includes(":", line.indexOf(":") + 1))
    .filter(line => line.substring(0, 5).includes("/"));

  let items = filtered.map((line, index) => ({
    time: getTime(line),
    member: line.substring(
      line.indexOf("- ") + 2,
      line.indexOf(":", line.indexOf("- "))
    ),
    index,
    line
  }));

  let grouped = groupBy(items, "member");

  let result = Object.keys(grouped)
    .map(gr => ({ member: gr, count: grouped[gr].length }))
    .sort((a, b) => b.count - a.count);

  let output = result.map(item => `${item.member},${item.count}\r\n`);

  return output;
}

export function getTime(line: string) {
  return line.substring(0, line.indexOf(" - "));
}

export function getAction(line: string) {
  if (line.includes("joined")) {
    return "joined";
  }
  if (line.includes("added")) {
    return "added";
  }
  if (line.includes("left")) {
    return "left";
  }
  if (line.includes("removed")) {
    return "removed";
  } else {
    return "message";
  }
}

export function getMember(line: string) {
  const action = getAction(line);
  const stripped = line.substring(line.indexOf("- ") + 2);
  switch (action) {
    case "joined":
      return stripped.substring(0, stripped.indexOf("joined") - 1);
    case "added":
      return stripped.substring(stripped.indexOf("added") + "added ".length);
    case "left":
      return stripped.substring(0, stripped.indexOf("left") - 1);
    case "removed":
      return stripped.substring(
        stripped.indexOf("removed") + "removed ".length
      );
    default:
      return undefined;
  }
}

function getActionValue(action: string) {
  switch (action) {
    case "joined":
      return 1;
    case "added":
      return 1;
    case "left":
      return -1;
    case "removed":
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
