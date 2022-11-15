export default function feedReducer(state, action) {
  switch (action.type) {
    case 'AddContent':
      return {...state, feedContent: action.payload};
    case 'AddImage':
      return {...state, feedImage: state.feedImage.concat(action.payload)};
    case 'DeleteImage':
      return {state, feedImage: state.feedImage.filter((item, index) => index !== action.payload)};
    case 'MoveImage':
      return {...state, feedImage: action.payload};
    case 'ChangeDesc':
      return {...state,
        feedImage: state.feedImage.map((item, index) => index === action.payload.num ? {
          ...item,
          description: action.payload.description
        } : item)
      };
    case 'ResetFeed':
      return {...state, feedContent: '', feedImage: []};
    default:
      throw Error(`${action.type}: 알 수 없는 타입입니다.`);
  }
};