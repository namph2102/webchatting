import React, { useEffect, useRef, useState } from 'react';
// import { socket } from './page';

// const ReCored = () => {
//   const audioRef = useRef<HTMLAudioElement>(null);
//   const buttonRef = useRef<HTMLButtonElement>(null);
//   const [isOpenMedia, setIsOpenMedia] = useState<boolean>(false);
//   useEffect(() => {
//     navigator.mediaDevices
//       .getUserMedia({ audio: true, video: false })
//       .then((stream: MediaStream) => {
//         const mediaRecorder = new MediaRecorder(stream);
//         const chunks: BlobPart[] = [];
//         mediaRecorder.addEventListener('dataavailable', function (e) {
//           chunks.push(e.data);
//         });

//         mediaRecorder.addEventListener('stop', function () {
//           const audioBlob = new Blob(chunks, { type: 'audio/webm' });
//           const audioUrl = URL.createObjectURL(audioBlob);
//           // Làm gì đó với audioUrl, ví dụ tải về hoặc phát lại
//           if (audioRef.current) {
//             audioRef.current.src = audioUrl;

//             console.log(audioUrl);
//           }
//           const reader = new FileReader();
//           reader.onloadend = function () {
//             const base64Data = reader.result.split(',')[1];
//             // Làm gì đó với base64Data, ví dụ tải về hoặc gửi qua socket
//             socket.emit('send-data-handle', base64Data);
//           };

//           reader.readAsDataURL(audioBlob);
//         });
//         audioRef.current?.addEventListener('ended', () => {
//           URL.revokeObjectURL(audioRef.current?.src);
//         });
//         buttonRef.current?.addEventListener('click', () => {
//           setIsOpenMedia((prev) => {
//             try {
//               if (!prev) {
//                 mediaRecorder.start();
//               } else {
//                 mediaRecorder.stop();
//               }
//             } catch (err: any) {
//               console.log(err.message);
//             }
//             return !prev;
//           });
//         });
//       });
//   }, []);

//   return (
//     <div>
//       <button className="bg-red-400 text-white" ref={buttonRef}>
//         {!isOpenMedia ? 'Ghi âm' : 'Tắt ghi âm'}
//       </button>
//       <audio controls autoPlay ref={audioRef} src=""></audio>
//     </div>
//   );
// };
const ReCored = () => {
  return <p>Hello</p>;
};
export default ReCored;
