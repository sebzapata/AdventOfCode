import * as React from "react";

interface Props {}

interface State {
  width: number;
  height: number;
  colWidth: number;
  rowHeight: number;
  lineWidth: number;
  lineHeight: number;
}

export class Canvas extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      width: 1000,
      height: 1000,
      colWidth: 10,
      rowHeight: 10,
      lineWidth: 0,
      lineHeight: 0,
    }
  }
  componentDidMount() {
    this.resizeCanvas();
  }

  componentDidUpdate() {
    this.drawWaves();
  }

  render() {
    return (
      <div id="canvasDiv" className="displaySection">
        {this.renderInputBoxes()}
        <canvas id="myCanvas" width={this.state.width} height={this.state.height} className="displaySection--canvas" />
      </div>
    )
  }

  renderInputBoxes = () => {
    return (
      <div className="displaySection--inputSection">
        {this.renderInputBlock("Column width", "colWidth", 1)}
        {this.renderInputBlock("Row height", "rowHeight", 1)}
        {this.renderInputBlock("Line width", "lineWidth")}
        {this.renderInputBlock("Line height", "lineHeight")}
      </div>
    )
  };

  renderInputBlock = (displayText: string, stateKey: keyof State, minimumValue?: number) => {
    return (
      <div className="displaySection--inputSection--inputBlock">
        {`${displayText}: `}
        <input
          className="displaySection--inputSection--inputBlock--inputBox"
          type="number"
          min={minimumValue}
          onChange={
            (e) => this.setState(
              {
                [stateKey]: parseInt(e.target.value)
              } as Pick<State, keyof State>
            )
          }
        />
      </div>
    )
  };

  drawWaves = () => {
    const canvas = document.getElementById("myCanvas") as HTMLCanvasElement;
    if (!canvas) return null;

    const ctx = canvas.getContext("2d");
    if (!ctx) return null;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.beginPath();
    for (let j = 0; j < this.state.width; j+= this.state.rowHeight) {   //Spacing height
      for (let i = 0; i < this.state.width; i+= this.state.colWidth) { //Spacing width
        ctx.moveTo(i, j);
        ctx.lineTo(i + this.state.lineWidth, j + this.state.lineHeight);   //How far across to next column, how far down to next line
      }
    }
    ctx.stroke();
  };

  resizeCanvas = () => {
    const canvas = document.getElementById("myCanvas");
    const window = document.getElementById("dynamic");

    if (!canvas || !window) return null;

    const windowHeight = window.offsetHeight;

    canvas.style.width = `${windowHeight * 0.95}px`;
    canvas.style.height = `${windowHeight * 0.95}px`;
  }
}