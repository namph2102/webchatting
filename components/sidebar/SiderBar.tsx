'use client';
import React, { useEffect, useRef, useState } from 'react';
import { BiSearch } from 'react-icons/bi';
import UserListContainer from './user/UserListContainer';
import { nanoid } from 'nanoid';
import { IListUserComment } from './user/user.type';
import Image from 'next/image';
import SkeletonLayout from './Skeleton';
import { BsX } from 'react-icons/bs';
import UserSearch from './user/UserSearch';
import { Tooltip } from '@mui/material';
import { componentsProps } from '@/styles';
import { Debounced } from '@/lib/utils';
import { useMutation } from 'react-query';

const SiderBar = () => {
  const [listUser, setListUser] = useState<IListUserComment[]>([]);
  const [search, setSearch] = useState<string>('');
  const boxID = {
    _id: 'chatbot',
    active: true,
    avata: '/images/botai.png',
    fullname: 'chatbotai',
  };
  useEffect(() => {
    getData().then((data) => setListUser(data));
  }, []);

  const mutation = useMutation({
    mutationFn(search: string) {
      return fetch('/api/search');
    },
  });

  const getListUserSearch = () => {
    console.log(search);
  };

  return (
    <>
      <section className="pb-4">
        <div className="flex justify-between">
          <h2 className="text-xl font-semibold"> Chats</h2>
          <button className="w-8 h-8 bg-main/20 text-main  hover:bg-main hover:text-[#fff] rounded-sm">
            +
          </button>
        </div>
      </section>
      <section className="mb-6 relative z-10">
        <div className="w-full flex h-[40px] p-2 bg-aside border-[1px]  border-aside-600 rounded-sm shadow-innerrounded-sm">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full  h-full block text-sm  outline-0 border-none  bg-aside"
            placeholder="Tìm kiếm tại đây ..."
          />
          <Tooltip
            title="Tìm kiếm ngay"
            arrow
            placement="top"
            componentsProps={componentsProps}
          >
            <button
              type="button"
              onClick={Debounced(getListUserSearch, 2000)}
              className="w-[20px] hover:text-main/40 h-full text-center"
            >
              <BiSearch />
            </button>
          </Tooltip>
        </div>
        <div className="absolute top-full left-0 right-0 bg-aside drop-shadow-xl">
          {/* show list userSreach */}
          <UserSearch
            title="Hoài Nam"
            des="Bạn bè"
            avatar="/images/avata.jpg"
          />
          <UserSearch
            title="Hoài Nam"
            des="Bạn bè"
            avatar="/images/avata.jpg"
          />
          <UserSearch
            title="Hoài Nam"
            des="Bạn bè"
            avatar="/images/avata.jpg"
          />
          <UserSearch
            title="Hoài Nam"
            des="Bạn bè"
            avatar="/images/avata.jpg"
          />
          <article className=" flex items-center justify-between hover:bg-main/20 py-3 px-1 cursor-pointer">
            <div className="flex gap-2 items-center">
              <button
                type="button"
                className="py-2 px-2 bg-main hover:bg-main/80 btn_search--bg rounded-full text-center"
              >
                <BiSearch />
              </button>
              <p className="text-main text-xs font-bold">Tìm kiếm: {search}</p>
            </div>
          </article>
        </div>
      </section>
      <section className="hover:overflow-y-auto  overflow-hidden ease-linear duration-200 lg:max-h-[calc(100vh-150px)] max-h-[calc(100vh-225px)]">
        {listUser.length <= 0 && (
          <div>
            <SkeletonLayout />
            <SkeletonLayout />
            <SkeletonLayout />
            <SkeletonLayout />
          </div>
        )}
        <div className="px-4">
          {listUser.length > 0 && (
            <UserListContainer title="CHATBOT" listUser={[boxID]} />
          )}
          {listUser.length > 0 && (
            <UserListContainer title="CHATBOX" listUser={listUser} />
          )}
          {listUser.length > 0 && (
            <UserListContainer title="CHATBOX" listUser={listUser} />
          )}
          {listUser.length > 0 && (
            <UserListContainer title="CHATBOX" listUser={listUser} />
          )}
          {listUser.length > 0 && (
            <UserListContainer title="CHATBOX" listUser={listUser} />
          )}
        </div>
      </section>
    </>
  );
};

function getData(): Promise<IListUserComment[]> {
  let listUser: IListUserComment[] = [];
  for (let i = 0; i < 5; i++) {
    listUser.push({
      _id: nanoid(),
      active: Math.random() > 0.5 ? true : false,
      avata: '/images/avata.jpg',
      fullname: nanoid(),
      contentWatting: Math.random() > 0.5 ? 2 : undefined,
    });
  }
  const innerPromise = new Promise<IListUserComment[]>((resolve) => {
    const id = setTimeout(() => {
      resolve(listUser);
      clearTimeout(id);
    }, 2000);
  });
  return innerPromise;
}
export default SiderBar;
