import * as React from "react";
import { FileUpload } from "../components/fileUpload";
import { ContainerBase } from "./containerBase";
import { ResultsPanel } from "../components/resultsPanel";

interface Props {}

interface State {
  fileLoaded: boolean,
  fileName: string,
  sleepiestGuardId: number,
  sleepiestMinute: number,
  mostFrequentGuardId: number,
  mostFrequentMinute: number
}

interface guardInfo {
  guardId: number,
  asleepTime: number,
  sleepTimes: Date[],
  minutesCount: number[]
}

export class Day4 extends ContainerBase<Props, State> {

  constructor(props: Props) {
    super(props);

    this.state = {
      fileLoaded: false,
      fileName: "",
      sleepiestGuardId: 0,
      sleepiestMinute: 0,
      mostFrequentGuardId: 0,
      mostFrequentMinute: 0
    };

    this.handleFileLoad = this.handleFileLoad.bind(this);
  }

  render() {
    return (
      <div>
        <FileUpload onFileLoad={this.handleFileLoad} fileName={this.state.fileName}/>
        {this.state.fileLoaded && !this.state.sleepiestGuardId ? <p>Loading</p> : this.renderResults()}
      </div>
    )
  }

  handleFileLoad(file: File) {
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

      const dateTimeRegEx = /\d{4}-\d{2}-\d{2} \d{2}:\d{2}/;

      stringArray.sort(function(x, y){
        const dateTimeX = x.match(dateTimeRegEx);
        const dateTimeY = y.match(dateTimeRegEx);

        if (!dateTimeX || !dateTimeY) return 0;

        const jsDateTimeX = new Date(dateTimeX[0]);
        const jsDateTimeY = new Date(dateTimeY[0]);

        return jsDateTimeX > jsDateTimeY ? 1 : -1
      });

      let timesArray: guardInfo[] = [];
      let sleepTimes: Date[] = [];

      let asleepDateTime = new Date();
      let awakeDateTime = new Date();
      let sleepDuration = 0;
      let guardId = 0;

      stringArray.forEach((guardActionString, count) => {
        if (guardActionString.includes("begins shift")) {
          timesArray.push({
            guardId: guardId,
            asleepTime: sleepDuration,
            sleepTimes: sleepTimes,
            minutesCount: []
          });

          sleepDuration = 0;
          sleepTimes = [];
          const guardIdWithHash = guardActionString.match(/#\d*/);
          if (!guardIdWithHash) return null;

          guardId = parseInt(guardIdWithHash[0].substr(1));
        }

        if (guardActionString.includes("falls asleep")) {
          const asleepString = guardActionString.match(/\d{4}-\d{2}-\d{2} \d{2}:\d{2}/);

          if(!asleepString) return null;

          asleepDateTime = new Date(asleepString[0]);
          sleepTimes.push(asleepDateTime);
        }

        if (guardActionString.includes("wakes up")) {
          const awakeString = guardActionString.match(/\d{4}-\d{2}-\d{2} \d{2}:\d{2}/);

          if(!awakeString) return null;

          awakeDateTime = new Date(awakeString[0]);
          sleepTimes.push(awakeDateTime);

          const sleepTime = (awakeDateTime.getMinutes() - asleepDateTime.getMinutes());
          sleepDuration = sleepDuration + sleepTime;
        }

        if (count === stringArray.length - 1) {
          timesArray.push({
            guardId: guardId,
            asleepTime: sleepDuration,
            sleepTimes: sleepTimes,
            minutesCount: []
          });
        }
      });

      let guardInfoArray = timesArray.reduce((total: guardInfo[], current) => {
        const idPresent = total.find(x => x.guardId === current.guardId);

        if (idPresent) {
          const index = total.indexOf(idPresent);

          total[index].asleepTime = total[index].asleepTime + current.asleepTime;
          total[index].sleepTimes.push(...current.sleepTimes);
        } else {
          total.push(current);
        }

        return total;
      }, []);

      const sleepiestGuard = guardInfoArray.reduce((prev, current) => {
        return prev.asleepTime > current.asleepTime ? prev : current
      });

      const sleepiestGuardShifts = timesArray.filter(x => {
        return x.guardId === sleepiestGuard.guardId;
      });

      let sleepiestMinutesArray = new Array(60).fill(0);

      sleepiestGuardShifts.forEach(shift => {
        for (let i = 0; i < shift.sleepTimes.length; i = i + 2) {
          const napStart = shift.sleepTimes[i];
          const napEnd = shift.sleepTimes[i + 1];

          for (let j = napStart.getMinutes(); j < napEnd.getMinutes(); j++) {
            sleepiestMinutesArray[j]++;
          }
        }
      });

      guardInfoArray.forEach(x => {
        x.minutesCount = new Array(60).fill(0);
      });

      guardInfoArray.forEach(guard => {
        for (let i = 0; i < guard.sleepTimes.length; i = i + 2) {
          const napStart = guard.sleepTimes[i];
          const napEnd = guard.sleepTimes[i + 1];

          for (let j = napStart.getMinutes(); j < napEnd.getMinutes(); j++) {
            guard.minutesCount[j]++;
          }
        }
      });

      const sleepiestMinuteCount = Math.max(...sleepiestMinutesArray);
      const sleepiestMinute = sleepiestMinutesArray.indexOf(sleepiestMinuteCount);

      const mostFrequentGuard = guardInfoArray.reduce((prev, current) => {
        return Math.max(...prev.minutesCount) > Math.max(...current.minutesCount) ? prev : current
      });

      const mostFrequentMinute = mostFrequentGuard.minutesCount.indexOf(Math.max(...mostFrequentGuard.minutesCount));

      this.setState({
        sleepiestGuardId: sleepiestGuard.guardId,
        sleepiestMinute,
        mostFrequentGuardId: mostFrequentGuard.guardId,
        mostFrequentMinute,
      });
    };
  }

  renderResults = () => {
    return (
      <ResultsPanel>
        <div>
          {this.state.sleepiestGuardId ? <p>{`Sleepiest guard ID: ${this.state.sleepiestGuardId}`}</p> : null}
          {this.state.sleepiestMinute ? <p>{`Sleepiest minute: ${this.state.sleepiestMinute}`}</p> : null}
          {this.state.sleepiestGuardId && this.state.sleepiestMinute ? <p>{`Strategy 1 answer: ${this.state.sleepiestGuardId * this.state.sleepiestMinute}`}</p> : null}
        </div>
        <div>
          {this.state.mostFrequentGuardId ? <p>{`Most frequent guard ID: ${this.state.mostFrequentGuardId}`}</p> : null}
          {this.state.mostFrequentMinute ? <p>{`Most frequent minute: ${this.state.mostFrequentMinute}`}</p> : null}
          {this.state.mostFrequentGuardId && this.state.mostFrequentMinute? <p>{`Strategy 2 answer: ${this.state.mostFrequentGuardId * this.state.mostFrequentMinute}`}</p> : null}
        </div>
      </ResultsPanel>
    )
  }
}