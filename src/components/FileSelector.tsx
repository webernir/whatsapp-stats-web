import * as React from "react"
import { Label, Field, Control, Box } from "bloomer"

export interface FileSelectorProps {
  onContent: (content: string) => void
}

export default class FileSelector extends React.Component<
  FileSelectorProps,
  {}
> {
  handleChange = (files: FileList) => {
    const tasks = []

    for (let i = 0; i < files.length; i++) {
      tasks.push(this.readFile(files[i]))
    }

    Promise.all(tasks)
      .then(data => {
        return data.reduce((accum, curr) => (accum += "\n" + curr), "")
      })
      .then(content => this.props.onContent(content))
  }

  readFile = (file: File): Promise<string> => {
    return new Promise((res, rej) => {
      const reader = new FileReader()
      reader.onload = (e: any) => {
        if (reader.readyState === 2) {
          res(e.target.result)
        }
      }
      reader.readAsText(file, "utf8")
    })
  }

  render() {
    return (
      <Box>
        <Field>
          <Label>Choose a file:</Label>
          <Control>
            <input
              multiple
              type="file"
              accept=".txt"
              onChange={e => {
                if (e.target.files) {
                  this.handleChange(e.target.files)
                }
              }}
            />
          </Control>
        </Field>
      </Box>
    )
  }
}
