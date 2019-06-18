import * as React from "react";

export class Canvas extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      width: 900,
      height: 900
    }
  }
  componentDidMount() {
    const canvas = document.getElementById("myCanvas");
    const ctx = canvas.getContext("2d");

    this.drawStuff(ctx)
  }
  render() {
    return (
      <div>
        <canvas id="myCanvas" width={this.state.width} height={this.state.height} style={{border: "1px solid #000000"}} />
      </div>
    )
  }
  drawStuff = (ctx) => {
    for (let j = 0; j < this.state.width; j+= 10) {
      for (let i = 0; i < this.state.width; i+= 10) {
        ctx.moveTo(i, j);
        ctx.lineTo(i + 10, j + 5);
        ctx.stroke();
      }
    }
  }
}