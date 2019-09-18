import * as React from "react";
import {FileUpload} from "../components/fileUpload"
import { ResultsPanel } from "../components/resultsPanel";
import { ContainerBase } from "./containerBase";

interface Props {}

interface State {
  fileLoaded: boolean;
  fileName: string;
  part1Result: number | null;
  part2Result: number | null;
  isPrinting: boolean;
  numbers: number[];
}

export class Day1Animated extends ContainerBase<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      fileLoaded: false,
      fileName: "",
      part1Result: null,
      part2Result: null,
      isPrinting: false,
      numbers: []
    };

    this.handleFileLoad = this.handleFileLoad.bind(this);
  }

  componentDidMount() {
    this.resizeCanvas();
  }

  componentDidUpdate() {
    if (this.state.isPrinting) {
      this.resizeCanvas();
      setTimeout(this.drawPart1, 25);
      setTimeout(() => console.log(this.state.numbers), 25);
    }
  }

  render() {

    return (
      <div>
        <FileUpload fileName={this.state.fileName} onFileLoad={this.handleFileLoad} />
        {this.state.fileLoaded && !this.state.part1Result ? <p>Loading</p> : this.renderResults()}
      </div>
    )
  }

  renderResults = () => {
    return (
      <ResultsPanel>
        <canvas id="part1Canvas" width={1280} height={720} className="displaySection--canvas" />
        <canvas id="part2Canvas" width={1280} height={720} className="displaySection--canvas" />
      </ResultsPanel>
    )
  };

  handleFileLoad(file: File) {
    const reader = this.prepareFileReader(file);

    reader.onload = () => {
      const numbersArray = this.prepareInput(reader);

      const part1Result = this.firstPart(numbersArray);

      const part2Result = this.secondPart(numbersArray);

      this.setState({
        numbers: numbersArray,
        isPrinting: true,
        part1Result,
        part2Result
      });
    };
  }

  prepareFileReader = (file: File) => {
    this.setState({
      fileLoaded: true,
      fileName: file.name
    });

    const reader = new FileReader();
    reader.readAsText(file);

    return reader
  };

  prepareInput = (file: FileReader) => {
    const rawText = file.result;

    const stringArray: string[] = (rawText as string).split("\n");
    return stringArray.filter(x => x !== "").map(x => parseInt(x, 10));
  };

  firstPart = (numbersArray: number[]) => {
    return numbersArray.reduce((a, b) => a + b, 0)
  };

  secondPart = (numbersArray: number[]) => {
    let currentFrequency = 0;
    let resultArray: number[] = [];
    let found = false;

    while(!found) {
      for (const frequency of numbersArray) {
        currentFrequency += frequency;
        if (resultArray.indexOf(currentFrequency) > -1) {
          found = true;
          return currentFrequency;
        }
        else  {
          resultArray.push(currentFrequency)
        }
      }
    }
    return currentFrequency;
  };

  drawPart1 = () => {
    const canvas = document.getElementById("part1Canvas") as HTMLCanvasElement;
    if (!canvas) return null;

    const ctx = canvas.getContext("2d");
    if (!ctx) return null;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.font = "250px Arial";

    let numberArray = this.state.numbers;
    const firstNumber = numberArray.shift();

    if (!firstNumber) {
      ctx.font = "65px Arial";
      ctx.fillText(`Giving a combined total of: ${this.state.part1Result}`, 0, canvas.height/2);
      this.setState({
        isPrinting: false,
      })
    }
    else  {
      ctx.fillText(firstNumber.toString(), 0, canvas.height/2)
      this.setState({
          numbers: numberArray
      });
    }
  };

  drawPart2 = () => {
    const canvas = document.getElementById("part2Canvas") as HTMLCanvasElement;
    if (!canvas) return null;

    const ctx = canvas.getContext("2d");
    if (!ctx) return null;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.font = "250px Arial";


  };

  resizeCanvas = () => {
    const part1canvas = document.getElementById("part1Canvas");
    const part2canvas = document.getElementById("part2Canvas");
    const window = document.getElementById("dynamic");

    if (!part1canvas || !window) return null;

    const windowHeight = window.offsetHeight;

    part1canvas.style.width = `${windowHeight * 0.9}px`;
    part1canvas.style.height = `${windowHeight / 2 * 0.85}px`;

    if (!part2canvas ) return null;

    part2canvas.style.width = `${windowHeight * 0.9}px`;
    part2canvas.style.height = `${windowHeight / 2 * 0.85}px`;
  }
}
