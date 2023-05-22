'use client';
import React, { useEffect, useState } from 'react';
import { BiSearch } from 'react-icons/bi';
import UserListContainer from './user/UserListContainer';
import { nanoid } from 'nanoid';
import { IListUserComment } from './user/user.type';
import UserItem from './user/UserItem';
import SkeletonLayout from './Skeleton';

const SiderBar = () => {
  const [listUser, setListUser] = useState<IListUserComment[]>([]);
  useEffect(() => {
    getData().then((data) => setListUser(data));
  }, []);
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
      <form className="mb-6">
        <div className="w-full flex h-[40px] p-2  bg-menu rounded-sm">
          <input
            type="text"
            className="w-full  h-full block text-sm  outline-0 border-none  bg-menu "
            placeholder="Tìm kiếm tại đây ..."
          />
          <button className="w-[20px] h-full text-center">
            <BiSearch />
          </button>
        </div>
      </form>
      <section className="hover:overflow-y-auto  overflow-hidden ease-linear duration-200 lg:max-h-[calc(100vh-150px)] max-h-[calc(100vh-225px)]">
        {listUser.length <= 0 && (
          <div>
            <SkeletonLayout />
            <SkeletonLayout />
            <SkeletonLayout />
          </div>
        )}
        <div className="px-4">
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
      id: i.toString(),
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
