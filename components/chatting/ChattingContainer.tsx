'use client';
import React, { useState, useRef } from 'react';
import { useMutation } from 'react-query';
import ChatInput from './ChatInput';
import ChatHeader from './ChatHeader';
import ChatContent, { ChatContentProps } from './ChatContent';
import { messageType } from './chat.type';
import { nanoid } from 'nanoid';
import { ScroolToBottom, ToastMessage } from '@/lib/utils';

const ChattingContainer = () => {
  const boxChatContentRef = useRef<HTMLElement>(null);
  const contentSlideAnimation = useRef<HTMLDivElement | null>(null);
  const [listUserComments, setListUserComments] = useState<ChatContentProps[]>(
    []
  );

  const mutation = useMutation({
    mutationKey: ['chat'],
    mutationFn: async (message: messageType) => {
      setListUserComments((pre) => [
        ...pre,
        {
          id: nanoid(),
          isUser: true,
          comment: message.text,
          time: getTime(),
          isSee: true,
        },
      ]);

      if (boxChatContentRef.current) {
        ScroolToBottom(boxChatContentRef.current, 100);
      }
      const resposive = await fetch('/api/message', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: [message] }),
      });

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
        const chuck = decoder.decode(value);
        console.log(chuck);

        if (chuck.includes(':')) {
          reply += ':<br/>';
        } else if (
          chuck.includes('.') &&
          reply.at(-1)?.match(/\d/) &&
          !reply.at(-2)
        ) {
          reply = reply.slice(0, -1);
          reply += '<br/>+ ';
        } else reply += chuck;

        if (contentSlideAnimation.current) {
          contentSlideAnimation.current.innerHTML = `<p class="bg-main/30 p-4 rounded-xl mt-2"> ${reply}</p>`;
          if (boxChatContentRef.current) {
            reply.length % 10 == 0 &&
              ScroolToBottom(boxChatContentRef.current, 10);
          }
        }
      }
      setListUserComments((pre) => [
        ...pre,
        {
          id: nanoid(),
          isUser: false,
          comment: reply,
          time: getTime(),
          isSee: true,
        },
      ]);
      if (boxChatContentRef.current) {
        ScroolToBottom(boxChatContentRef.current, 400);

        if (contentSlideAnimation.current) {
          contentSlideAnimation.current.innerHTML = '';
        }
      }
    },
    onError: async () => {
      ToastMessage('Lỗi gì đấy vui lòng liên hệ Admin?').error();
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
        <ChatInput
          loading={mutation.isLoading}
          mutationQuery={mutation.mutate}
        />
        <div ref={contentSlideAnimation}></div>
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
{
  /* chatwit group <div className="flex gap-2 items-center">
<Image
  src="/images/avata.jpg"
  alt="avata"
  height={40}
  width={40}
  className="rounded-full object-cover"
/>
<div>
  <p className="text-base font-semibold">Hoài Nam</p>
  <p className="font-medium text-sm">09:30</p>
</div>
</div>
<div className="px-3 py-2 bg-menu rounded-lg font-medium text-[0.92rem]">
Lorem ipsum dolor sit amet, consectetur adipisicing elit.
Accusantium ut et alias atque harum cupiditate necessitatibus
provident ullam reiciendis autem.
</div> */
}
