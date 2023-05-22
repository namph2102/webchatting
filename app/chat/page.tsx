'use client';
import Footer from '@/components/sidebar';
import Header from '@/components/header';
import React, { useRef, useState, useEffect } from 'react';
import { io } from 'socket.io-client';
import { cn } from '@/lib/utils';
const socket = io('http://localhost:4000/', { transports: ['websocket'] });
const colors = ['red', 'green', 'yellow'];
const ChattingLayout = () => {
  const [content, setContent] = useState<string>();

  useEffect(() => {
    // client-side
    socket.on('connect', () => {
      console.log(socket.id); // x8WIv7-mJelg7on_ALbx
    });
    socket.on('disconnect', () => {
      console.log(socket.id); // undefined
    });
    socket.on('sever-send-data', (data) => {
      setContent(data);
      console.log(data);
    });
  }, []);
  const handleSubmitData = async (color: string) => {
    socket.emit('clientsendcolor', color);
    fetch('/api/user', {
      method: 'POST',
      body: JSON.stringify({
        name: 'HoaiNam',
        email: 'namanhthao59@gmail.com',
      }),
    });
  };

  return (
    <>
      <h1>Chatting</h1>
      <div className={cn('w-full text-colors-warmGray-200 my-3')}>
        Đang màu {content}
      </div>
      <div>
        {colors.map((color) => (
          <button
            className={cn(`bg-${color}-slate-400`, 'px-5 py-2 rounded-lg')}
            key={color}
            onClick={() => handleSubmitData(color)}
          >
            {color}
          </button>
        ))}
      </div>
    </>
  );
};

export default ChattingLayout;
