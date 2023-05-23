import { cn } from '@/lib/utils';
import { componentsProps } from '@/styles';
import { Tooltip } from '@mui/material';
import Image from 'next/image';
import React, { FC, useEffect } from 'react';
import { BiCheckDouble } from 'react-icons/bi';
import hljs from 'highlight.js';
export interface ChatContentProps {
  id: string;
  isUser: boolean;
  comment: string;
  time: string;
  isSee?: boolean;
}
const ChatContent: FC<ChatContentProps> = (props) => {
  useEffect(() => {
    hljs.highlightAll();
  }, []);
  const classname = 'w-[fit-content] rounded-lg font-medium pb-2';
  return (
    <article
      className={cn(
        'flex items-baseline gap-2 mt-3',
        props.isUser ? 'flex-row-reverse' : ''
      )}
    >
      <Image
        src="/images/avata.jpg"
        alt="avata"
        height={40}
        width={40}
        className="rounded-full object-cover"
      />

      <div className="chat_item-user flex flex-col gap-2">
        <div className={cn(classname, props.isUser ? 'bg-main/20' : 'bg-menu')}>
          <pre className="whitespace-pre-wrap ">
            <code
              dangerouslySetInnerHTML={{ __html: props.comment }}
              className="javascript"
            />
          </pre>

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
