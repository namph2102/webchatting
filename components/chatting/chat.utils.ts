import { ChatContentProps } from './ChatContent';

export const handleCoverComment = (str: string) => {
  let list: string[] = [];
  let newStr = str;
  if (str.includes('```')) {
    list = str.split('```');
    newStr = list
      .map((item, index) => {
        if (index == 0 || index == list.length - 1) {
          return item.trim();
        }
        return `
${item.trim()}     
`;
      })
      .join('');
  }
  console.log(JSON.stringify(newStr));
  return newStr;
};

// action
const ADD_COMENT = 'ADD_COMENT';
const DETELE_COMENT = 'DETELE_COMENT';
const UPDATE_COMENT = 'UPDATE_COMENT';
//handle
export const handleAddComment = (payload: ChatContentProps) => {
  return {
    type: ADD_COMENT,
    payload,
  };
};
export const CommentReducer = (
  state: ChatContentProps[],
  action: { type: string; payload: ChatContentProps }
) => {
  switch (action.type) {
    case ADD_COMENT:
      return [...state, action.payload];
    default:
      return state;
  }
};