'use client';
import React, { useState, useRef, useReducer, useEffect } from 'react';
import { useMutation } from 'react-query';
import ChatInput from './ChatInput';
import ChatHeader from './ChatHeader';
import ChatContent, { ChatContentProps } from './ChatContent';
import { messageType } from './chat.type';
import { nanoid } from 'nanoid';
import { ScroolToBottom, ToastMessage, cn } from '@/lib/utils';
import hljs from 'highlight.js';
import javascript from 'highlight.js/lib/languages/javascript';
import xml from 'highlight.js/lib/languages/xml';
hljs.registerLanguage('javascript', javascript);
hljs.registerLanguage('xml', xml);
import './chatting.css';
import {
  CommentReducer,
  HandleCoverStringEntries,
  handleAddComment,
  handleCoverComment,
} from './chat.utils';
const initState: ChatContentProps[] = [];
const controller = new AbortController();
const signal = controller.signal;
const ChattingContainer = () => {
  const [listUserComments, dispatch] = useReducer(CommentReducer, initState);
  const [isLoadding, setIsLoadding] = useState<boolean>(false);
  const boxChatContentRef = useRef<HTMLElement>(null);
  const contentSlideAnimation = useRef<HTMLDivElement>(null);

  useEffect(() => {
    try {
      if (window?.innerWidth) {
        setIsOpenDisplayTable(window.innerWidth <= 990);
      }
    } catch {}

    if (contentSlideAnimation.current) {
      hljs.highlightBlock(contentSlideAnimation.current);
    }
  }, []);
  const mutation = useMutation({
    mutationFn: async (message: messageType) => {
      // add comment suer chat
      dispatch(
        handleAddComment({
          id: nanoid(),
          isUser: true,
          comment: message.text.trim(),
          time: getTime(),
          isSee: true,
        })
      );
      setIsLoadding(true);
      if (boxChatContentRef.current) {
        ScroolToBottom(boxChatContentRef.current, 100);
      }

      const idItemout = setTimeout(() => {
        controller.abort();
        clearTimeout(idItemout);
      }, 30000);
      const resposive = await fetch('/api/message', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: [message] }),
        signal,
      });
      if (resposive.body) {
        clearTimeout(idItemout);
      }
      return resposive.body;
    },
    onSuccess: async (stream) => {
      if (!stream) {
        throw new Error('Not have data');
      }
      const render = stream.getReader();
      const decoder = new TextDecoder();

      let done = false;
      let reply = '';
      const classNameConfig = 'bg-black/80 py-4 px-2 round-sm';
      while (!done) {
        const { value, done: doneReading } = await render.read();
        done = doneReading;
        reply += decoder.decode(value);
        if (contentSlideAnimation.current) {
          reply = handleCoverComment(reply);
          contentSlideAnimation.current.textContent = reply;

          if (boxChatContentRef.current) {
            reply.length % 10 == 0 &&
              ScroolToBottom(boxChatContentRef.current, 2);
          }
        }
      }
      // const regex = /https?:\/\/[^\s]+/g;
      // const links = [...(reply.match(regex) || [])] || [];

      // console.log(links);

      let html = hljs.highlightAuto(reply).value;
      dispatch(
        handleAddComment({
          id: nanoid(),
          isUser: false,
          comment: html,
          time: getTime(),
          isSee: true,
        })
      );

      if (boxChatContentRef.current) {
        ScroolToBottom(boxChatContentRef.current, 400);

        if (contentSlideAnimation.current) {
          contentSlideAnimation.current.innerHTML = '';
        }
      }
      setIsLoadding(false);
    },
    onError: async () => {
      ToastMessage('Đường truyền không ổn định. Bạn thử lại nhé?').error();
      setIsLoadding(false);
      //add comment chatbox when error
      dispatch(
        handleAddComment({
          id: nanoid(),
          isUser: false,
          comment:
            'Xin lỗi bạn! Có lẽ API Code của tôi đã hết hạn! Bạn có thể bảo Boss của tôi đi gia hạn không? Tôi đang rất cần ạ.',
          time: getTime(),
          isSee: true,
        })
      );
    },
  });
  const [isOpenDisplayTablet, setIsOpenDisplayTable] = useState<boolean>(true);

  return (
    <div
      className={cn(
        "w-full lg:relative  fixed inset-0 z-20 bg-aside bg-[url('/theme/theme1.png')]",
        !isOpenDisplayTablet ? 'hidden_toggle-mobile' : ''
      )}
    >
      <ChatHeader
        handleCloseChatContent={setIsOpenDisplayTable}
        _id="rootbat"
      />

      <section
        ref={boxChatContentRef}
        className="chatting px-2 absolute top-0 left-0 right-0 scroll-smooth overflow-y-auto pt-14 max-h-[calc(100vh-100px)]"
      >
        {listUserComments.length > 0 &&
          listUserComments.map((comment) => (
            <ChatContent {...comment} key={comment.id} />
          ))}

        <div className="whitespace-pre-wrap mt-4">
          <p className="rounded-xl whitespace-pre-wrap px-3">
            <code className="javascript" ref={contentSlideAnimation}></code>
          </p>
        </div>
      </section>
      <ChatInput
        className={!isOpenDisplayTablet ? 'hidden_toggle-mobile' : ''}
        loading={isLoadding}
        mutationQuery={mutation.mutate}
      />
    </div>
  );
};

export default ChattingContainer;
function getTime(): string {
  const datenew = new Date();
  const time =
    datenew.getHours().toString().padStart(2, '0') +
    ':' +
    datenew.getMinutes().toString().padStart(2, '0');
  return time;
}
