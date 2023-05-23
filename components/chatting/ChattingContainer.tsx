'use client';
import React, { useState, useRef, useReducer, useEffect } from 'react';
import { useMutation } from 'react-query';
import ChatInput from './ChatInput';
import ChatHeader from './ChatHeader';
import ChatContent, { ChatContentProps } from './ChatContent';
import { messageType } from './chat.type';
import { nanoid } from 'nanoid';
import { ScroolToBottom, ToastMessage } from '@/lib/utils';
import hljs from 'highlight.js';
import {
  CommentReducer,
  handleAddComment,
  handleCoverComment,
} from './chat.utils';
const initState: ChatContentProps[] = [];

const ChattingContainer = () => {
  const [listUserComments, dispatch] = useReducer(CommentReducer, initState);
  const [isLoadding, setIsLoadding] = useState<boolean>(false);
  const boxChatContentRef = useRef<HTMLElement>(null);
  const contentSlideAnimation = useRef<HTMLDivElement | null>(null);
  const controller = new AbortController();
  const signal = controller.signal;
  useEffect(() => {
    hljs.highlightAll();
  }, []);
  const mutation = useMutation({
    mutationFn: async (message: messageType) => {
      // add comment
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

      while (!done) {
        const { value, done: doneReading } = await render.read();
        done = doneReading;
        reply += decoder.decode(value);
        if (contentSlideAnimation.current) {
          let html = hljs.highlight(reply, {
            language: 'javascript',
          }).value;

          contentSlideAnimation.current.innerHTML = `<pre class="bg-[#444] javascript p-4 rounded-xl whitespace-pre-wrap ">
           <code class="javascript"> ${html}</code>
            </pre>`;
          if (boxChatContentRef.current) {
            reply.length % 10 == 0 &&
              ScroolToBottom(boxChatContentRef.current, 10);
          }
        }
      }

      //add comment chatbox

      dispatch(
        handleAddComment({
          id: nanoid(),
          isUser: false,
          comment: handleCoverComment(reply.trim()),
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
      ToastMessage('Sự cố thật đáng tiếc??').error();
      setIsLoadding(false);
      //add comment chatbox when error
      dispatch(
        handleAddComment({
          id: nanoid(),
          isUser: false,
          comment: 'Xin lỗi bạn! Có lẽ tôi đói rồi bạn cho tôi nghỉ ngơi với!',
          time: getTime(),
          isSee: true,
        })
      );
    },
  });

  return (
    <div className="p-4 w-full lg:relative fixed inset-0 z-20 bg-bg bg-[url('/theme/theme1.png')]">
      <ChatHeader />
      <section
        ref={boxChatContentRef}
        className="chatting px-2  scroll-smooth overflow-y-auto max-h-[calc(100vh-170px)]"
      >
        {listUserComments.length > 0 &&
          listUserComments.map((comment) => (
            <ChatContent {...comment} key={comment.id} />
          ))}
        <ChatInput loading={isLoadding} mutationQuery={mutation.mutate} />
        <div
          className="whitespace-pre-wrap mt-4"
          ref={contentSlideAnimation}
        ></div>
      </section>
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
