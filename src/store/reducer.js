import React from 'react';
import {initialState} from "./store";

export default function reducer(state, action) {
  switch (action.type) {
    case 'Login':
      return {...state, login: true};
    case 'Logout':
      return initialState;
    case 'User':
      return {...state, user: action.payload};
    case 'ChangeMode' :
      return {...state, mode: action.payload};
    case 'DarkMode':
      return {...state, darkMode: !state.darkMode};
    case 'CreateFeed':
      return {...state, feedContent: {...state.feedContent, content: action.payload}};
  }
};