// console.log("Redux Demo From ReduxToolkit");
const redux = require("redux");
const createStore = redux.createStore;
const bindActionCreators = redux.bindActionCreators;
const combineReducers = redux.combineReducers; //For combining reducers
const applyMiddleware = redux.applyMiddleware; //For applying middleware

const reduxLogger = require("redux-logger");
const logger = reduxLogger.createLogger();

//Defining action const
const CAKE_ORDERED = "CAKE_ORDERED";
const CAKE_RESTOCKED = "CAKE_RESTOCKED";
const ICECREAM_ORDERED = "ICECREAM_ORDERED";
const ICECREAM_RESTOCKED = "ICECREAM_RESTOCKED";

//Action = is a object which contain type property with other properties whose value is action const
//payload = for sending additional properties with action
//Defining action creator
const orderCake = () => {
  return {
    type: CAKE_ORDERED,
    payload: 1,
  };
};

const restockCake = (qty = 1) => {
  return {
    type: CAKE_RESTOCKED,
    payload: qty,
  };
};

const orderIceCream = (qty = 1) => {
  return {
    type: ICECREAM_ORDERED,
    payload: qty,
  };
};

const restockIceCream = (qty = 1) => {
  return {
    type: ICECREAM_RESTOCKED,
    payload: qty,
  };
};

//Initial state
// const initialState = {
//   numOfCakes: 10,
//   numOfIceCreams: 20,
// };

//Initial cake state
const initialCakeState = {
  numOfCakes: 10,
};

//Initial ice-cream state
const initialIceCreamState = {
  numOfIceCreams: 20,
};

//Reducer :- (prevState,action) => newState
// const reducer = (state = initialState, action) => {
//   switch (action.type) {
//     case CAKE_ORDERED:
//       return {
//         ...state,
//         numOfCakes: state.numOfCakes - 1,
//       };

//     case CAKE_RESTOCKED: {
//       return {
//         ...state,
//         numOfCakes: state.numOfCakes + action.payload,
//       };
//     }

//     case ICECREAM_ORDERED:
//       return {
//         ...state,
//         numOfIceCreams: state.numOfIceCreams - action.payload,
//       };

//     case ICECREAM_RESTOCKED: {
//       return {
//         ...state,
//         numOfIceCreams: state.numOfIceCreams + action.payload,
//       };
//     }

//     default:
//       return state;
//   }
// };

//For cake reducer
const cakeReducer = (state = initialCakeState, action) => {
  switch (action.type) {
    case CAKE_ORDERED:
      return {
        ...state,
        numOfCakes: state.numOfCakes - 1,
      };

    case CAKE_RESTOCKED: {
      return {
        ...state,
        numOfCakes: state.numOfCakes + action.payload,
      };
    }

    default:
      return state;
  }
};

//For ice cream reducer
const iceCreamReducer = (state = initialIceCreamState, action) => {
  switch (action.type) {
    case ICECREAM_ORDERED:
      return {
        ...state,
        numOfIceCreams: state.numOfIceCreams - action.payload,
      };

    case ICECREAM_RESTOCKED: {
      return {
        ...state,
        numOfIceCreams: state.numOfIceCreams + action.payload,
      };
    }

    default:
      return state;
  }
};

//For combining multiple reducers into one rootReducer
const rootReducer = combineReducers({
  cake: cakeReducer,
  iceCream: iceCreamReducer,
});

//Defining store
// const store = createStore(reducer);
const store = createStore(rootReducer, applyMiddleware(logger));
console.log("Initial state : ", store.getState());

//For subscribing store with app to listen state changes
// const unsubscribe = store.subscribe(() =>
//   console.log("Update state : ", store.getState())
// );
const unsubscribe = store.subscribe(() => {});

//For defining dispatch method to update state. DIspatch method accept action as arg in this case action creator as it is returning the action
// store.dispatch(orderCake());
// store.dispatch(orderCake());
// store.dispatch(orderCake());
// store.dispatch(restockCake(3));

//For binding action vcreators with dispatch method
const actions = bindActionCreators(
  { orderCake, restockCake, orderIceCream, restockIceCream },
  store.dispatch
);
//For calling actions
actions.orderCake();
actions.orderCake();
actions.orderCake();
actions.restockCake(3);
actions.orderIceCream();
actions.orderIceCream();
actions.restockIceCream(2);

//For unsubscribing store
unsubscribe();
