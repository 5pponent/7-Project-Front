import React from 'react';

export default function reducer(state, action) {
  switch (action.type) {
    case 'Login':
      return {...state, login: true};
    case 'Logout':
      return {...state, login: false};
    case 'User':
      return {...state, user: action.payload};
    case 'ChangeMode' :
      return {...state, mode: action.payload};
    case 'DarkMode':
      return {...state, darkMode: !state.darkMode};
    default:
      return state;
  }
};