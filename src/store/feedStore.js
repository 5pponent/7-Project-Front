import React, {createContext, useReducer} from "react";
import feedReducer from "./feedReducer";

const FeedInitialState = {
  feedContent: '',
  feedImage: []
};

const feedStore = createContext(FeedInitialState);
const {Provider} = feedStore;

const FeedStoreProvider = ({children}) => {
  const [feedState, feedDispatch] = useReducer(feedReducer, FeedInitialState);
  return <Provider value={[feedState, feedDispatch]}>{children}</Provider>
}

export {FeedInitialState, feedStore, FeedStoreProvider};