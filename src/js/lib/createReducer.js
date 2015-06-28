export default function createReducer(intialState, handlers) {
  return (state = intialState, action) => {
    const handler = handlers[action.type];

    if (!handler) {
      return state;
    }

    return handler(state, action);
  };
}
