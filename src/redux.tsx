import { DisplayAction, displayReducer, DisplayState } from "./reducers";

interface Store {
  listeners: (() => void)[];
  getState: () => DisplayState;
  subscribe: (listener: () => void) => void;
  dispatch: (action: DisplayAction) => void;
}

type Reducer = (state: DisplayState, action: DisplayAction ) => DisplayState

const createStore = (reducer: Reducer, initialState: DisplayState) => {
  let state: DisplayState = initialState;

  const store: Store = {
    listeners: [],
    getState: () => state,
    subscribe: (listener) => {
      store.listeners.push(listener);
    },
    dispatch: (action) => {
      state = reducer(state, action);
      store.listeners.forEach(listener => listener());
    }
  };

  return store;
};

export const store = createStore(displayReducer, {component: ""});

