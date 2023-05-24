'use client';

import React, { useRef, useState, useEffect, useCallback } from 'react';
import { io } from 'socket.io-client';
import Head from 'next/head';
import { openSteam, peer, playStream } from './stream.util';
import ReCored from './record';
export const socket = io('http://localhost:4000/', {
  transports: ['websocket'],
});

const ChattingLayout = () => {
  const videoREf = useRef<HTMLVideoElement>(null);
  const videoREfRemove = useRef<HTMLVideoElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const [id, setid] = useState<any>(null);

  useEffect(() => {
    // client-side
    socket.on('connect', () => {
      console.log(socket.id); // x8WIv7-mJelg7on_ALbx
    });

    socket.on('disconnect', () => {
      console.log(socket.id); // undefined
    });
  }, []);
  useEffect(() => {
    peer.on('open', (id: string | any) => {
      videoREf.current?.setAttribute('data-id', id);
      setid(id);
    });
    peer.on('connection', function (conn) {
      conn.on('open', function () {
        // Receive messages
        conn.on('data', function (data) {
          console.log('Received', data);
        });

        // Send messages
        conn.send('Hello!');
      });
    });
  }, [id]);
  const handleSubmitcall = () => {
    openSteam()
      .then((stream) => {
        let call = peer.call(id, stream);
        console.log(id);
        call.on('stream', function (remoteStream) {
          console.log(remoteStream);
          // Show stream in some video/canvas element.
          console.log('máy người reply', remoteStream);
          playStream(videoREf.current, remoteStream);
        });

        peer.on('call', (call) => {
          openSteam().then((stream) => {
            call.answer(stream); // Answer the call with an A/V stream.
            call.on('stream', function (remoteStream) {
              // Show stream in some video/canvas element.

              console.log('máy người bấm gọi', remoteStream);
              playStream(videoREfRemove.current, remoteStream);
            });
          });
        });
      })
      .catch((err) => {
        console.log('Failed to get local stream', err);
      });
  };
  const handlssubmitkey = () => {
    setid(inputRef.current?.value);
  };

  return (
    <>
      <Head>
        <title>Chatting with me</title>
      </Head>

      <button onClick={handleSubmitcall} className="py-2 px-4  bg-red-700">
        callvideo
      </button>
      <p>id :{id}</p>
      <input
        ref={inputRef}
        type="text"
        placeholder="Enter your key"
        className="text-black"
      />
      <button onClick={handlssubmitkey}>submid id</button>
      <div className="grid grid-cols-2">
        <video controls width={300} ref={videoREf}></video>
        <video controls width={300} ref={videoREfRemove}></video>
      </div>
      <div>
        <ReCored />
      </div>
    </>
  );
};

export default ChattingLayout;
