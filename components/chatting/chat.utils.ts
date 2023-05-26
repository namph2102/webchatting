import { ToastMessage } from '@/lib/utils';
import { ChatContentProps } from './ChatContent';
import SpeechRecognition, {
  useSpeechRecognition,
} from 'react-speech-recognition';
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
  return newStr;
};
export const HandleCoverStringEntries = (str: string) => {
  str = str.trim();
  if (str.includes('<')) {
    str = str.replaceAll('<', '&lt;');
  }
  if (str.includes('>')) {
    str = str.replaceAll('>', '&gt;');
  }
  if (str.includes('  ')) {
    str = str.replaceAll(/\s{2}/g, ' ');
  }
  console.log(str);
  return str;
};

export const HandleCoverSpeaktoText = (
  setIsOpenVoices: (isOpenMic: any) => void,
  callbackGetString: (textSpeeak: string | boolean) => void
) => {
  try {
    //Để chuyển đổi lời nói thành văn bản
    let recognition: any;
    if (typeof window !== 'undefined' && 'webkitSpeechRecognition' in window) {
      recognition = new webkitSpeechRecognition();
    }

    // Kiểm tra xem trình duyệt hỗ trợ Web Speech API
    if (recognition) {
      // Tạo một đối tượng SpeechRecognition để nhận dạng giọng nói

      // Đặt ngôn ngữ cho nhận dạng giọng nói
      recognition.lang = 'vi-VN';

      recognition.start();

      recognition.onend = function (event: any) {
        recognition.stop();
      };
      recognition.onerror = function (event: any) {
        ToastMessage('Có vẻ lỗi voice  vui lòng thử lại').error();
        callbackGetString(false);
      };
      recognition.onresult = function (event: any) {
        // Lấy kết quả nhận dạng
        const speechResult = event.results[0][0].transcript;
        // In ra kết quả nhận dạng
        callbackGetString(speechResult);
      };
    } else {
      callbackGetString(false);
      recognition = new webkitSpeechRecognition();
    }
  } catch (err: { message: string } | any) {
    callbackGetString(false);
  }
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
