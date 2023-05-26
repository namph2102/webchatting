'use client';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import React, { FC, HTMLAttributes, useEffect, useRef, useState } from 'react';
import { BiChevronLeft } from 'react-icons/bi';
import HeaderNavRight from './HeaderNavRight';
// extends HTMLAttributes<HTMLDivElement>
interface ChatHeaderProps {
  _id: string;
  handleCloseChatContent: (value: any) => void;
}
const ChatHeader: FC<ChatHeaderProps> = ({ _id, handleCloseChatContent }) => {
  const [active, setActive] = useState<boolean>(true);

  return (
    <section className=" px-4 py-2 min-h-[60px] flex items-center  border-main/10 border-b-[2px]  shadow relative z-20 top-1">
      <div className="bg-aside/30 backdrop-blur-sm  absolute inset-0"></div>
      <div className="flex opacity-7 absolute top-0 left-0 px-4 py-auto right-0 z-10 justify-between items-center w-full">
        <div className="flex sm:gap-5 items-center gap-2">
          <button
            onClick={() => handleCloseChatContent((prev: boolean) => !prev)}
            className="px-1.5 lg:hidden"
          >
            <BiChevronLeft fontSize="1.5rem" />
          </button>
          <div className="relative ">
            <Image
              src="/images/botai.png"
              alt="avata"
              height={40}
              width={40}
              className="rounded-full object-cover"
            />
            <div
              className={cn(
                'absolute bottom-0 left-7  w-3 h-3  border-white border-[1px]  rounded-full'
              )}
            >
              <span
                className={cn(
                  'animate-ping absolute -left-[2px] -top-[2px] w-3 h-3  inline-flex rounded-full opacity-50',
                  active ? ' bg-status-online' : 'bg-red-600'
                )}
              ></span>
              <span
                className={cn(
                  'absolute inline-flex rounded-full w-2.5 h-2.5',
                  active ? ' bg-status-online' : 'bg-red-600'
                )}
              ></span>
            </div>
          </div>
          <div>
            <h3 className=" capitalize text-lg font-semibold">ChatBox</h3>
            <p className="text-[12px]">{active ? 'Active' : 'off'}</p>
          </div>
        </div>

        <div>
          <HeaderNavRight />
        </div>
      </div>
    </section>
  );
};

export default React.memo(ChatHeader);
