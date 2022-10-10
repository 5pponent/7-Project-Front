import React, {createContext, useReducer} from "react";
import reducer from "./reducer";

const initialState = {
  login: false,
  darkMode: false,
  mode: 'MAIN',
  user: {
    email: 'ahdwjdtprtm@gmail.com',
    followerCount: 0,
    followingCount: 0,
    id: 0,
    image: {
      originalName: undefined,
      source: undefined
    },
    interests: [],
    name: '사용자명',
    occupation: '직업'
  },
  feedContent: {
    content: '',
    image: [{file: '', description: ''}]
  }
};

const store = createContext(initialState);
const {Provider} = store;

const StoreProvider = ({children}) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return <Provider value={[state, dispatch]}>{children}</Provider>
};

export {initialState, store, StoreProvider};