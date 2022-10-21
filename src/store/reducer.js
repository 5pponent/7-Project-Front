import React from 'react';

export default function reducer(state, action) {
  switch (action.type) {
    case 'User':
      return {...state, user: action.payload};
    case 'ChangeMode':
      return {...state, mode: action.payload};
    case 'DarkMode':
      return {...state, darkMode: !state.darkMode};
    case 'CreateFeed':
      return {...state, feedContent: action.payload};
    case 'AddImage':
      return {
        ...state,
        feedImage: state.feedImage.concat({
          file: action.payload.file,
          originalName: action.payload.originalName,
          description: ' '
        })
      };
    case 'AddDescription':
      return {
        ...state,
        feedImage: state.feedImage.map((item, index) =>
          index === action.payload.index ? {...item, description: action.payload.description} : item)
      };
    case 'DeleteImage':
      return {
        ...state,
        feedImage: state.feedImage.filter((item, index) => index !== action.payload)
      };
    case 'ResetFeed':
      return {...state, feedContent: '', feedImage: []};
    case 'OpenLoading':
      return {...state, loading: {open: true, message: action.payload}};
    case 'CloseLoading':
      return {...state, loading: {open: false, message: ''}};
    case 'OpenImageView':
      return {...state, imageView: {open: true, source: action.payload}};
    case 'CloseImageView':
      return {...state, imageView: {open: false, source: ''}};
    case 'OpenSnackbar':
      return {...state, snackbar: {open: true, message: action.payload}};
    case 'CloseSnackbar':
      return {...state, snackbar: {open: false, message: ''}};
    default:
      return state;
  }
};