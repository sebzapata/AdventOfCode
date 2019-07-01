export interface DisplayAction {
  payload: DisplayState;
  type: string;
}

export interface DisplayState {
  component: string;
}

export const displayReducer = (state: DisplayState, action: DisplayAction) => {
  switch (action.type) {
    case  "CHANGE_COMPONENT":
      return {
        component: action.payload.component
      };

    default:
      return state;
  }
};

