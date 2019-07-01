import React from "react";

export type Props<TProps> = TProps;

export abstract class ContainerBase<TProps = {}, TState = {}> extends React.Component<Props<TProps>, TState> {
  constructor(props: Props<TProps>) {
    super(props);
  }

  protected abstract renderResults(): React.ReactNode;

  protected abstract handleChange(file: File): void;
}