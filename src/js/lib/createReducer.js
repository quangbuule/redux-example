import Immutable, { Map, List } from 'immutable';

export default function createReducer(intialState, handlers) {
  return (state = intialState, action) => {
    if (!Map.isMap(state) && !List.isList(state)) {
      state = Immutable.fromJS(state);
    }

    const handler = handlers[action.type];

    if (!handler) {
      return state;
    }

    state = handler(state, action);

    if (!Map.isMap(state) && !List.isList(state)) {
      throw new TypeError('Reducers must return Immutable objects.');
    }

    return state;
  };
}
