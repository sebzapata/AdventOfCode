import * as React from "react";

export class Day1 extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      part1Result: null,
      part2Result: null,
      fileLoaded: false
    };

    this.handleChange = this.handleChange.bind(this);
  }

  render() {

    return (
      <div>
        <input type="file" multiple={false} onChange={(e) => this.handleChange(e.target.files[0])}/>
        {
          !this.state.part1Result && this.state.fileLoaded
          ? <p>Loading</p>
          : (
              <div>
                {this.state.part1Result && <p>{`Part 1: ${this.state.part1Result}`}</p>}
                {this.state.part2Result && <p>{`Part 2: ${this.state.part2Result}`}</p>}
              </div>
            )
        }
      </div>
    )
  }

  handleChange(file) {
    this.setState({fileLoaded: true});

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

  }
}
