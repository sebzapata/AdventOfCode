import * as React from "react";

export class Day2 extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      twoCount: 0,
      threeCount: 0,
      fileLoaded: false
    }

  }

  render() {
    return (
      <div>
        <input type="file" multiple={false} onChange={(e) => this.handleChange(e.target.files[0])}/>
        {this.state.fileLoaded && !this.state.twoCount ? <p>Loading</p> : this.renderResults()}
      </div>
    )
  }

  renderResults = () => {
    return (
      <div>
        {this.state.twoCount ? <p>{`Two count: ${this.state.twoCount}`}</p> : null}
        {this.state.threeCount ? <p>{`Three count: ${this.state.threeCount}`}</p> : null}
        {this.state.twoCount && this.state.threeCount ? <p>{`Checksum: ${this.state.threeCount * this.state.twoCount}`}</p> : null}
      </div>
    )
  };

  handleChange(file) {
    this.setState({fileLoaded: true});

    const reader = new FileReader();
    reader.readAsText(file);

    reader.onload = () => {
      const rawText = reader.result;
      const stringArray = rawText.split("\n");
      const newArray = stringArray.filter(x => x !== "");

      const doubleArray = newArray.map(x => x.split(""));

      doubleArray.forEach(array => {
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
      })
    }
  }
}