import Immutable, { Map, List } from 'immutable';

export default function createReducer(intialState, handlers) {
  return (state = intialState, action) => {
    if (!Map.isMap(state) && !List.isList(state)) {
      intialState = Immutable.fromJS(intialState);
    }

    const handler = handlers[action.type];

    if (!handler) {
      return state;
    }

    return handler(state, action);
  };
}
