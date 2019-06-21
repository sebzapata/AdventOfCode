import * as React from "react";
import {FileUpload} from "../components/fileUpload"

export class Day1 extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      fileLoaded: false,
      fileName: "",
      part1Result: null,
      part2Result: null,
    };

    this.handleChange = this.handleChange.bind(this);
  }

  render() {

    return (
      <div>
        <FileUpload fileName={this.state.fileName} onFileLoad={this.handleChange} />
        {this.state.fileLoaded && !this.state.part1Result ? <p>Loading</p> : this.renderResults()}
      </div>
    )
  }

  renderResults = () => {
    return (
      <div>
        {this.state.part1Result ? <p>{`Part 1: ${this.state.part1Result}`}</p> : null}
        {this.state.part2Result ? <p>{`Part 2: ${this.state.part2Result}`}</p> : null}
      </div>
    )
  };

  handleChange(file) {
    console.log("goes in func", file)
    if (!file) return null;
    this.setState({
      fileLoaded: true,
      fileName: file.name
    });

    const reader = new FileReader();
    reader.readAsText(file);

    reader.onload = () => {
      const rawText = reader.result;
      const stringArray = rawText.split("\n");
      const numbersArray = stringArray.filter(x => x !== "").map(x => parseInt(x, 10));

      const part1Result = numbersArray.reduce((a, b) => a + b, 0);

      let currentFrequency = 0;
      let resultArray = [];
      let doubleArray = [];

      do {
        numbersArray.forEach(x => {
          currentFrequency = currentFrequency + x;
          if (resultArray.indexOf(currentFrequency) > -1) {
            doubleArray.push(currentFrequency);
          }
          else {
            resultArray.push(currentFrequency)
          }
        });
      } while (doubleArray.length === 0);

      this.setState({
        part1Result,
        part2Result: doubleArray[0]
      });
    };

    console.log("state", this.state)


  }
}
