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
  const inputRef = useRef<HTMLInputElement | null>(null);
  const chatting = useRef<HTMLInputElement | null>(null);

  const [listChat, setListChat] = useState<
    { username: string; text: string }[]
  >([]);
  const [listUser, setListUser] = useState<string[]>([]);
  useEffect(() => {
    // client-side
    socket.on('connect', () => {
      console.log(socket.id); // x8WIv7-mJelg7on_ALbx
    });
    socket.on('disconnect', () => {
      console.log(socket.id); // undefined
    });
    socket.on('disconnect', () => {
      console.log(socket.id); // undefined
    });
    socket.on('sever-send-infomation-accout', (data) => {
      if (!data.status) {
        alert(data);
        return;
      }

      setListUser(() => data.listUser);
    });
    socket.on('server-chatting-send', (data) => {
      setListChat((pre) => data);
      console.log(data);
    });
  }, []);
  const hanleChatting = () => {
    const message = chatting.current?.value || '';
    socket.emit('client-chatting', message);
  };
  const hanleCreateAccount = () => {
    const account = inputRef.current?.value || '';
    socket.emit('client-create-account', account);
  };
  return (
    <>
      <h1>Đăng ký tài khoảng</h1>

      <input
        ref={inputRef}
        type="text"
        className="py-2 px-2 text-black"
        placeholder="Enter your name"
      />
      <input
        ref={chatting}
        type="text"
        className="py-2 px-2 text-black"
        placeholder="Enter your chatting"
      />
      <button
        onClick={hanleChatting}
        className="py-2 px-5 rounded-3xl bg-main "
      >
        chatting
      </button>
      <button
        onClick={hanleCreateAccount}
        className="py-2 px-5 rounded-3xl bg-main "
      >
        Create User
      </button>
      <section className="relative">
        <div className="w-[300px] h-[200px] bg-pink-200 mt-2">
          {listChat.map((chat, index) => (
            <article key={index} className="my-2">
              <span>{chat.username}</span> : <span>{chat.text}</span>
            </article>
          ))}
        </div>
        <div className="bg-white text-black  absolute top-0 right-0 w-[300px] py-2 px-2">
          <h2>Danh sách online</h2>
          {listUser.map((user, index) => (
            <p key={index}>{user}</p>
          ))}
        </div>
      </section>
    </>
  );
};

export default ChattingLayout;
