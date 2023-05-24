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

  console.log('lấy id khách: ', _id);
  return (
    <section>
      <div className="flex justify-between mb-2 items-center w-full">
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
                'absolute bottom-0 left-7  w-2.5 h-2.5  border-white border-[1px]  rounded-full',
                active ? ' bg-status-online' : 'bg-red-600'
              )}
            ></div>
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
