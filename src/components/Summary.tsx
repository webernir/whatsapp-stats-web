import * as React from "react"
import { Box, Label, Field, FieldLabel, FieldBody } from "bloomer"
import * as numeral from "numeral"
import { Moment } from "moment"

interface SummaryProps {
  total: number
  firstMessage: Moment
}

const Summary: React.SFC<SummaryProps> = props => (
  <Box>
    <Field isHorizontal>
      <FieldLabel>
        <Label>Total Message Count:</Label>
      </FieldLabel>
      <FieldBody>{numeral(props.total).format("0,0")}</FieldBody>
    </Field>
    <Field isHorizontal>
      <FieldLabel>
        <Label>First Message:</Label>
      </FieldLabel>
      <FieldBody>
        <span>{props.firstMessage.fromNow()}</span>
        <span className="has-text-grey">
          {" "}
          ({props.firstMessage.toString()}){" "}
        </span>
      </FieldBody>
    </Field>
  </Box>
)

export default Summary
