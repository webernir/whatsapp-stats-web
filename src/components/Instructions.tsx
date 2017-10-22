import * as React from "react";
import { Box, Content } from "bloomer";

export interface InstructionsProps { }

export default class Instructions extends React.Component<
  InstructionsProps,
  {}
  > {
  render() {
    return (
      <Content>
        <Box>
          <h3>Getting Started:</h3>
          <strong>Your chat history is safe!</strong>
          <span>&nbsp; it's not uploaded anywehere.</span>
          <hr />
          <p>
            To export a copy of the history of an individual chat or group, use
            the Email chat feature:
          </p>
          <ol>
            <li>Open the chat for the individual or group.</li>
            <li>Tap the Menu Button.</li>
            <li>Tap More.</li>
            <li>Tap Email chat.</li>
            <li>Choose whether to Attach Media or not.</li>
            <li>
              An email will be composed with your chat history attached as a
              <code>.txt</code> document.
            </li>
          </ol>
        </Box>
      </Content>
    );
  }
}
