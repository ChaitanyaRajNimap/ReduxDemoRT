const redux = require("redux");
const produce = require("immer").produce;

//Initial state
const initialState = {
  name: "Chay",
  address: {
    street: "143 Main St",
    city: "Boston",
    state: "MA",
  },
};

//Action constant
const STREET_UPDATED = "STREET_UPDATED";

//Action creator
const updateStreet = (street) => {
  return {
    type: STREET_UPDATED,
    payload: street,
  };
};

//Reducer
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case STREET_UPDATED:
      //   return {
      //     ...state,
      //     address: {
      //       ...state.address,
      //       street: action.payload,
      //     },
      //   };

      //Immer lib => simplifies nested state update process
      return produce(state, (draft) => {
        draft.address.street = action.payload;
      });

    default: {
      return state;
    }
  }
};

//store
const store = redux.createStore(reducer);
console.log("Initial state : ", store.getState());

//Subscribing store
const unsubscribe = store.subscribe(() => {
  console.log("Updated state : ", store.getState());
});
store.dispatch(updateStreet("456 Main St"));

//Unsubscribibg store
unsubscribe();
