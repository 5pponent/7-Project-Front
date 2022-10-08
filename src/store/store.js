import React, {createContext, useReducer} from "react";
import reducer from "./reducer";

const initialState = {
  user: {
    email: 'ahdwjdtprtm@gmail.com',
    followerCount: 0,
    followingCount: 0,
    id: 'ahdwjdtprtm',
    image: {
      originalName: undefined,
      savedName: undefined
    },
    interests: [
      undefined
    ],
    name: '사용자명',
    occupation: '직업'
  },
  login: false,
  darkMode: false,
  mode: 'MAIN',
  feedContent: ''
};

const store = createContext(initialState);
const {Provider} = store;

const StoreProvider = ({children}) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return <Provider value={[state, dispatch]}>{children}</Provider>
};

export {store, StoreProvider};