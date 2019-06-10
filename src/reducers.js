const getInitialState = () => {
  return {
    component: "",
  }
};

export const countReducer = (state = getInitialState(), action) => {
  switch (action.type) {
    case  "COUNT":
      const nextState = {
        count: state.count + action.payload.count,
      };

      return nextState;
    default:
      return state;
  }
};

export const displayReducer = (state = getInitialState(), action) => {
  switch (action.type) {
    case  "CHANGE_COMPONENT":
      const nextState = {
        component: action.payload.component
      };

      return nextState;
    default:
      return state;
  }
};

