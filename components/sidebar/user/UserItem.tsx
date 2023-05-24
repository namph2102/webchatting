'use client';
import React, { FC } from 'react';
import Image from 'next/image';
import { IUserItem } from './user.type';
import { cn } from '@/lib/utils';

const UserItem: FC<{ user: IUserItem }> = ({ user }) => {
  return (
    <div className="flex justify-between mb-2 items-center ">
      <div className="flex gap-5 items-center">
        <div className="relative ">
          <Image
            src={user.avata}
            alt={user.avata}
            height={30}
            width={30}
            className="rounded-full object-cover"
          />
          <div
            className={cn(
              'absolute bottom-0 left-7  w-2.5 h-2.5  border-white border-[1px]  rounded-full',
              user.active ? ' bg-status-online' : 'hidden'
            )}
          ></div>
        </div>
        <p className="max-w-[130px] capitalize text-white text-sm  font-medium whitespace-nowrap overflow-hidden text-ellipsis">
          {user.fullname}
        </p>
      </div>
      {user.contentWatting && (
        <span className="inline-block py-0.5 bg-menu px-1 text-sm">
          {user.contentWatting}
        </span>
      )}
    </div>
  );
};

export default UserItem;
