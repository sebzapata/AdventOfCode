import * as React from "react";
import {FileUpload} from "../components/fileUpload";

interface Props {}

interface State {
  fileLoaded: boolean;
  fileName: string;
  twoCount: number;
  threeCount: number;
  sequence: string;
}

export class Day2 extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      fileLoaded: false,
      fileName: "",
      twoCount: 0,
      threeCount: 0,
      sequence: "",
    };

    this.handleChange = this.handleChange.bind(this);
  }

  render() {
    return (
      <div>
        <FileUpload fileName={this.state.fileName} onFileLoad={this.handleChange}/>
        {this.state.fileLoaded && !this.state.sequence ? <p>Loading</p> : this.renderResults()}
      </div>
    )
  }

  renderResults = () => {
    return (
      <div>
        {this.state.twoCount ? <p>{`Two count: ${this.state.twoCount}`}</p> : null}
        {this.state.threeCount ? <p>{`Three count: ${this.state.threeCount}`}</p> : null}
        {this.state.twoCount && this.state.threeCount ? <p>{`Checksum: ${this.state.threeCount * this.state.twoCount}`}</p> : null}
        {this.state.sequence ? <p>{`Sequence: ${this.state.sequence}`}</p> : null}
      </div>
    )
  };

  handleChange(file: File) {
    this.setState({
      fileLoaded: true,
      fileName: file.name
    });

    const reader = new FileReader();
    reader.readAsText(file);

    reader.onload = () => {
      const rawText = reader.result;
      if (!rawText) return null;

      const stringArray = (rawText as string).split("\n").filter(x => x !== "");

      const lettersArray = stringArray.map(x => x.split(""));

      lettersArray.forEach(array => {
        let has3 = false;
        let has2 = false;
        array.forEach(letter => {
          const filtered = array.filter(x => x === letter);
          if (filtered.length === 3 && has3 === false) {
            has3 = true;
            this.setState({
              threeCount: this.state.threeCount + 1
            })
          }
          if (filtered.length === 2 && has2 === false) {
            has2 = true;
            this.setState({
              twoCount: this.state.twoCount + 1
            })
          }
        });
      });

      let firstSequence: string[] = [];
      let secondSequence: string[] = [];

      lettersArray.forEach(i => {
        lettersArray.forEach(j => {
          let wrongCount = 0;
          i.forEach((k, y) => {
            if (k !== j[y]) {
              wrongCount++
            }
          });
          if (wrongCount === 1) {
            firstSequence = i;
            secondSequence = j;
          }
        });
      });

      let sequence: string[] = [];
      firstSequence.forEach((x, i) => {
        if (x === secondSequence[i]) {
          sequence.push(x);
        }
      });

      this.setState({sequence: sequence.join('')});
    }
  }
}