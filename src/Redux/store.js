// import createStore() from redux to deal with reducer
import { createStore } from "redux";
import rootReducer from "./reducer";
// save the data in store
let store = createStore(rootReducer);
// expose store to other components
export default store;
