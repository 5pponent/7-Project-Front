import React, {createContext, useReducer} from "react";
import reducer from "./reducer";

const initialState = {
  user: {
    email: 'ahdwjdtprtm@gmail.com',
    followerCount: undefined,
    followingCount: undefined,
    id: 'ahdwjdtprtm',
    image: {
      originalName: undefined,
      savedName: 'https://placeimg.com/100/100/people/00'
    },
    interests: [
      undefined
    ],
    name: '사용자명',
    occupation: '직업'
  },
  login: true,
  darkMode: false,
  mode: 'MAIN'
};

const store = createContext(initialState);
const {Provider} = store;

const StoreProvider = ({children}) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return <Provider value={[state, dispatch]}>{children}</Provider>
};

export {store, StoreProvider};