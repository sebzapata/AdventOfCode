import * as React from "react";
import {FileUpload} from "../components/fileUpload";

interface Props {}

interface State {
  fileLoaded: boolean;
  fileName: string;
  overlapCount: number;
  fabricGrid: number[][];
  maxWidth: number;
  maxHeight: number;
  specialClaim: number;
}

export class Day3 extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      fileLoaded: false,
      fileName: "",
      overlapCount: 0,
      fabricGrid: [],
      maxWidth: 0,
      maxHeight: 0,
      specialClaim: 0
    };

    this.handleChange = this.handleChange.bind(this);
  }

  componentDidUpdate() {
    this.fillCanvas()
  }

  render() {
    return (
      <div>
        <FileUpload fileName={this.state.fileName} onFileLoad={this.handleChange}/>
        {this.state.fileLoaded && !this.state.overlapCount ? <p>Loading</p> : this.renderResults()}
        {this.state.maxWidth && this.state.maxHeight ? this.renderCanvas() : null}
      </div>
    )
  }

  renderCanvas = () => {
    return (
        <canvas id="myCanvas" width={this.state.maxWidth} height={this.state.maxHeight} style={{border: "1px black solid", height: 500, width: 500}} />
      )
  };

  fillCanvas = () => {
    const canvas = document.getElementById("myCanvas") as HTMLCanvasElement;
    if (!canvas) return null;

    const ctx = canvas.getContext("2d");
    if (!ctx) return null;

    for (let i = 0; i < this.state.maxWidth; i++) {
      for (let j = 0; j < this.state.maxHeight; j++) {
        const value = this.state.fabricGrid[i][j];

        if (value > 1) {
          ctx.fillStyle = "#FF0000";
        }
        if (value === 1) {
          ctx.fillStyle = "#00FF00"
        }
        if (value === 0) {
          ctx.fillStyle = "#FFFFFF";
        }

        ctx.fillRect(i, j, 1, 1)
      }
    }
  };

  renderResults = () => {
    if (!this.state.overlapCount) return null;

    return (
      <div>
        {<p>{`Overlap count: ${this.state.overlapCount}`}</p>}
        {<p>{`Special claim: ${this.state.specialClaim}`}</p>}
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

      const detailsArray = stringArray.map(x => {
        const re = /\d+/g;

        const match = x.match(re);

        if (!match) return null;
        const array = match.map(x => parseInt(x, 10));

        return {
          id: array[0],
          distanceFromLeft: array[1],
          distanceFromTop: array[2],
          width: array[3],
          height: array[4]
        }
      });

      let maxWidth = 0;
      let maxHeight = 0;

      detailsArray.forEach(x => {
        if (!x) return null;

        if (x.distanceFromLeft + x.width > maxWidth) {
          maxWidth = x.distanceFromLeft + x.width
        }

        if (x.distanceFromTop + x.height > maxHeight) {
          maxHeight = x.distanceFromTop + x.height
        }
      });

      let fabricGrid: number[][] = [[]];

      for (let i = 0; i < maxHeight; i++) {
        fabricGrid[i] = [];
      }

      fabricGrid.forEach(x => {
        for (let i = 0; i < maxWidth; i++) {
          x[i] = 0
        }
      });

      detailsArray.forEach(x => {
        if (!x) return null;

        for (let j = 0; j < x.height; j++) {
          for (let i = 0; i < x.width; i++) {
            fabricGrid[x.distanceFromTop + j][x.distanceFromLeft + i]++
          }
        }
      });

      let overlapCount = 0;
      fabricGrid.forEach(rows => {
        rows.forEach(cell => {
          if (cell > 1) {
            overlapCount++;
          }
        })
      });

      let specialClaim= 0;
      detailsArray.forEach(x => {
        if (!x) return null;
        let noOverlap = true;
        for (let i = x.distanceFromLeft; i < x.distanceFromLeft + x.width; i++) {
          for (let j = x.distanceFromTop; j < x.distanceFromTop + x.height; j++) {
            if (fabricGrid[j][i] > 1) {
              noOverlap = false;
            }
          }
        }
        if (noOverlap === true) {
          specialClaim = x.id
        }
      });

      this.setState({
        maxWidth: maxWidth,
        maxHeight: maxHeight,
        fabricGrid: fabricGrid,
        overlapCount: overlapCount,
        specialClaim: specialClaim
      });
    }
  }
}