'use client';
import { cn, deFaultIconSize } from '@/lib/utils';
import Image from 'next/image';
import React, { FC, useState } from 'react';
import {
  BiDotsVerticalRounded,
  BiInfoCircle,
  BiPhoneCall,
  BiSearch,
  BiVideo,
} from 'react-icons/bi';
interface ChatHeaderProps {}
const ChatHeader: FC<ChatHeaderProps> = ({}) => {
  const [active, setActive] = useState<boolean>(true);
  return (
    <section>
      <div className="flex justify-between mb-2 items-center w-full">
        <div className="flex gap-5 items-center">
          <div className="relative ">
            <Image
              src="/images/avata.jpg"
              alt="avata"
              height={40}
              width={40}
              className="rounded-full object-cover"
            />
            <div
              className={cn(
                'absolute bottom-0 left-7  w-2.5 h-2.5  border-white border-[1px]  rounded-full',
                active ? ' bg-status-online' : 'bg-colors-red-600'
              )}
            ></div>
          </div>
          <div>
            <h3 className=" capitalize text-lg font-semibold">ChatBox</h3>
            <p className="text-[12px]">{active ? 'Active' : 'off'}</p>
          </div>
        </div>
        <div>
          <ul className="flex gap-4">
            <li>
              <BiSearch fontSize={deFaultIconSize} />
            </li>
            <li>
              <BiPhoneCall fontSize={deFaultIconSize} />
            </li>
            <li>
              <BiVideo fontSize={deFaultIconSize} />
            </li>
            <li>
              <BiInfoCircle fontSize={deFaultIconSize} />
            </li>
            <li>
              <BiDotsVerticalRounded fontSize={deFaultIconSize} />
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
};

export default ChatHeader;
