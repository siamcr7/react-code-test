import React from "react";

export class ComponentBase<TProp, TState> extends React.Component {
  constructor(props: TProp, initialState?: TState) {
    super(props);

    if (initialState !== undefined) {
      this.state = { ...initialState };
    }
  }

  get currentState(): TState { return this.state as TState; }

  // setCurrentState(inp: TState): void {
  //   this.setState({
  //     ...inp
  //   });
  // }
}