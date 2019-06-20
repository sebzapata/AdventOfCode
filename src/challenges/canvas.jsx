import * as React from "react";

export class Canvas extends React.Component {
  constructor(props) {
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
    const canvas = document.getElementById("myCanvas");
    const ctx = canvas.getContext("2d");

    for (let j = 0; j < this.state.width; j+= 10) {
      for (let i = 0; i < this.state.width; i+= 10) {
        ctx.moveTo(i, j);
        ctx.lineTo(i + 10, j + 5);
      }
    }
    ctx.stroke();
  }

  resizeCanvas = () => {
    const canvas = document.getElementById("myCanvas");

    const divWidth = document.getElementById("canvasDiv").clientWidth;
    const divHeight = document.getElementById("canvasDiv").clientHeight;

    // canvas.style.width = `${divWidth}`
    // canvas.style.height = `${divHeight}`

    this.setState({
      width: divWidth,
      height: divHeight
    })
  }
}