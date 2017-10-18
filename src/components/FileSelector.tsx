import * as React from "react";
import { Label, Field, Control } from "bloomer";

export interface FileSelectorProps {
  onContent: (content: string) => void;
}

export default class FileSelector extends React.Component<
  FileSelectorProps,
  {}
> {
  handleChange = (files: FileList) => {
    console.log(files);

    const reader = new FileReader();
    reader.onload = (e: any) => {
      if (reader.readyState === 2) {
        this.props.onContent(e.target.result);
      }
    };
    reader.readAsText(files[0], "utf8");
  };

  render() {
    return (
      <Field>
        <Label>Choose a file:</Label>
        <Control>
          <input
            type="file"
            accept=".txt"
            onChange={e => {
              if (e.target.files) {
                this.handleChange(e.target.files);
              }
            }}
          />
        </Control>
      </Field>
    );
  }
}
