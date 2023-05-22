"use client";
import React, { FC } from "react";
import { IListUserComment } from "./user.type";
import UserItem from "./UserItem";

type UserListProps = {
  title: string;
  listUser: IListUserComment[];
};
const UserListContainer: FC<UserListProps> = ({ title, listUser }) => {
  return (
    <div>
      <h3 className="my-4  font-bold text-[10px] text-white">{title}</h3>
      {listUser.length > 0 &&
        listUser.map((user) => <UserItem key={user.id} user={user} />)}
    </div>
  );
};

export default UserListContainer;
