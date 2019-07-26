import * as React from "react";
import { FileUpload } from "../components/fileUpload";
import { ContainerBase } from "./containerBase";
import { ResultsPanel } from "../components/resultsPanel";

interface Props {}

interface State {
  fileLoaded: boolean;
  fileName: string;
}

export class Day4 extends ContainerBase<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      fileLoaded: false,
      fileName: ""
    };
  }

  render() {
    return (
      <div>
        <FileUpload onFileLoad={this.handleChange} fileName={this.state.fileName}/>
        {this.state.fileLoaded ? <p>Loading</p> : this.renderResults()}
      </div>
    );
  }

  handleChange(file: File) {
    this.setState({
      fileLoaded: true,
      fileName: file.name
    });

    const reader = new FileReader();
    reader.readAsText(file);

    reader.onload = () => {
      const rawText= reader.result;
      if (!rawText) return null;

      const stringArray = (rawText as string).split("\n").filter(x => x !== "");

    }
  }

  renderResults = () => {
    return (
      <ResultsPanel>
      </ResultsPanel>
    )
  }
}