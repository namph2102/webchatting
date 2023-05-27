import { cn } from '@/lib/utils';
import { componentsProps } from '@/styles';
import { Tooltip } from '@mui/material';
import Image from 'next/image';
import React, { FC, useEffect, useRef } from 'react';
import { BiCheckDouble } from 'react-icons/bi';
import './chating.scss';
export interface ChatContentProps {
  id: string;
  isUser: boolean;
  comment: string;
  time: string;
  isSee?: boolean;
}
const ChatContent: FC<ChatContentProps> = (props) => {
  useEffect(() => {}, []);
  const codeRef = useRef<HTMLElement>(null);
  const classname =
    'w-[fit-content] rounded-lg font-medium pb-2 px-2 shadow-inner ';
  return (
    <article
      className={cn(
        'flex items-baseline gap-2 mt-3',
        props.isUser ? 'flex-row-reverse' : ''
      )}
    >
      <Image
        src={props.isUser ? '/images/avata.jpg' : '/images/botai.png'}
        alt="avata"
        height={40}
        width={40}
        className="rounded-full object-cover"
      />

      <div className="chat_item-user flex flex-col gap-2">
        <div
          className={cn(
            classname,
            props.isUser ? 'bg-main/30' : 'bg-aside-600'
          )}
        >
          <p className="whitespace-pre-wrap">
            <code
              className="javascript whitespace-pre-wrap w-fit indent-4"
              dangerouslySetInnerHTML={{ __html: props.comment }}
              ref={codeRef}
            ></code>

            {/* <code className="javascript">{props.comment}</code> */}
          </p>

          <small className="flex gap-1 items-end font-semibold text-[0.875em] pl-1 mt-1">
            {props.isSee && (
              <Tooltip
                title="Đã xem"
                arrow
                componentsProps={componentsProps}
                placement="left"
              >
                <span className="cursor-pointer">
                  <BiCheckDouble fill="rgb( 6,214,160)" />
                </span>
              </Tooltip>
            )}
            <span>{props.time}</span>
          </small>
        </div>
      </div>
    </article>
  );
};

export default React.memo(ChatContent);
