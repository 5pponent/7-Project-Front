import React, {createContext, useReducer} from "react";
import reducer from "./reducer";

const initialState = {
  darkMode: false,
  user: {
    email: undefined,
    followerCount: 0,
    followingCount: 0,
    id: 0,
    image: {
      originalName: undefined,
      source: undefined
    },
    interests: [],
    name: '사용자명',
    message: '',
    occupation: '직업'
  },
  feedContent: '',
  feedImage: [],
  loading: {
    open: false,
    message: ''
  },
  imageView: {
    open: false,
    source: ''
  },
  snackbar: {
    open: false,
    message: ''
  }
};

const store = createContext(initialState);
const {Provider} = store;

const StoreProvider = ({children}) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return <Provider value={[state, dispatch]}>{children}</Provider>
};

export {initialState, store, StoreProvider};