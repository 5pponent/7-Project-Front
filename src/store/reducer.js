export default function reducer(state, action) {
  switch (action.type) {
    case 'User':
      return {...state, user: action.payload};
    case 'ChangeMode':
      return {...state, mode: action.payload};
    case 'DarkMode':
      return {...state, darkMode: !state.darkMode};
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
    case 'CreateFeed':
      return {...state, feedContent: {...state.feedContent, content: action.payload}};
    case 'OpenLikedList':
      return {...state, likedList: true};
    case 'CloseLikedList':
      return {...state, likedList: false};
    default:
      return state;
  }
};