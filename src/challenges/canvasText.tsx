import * as React from "react";

interface Props {}

interface State {
  text: string;
  width: number;
  height: number;
  isPrinting: boolean;
  speed: number;
}

export class CanvasText extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      text: "",
      width: 1000,
      height: 1000,
      isPrinting: false,
      speed: 500
    }
  }
  componentDidMount() {
    this.resizeCanvas();
  }

  componentDidUpdate() {
    if (this.state.isPrinting) {
      setTimeout(this.drawLetter, this.state.speed)
    }
  }

  render() {
    return (
      <div id="canvasDiv" className="displaySection">
        {this.renderInput()}
        <canvas id="myCanvas" width={this.state.width} height={this.state.height} className="displaySection--canvas" />
      </div>
    )
  }

  renderInput = () => {
    return (
      <div className="displaySection--inputSection">
        {this.renderTextInput()}
        <button onClick={this.handleClick}>Click me</button>
        {this.renderToggle()}
        <input type="range" min="1" max="5000" className="slider" onChange={(e) => this.setState({speed: parseInt(e.target.value, 10)})}/>
      </div>
    )
  };

  renderTextInput = () => {
    return (
      <div className="displaySection--inputSection--inputBlock">
        {`Text: `}
        <input
          id="inputBox"
          className="displaySection--inputSection--inputBlock--inputBox"
          type="text"
        />
      </div>
    )
  };

  renderToggle = () => {
    return (
      <div className="toggle">
        <p>Word</p>
        <label className="toggle--switch">
          <input id="wordCheckbox" type="checkbox" value="word"/>
          <span className="toggle--switch--slider"/>
        </label>
        <p>Letter</p>
      </div>
    )
  };
  handleClick = () => {
    if (this.state.isPrinting) return null;

    const inputText = (document.getElementById("inputBox") as HTMLInputElement).value;
    this.setState({
      text: inputText,
      isPrinting: true
    })
  };

  drawLetter = () => {
    const canvas = document.getElementById("myCanvas") as HTMLCanvasElement;
    if (!canvas) return null;

    const ctx = canvas.getContext("2d");
    if (!ctx) return null;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.font = "250px Arial";

    const checkbox = document.getElementById("wordCheckbox") as HTMLInputElement;

    let firstLetter = "";
    let restOfText = "";
    let firstWord: string | undefined = "";
    let restOfWord = "";

    if (checkbox.checked) {
      firstLetter = this.state.text.slice(0, 1);
      restOfText = this.state.text.slice(1, this.state.text.length);

      ctx.fillText(firstLetter!, 0, canvas.height/2);

      this.setState({
        text: restOfText
      })
    } else {
      const wordArray: string[] = this.state.text.split(" ");
      firstWord = wordArray.shift();
      restOfWord = wordArray.join(" ");

      ctx.fillText(firstWord!, 0, canvas.height/2)

      this.setState({
        text: restOfWord
      })
    }

    if (!this.state.text.length) {
      this.setState({
        isPrinting: false
      })
    }
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