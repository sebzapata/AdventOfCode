import * as React from "react";

interface Props {}

interface State {
  width: number;
  height: number;
}

export class Canvas extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      width: 1000,
      height: 1000
    }
  }
  componentDidMount() {
    this.drawStuff();
    // this.resizeCanvas()
  }
  render() {
    return (
      <div id="canvasDiv">
        <canvas id="myCanvas" width={this.state.width} height={this.state.height} style={{border: "1px solid #000000"}} />
      </div>
    )
  }
  drawStuff = () => {
    const canvas = document.getElementById("myCanvas") as HTMLCanvasElement;
    if (!canvas) return null;

    const ctx = canvas.getContext("2d");
    if (!ctx) return null;



    for (let j = 0; j < this.state.width; j+= 10) {
      for (let i = 0; i < this.state.width; i+= 10) {
        ctx.moveTo(i, j);
        ctx.lineTo(i + 10, j + 5);
      }
    }
    ctx.stroke();
  };

  resizeCanvas = () => {
    const canvas = document.getElementById("myCanvas");

    if (!canvas) return null;

    const divWidth = canvas.clientWidth;
    const divHeight = canvas.clientHeight;

    // canvas.style.width = `${divWidth}`
    // canvas.style.height = `${divHeight}`

    this.setState({
      width: divWidth,
      height: divHeight
    })
  }
}