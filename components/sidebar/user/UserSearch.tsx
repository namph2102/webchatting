'use client';
import React, { FC, useState } from 'react';
import Image from 'next/image';
import { BsX } from 'react-icons/bs';
import { BiSearch } from 'react-icons/bi';
import { ToastMessage, cn } from '@/lib/utils';
interface UserSearch {
  avatar: string;
  title: string;
  des: string;
}
const UserSearch: FC<UserSearch> = ({
  title,
  des,
  avatar = '/images/avata.jpg',
}) => {
  const [hideItem, setHideItem] = useState<boolean>(false);
  return (
    <article
      className={cn(
        'item_list-search flex items-center justify-between hover:bg-main/20 py-3 px-1 cursor-pointer',
        hideItem ? 'hidden' : ''
      )}
    >
      <div className="flex gap-2 items-center">
        {/* <Image
          src={avatar || '/images/avata.jpg'}
          className="rounded-full object-cover"
          width="40"
          height="40"
          alt="Avata search"
          
        /> */}
        <button
          type="button"
          className="py-2 px-2 bg-aside-600 hover:bg-main/20 btn_search--bg rounded-full text-center"
        >
          <BiSearch />
        </button>
        <div className="text-sm">
          <p className="font-medium">{title}</p>
          <p className="text-xs mt-1">{des}</p>
        </div>
      </div>
      <button
        onClick={() => {
          ToastMessage('Xóa thành công !').success();
          setHideItem(true);
        }}
        className="hover:bg-white/20 py-1 px-1 rounded-full"
      >
        <BsX className="text-lg" />
      </button>
    </article>
  );
};

export default React.memo(UserSearch);
