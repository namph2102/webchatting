'use client';
import React, { FC, useRef, useState, useEffect } from 'react';

import {
  BiDotsHorizontalRounded,
  BiLoaderCircle,
  BiMicrophone,
  BiSend,
  BiSmile,
} from 'react-icons/bi';
import { ToastMessage, cn, deFaultIconSize } from '@/lib/utils';
import { Tooltip } from '@mui/material';
import { componentsProps } from '@/styles';
import data from '@emoji-mart/data';
import Picker from '@emoji-mart/react';
import { nanoid } from 'nanoid';
import { messageType } from './chat.type';
import VoiceSpeed from '../voices';
interface ChatInputProps {
  mutationQuery: (message: messageType) => void;
  loading: boolean;
}

const ChatInput: FC<ChatInputProps> = ({ mutationQuery, loading }) => {
  const [isOpenEmoji, setIsOpenEmoji] = useState<boolean>(false);
  const chattingRef = useRef<HTMLInputElement>(null);

  const handdleSelect = (emo: { native: string }) => {
    setIsOpenEmoji(false);
    if (chattingRef.current) {
      chattingRef.current.value += emo.native;
    }
  };
  const handleSubmitMessage = () => {
    if (chattingRef.current) {
      const messages: messageType = {
        isUserMessage: true,
        id: nanoid(),
        text: chattingRef.current.value.trim(),
      };
      // add message to api
      if (!chattingRef.current.value) {
        return;
      }
      mutationQuery(messages);
      chattingRef.current.value = '';
    }
  };
  useEffect(() => {
    const handleChattingEnter = (e: KeyboardEvent) => {
      if (e.key === 'Enter') {
        handleSubmitMessage();
      }
    };
    document.addEventListener('keydown', handleChattingEnter);
    return () => {
      document.removeEventListener('keydown', handleChattingEnter);
    };
  }, []);
  return (
    <section className="absolute h-24 bottom-0 left-0 right-0 px-4 pt-1 pb-4 border-t-[1px] border-colors-slate-600">
      <div className="flex justify-between gap-4 items-center h-full">
        <div className="min-w-[80px] flex justify-around items-center">
          <Tooltip
            title="More"
            componentsProps={componentsProps}
            arrow
            placement="top"
          >
            <button>
              <BiDotsHorizontalRounded fontSize={deFaultIconSize} />
            </button>
          </Tooltip>
          <Tooltip
            title="Emoji"
            componentsProps={componentsProps}
            arrow
            placement="top"
          >
            <button onClick={(e) => setIsOpenEmoji(!isOpenEmoji)}>
              <BiSmile fontSize={deFaultIconSize} />
            </button>
          </Tooltip>
        </div>

        <div className="w-full  flex-1 h-[50px] p-2  bg-menu rounded-sm">
          <input
            ref={chattingRef}
            type="text"
            className="w-full  h-full block text-sm  outline-0 border-none  bg-menu flex-1 rounded-lg"
            placeholder="Bạn muốn nhắn gì? ..."
          />
        </div>

        <div className='min-w-[100px] flex justify-around items-center"'>
          <Tooltip
            title="Vioces"
            componentsProps={componentsProps}
            arrow
            placement="top"
          >
            <button>
              <BiMicrophone fontSize={deFaultIconSize} />
            </button>
          </Tooltip>

          <button
            onClick={(e) => {
              if (loading) {
                ToastMessage('Vui lòng chời trong ít lát ...').error();
                return;
              }
              handleSubmitMessage();
            }}
            className="bg-main hover:bg-main/80 py-2.5 px-3 rounded-xl"
          >
            {loading ? (
              <BiLoaderCircle
                className="animate-spin"
                fontSize={deFaultIconSize}
              />
            ) : (
              <BiSend fontSize={deFaultIconSize} />
            )}
          </button>
        </div>
      </div>
      <div
        onClick={(e) => e.stopPropagation()}
        className={cn(
          'absolute bottom-[80px]',
          isOpenEmoji ? 'block' : 'hidden'
        )}
      >
        <Picker
          data={data}
          previewPossition="none"
          onEmojiSelect={handdleSelect}
        />
      </div>
      <VoiceSpeed />
    </section>
  );
};

export default React.memo(ChatInput);
