import { ToastMessage } from '@/lib/utils';

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
