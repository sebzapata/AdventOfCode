import { ContainerBase } from "./containerBase";

interface Props {}

interface State {
  fileLoaded: boolean,
  fileName: string
}

export class Day4 extends ContainerBase<Props, State> {

  constructor(props: Props) {
    super(props);

    this.state = {
      fileLoaded: false,
      fileName: "",
    }
  }

}