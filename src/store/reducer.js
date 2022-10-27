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
    case 'AddImage':
      return {
        ...state,
        feedContent: {
          ...state.feedContent,
          image: state.feedContent.image.concat({
            file: action.payload.file,
            originalName: action.payload.originalName,
            path: action.payload.path,
            description: ' '
          })
        }
      };
    case 'DeleteImage':
      return {
        ...state,
        feedContent: {
          ...state.feedContent,
          image: state.feedContent.image.filter((item, index) => index !== action.payload)
        }
      };
    case 'AddDescription':
      return {
        ...state,
        feedContent: {
          ...state.feedContent,
          image: state.feedContent.image.map((item, index) =>
            index === action.payload.index ? {...item, description: action.payload.description} : item)
        }
      };
    case 'ResetFeed':
      return {...state, feedContent: {content: '', image: []}};
    default:
      return state;
  }
};