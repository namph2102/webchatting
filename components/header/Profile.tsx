import { AccountContext } from '@/app/page';
import { componentsProps } from '@/styles';
import { Tooltip } from '@mui/material';
import Image from 'next/image';
import React, { FC, useContext, useEffect } from 'react';
import { BiCog, BiLock, BiLogOutCircle, BiUserCircle } from 'react-icons/bi';

interface ProfileProps {}
const Profile: FC<ProfileProps> = ({}) => {
  const { account } = useContext(AccountContext);
  return (
    <div
      id="userDropdown"
      className="z-10 absolute  text-white  -top-[250px] lg:left-0  -left-[150px] bg-menu  rounded-lg shadow w-48 "
    >
      <div className="px-4 py-3 text-sm border-b-[1px] border-main/60">
        <div className="capitalize truncate">Tên: {account.fullname}</div>
        <div className="font-medium truncate">
          Tài khoản: {account.username}
        </div>
      </div>
      <ul className="py-2 text-sm " aria-labelledby="avatarButton">
        <li>
          <a
            href="#"
            className="flex justify-between  px-4 py-2 text-sm hover:bg-aside/30"
          >
            Thông tin <BiUserCircle fontSize="1rem" />
          </a>
        </li>
        <li>
          <a
            href="#"
            className="flex justify-between  px-4 py-2 text-sm hover:bg-aside/30"
          >
            Cài đặt <BiCog fontSize="1rem" />
          </a>
        </li>
        <li>
          <a
            href="#"
            className="flex justify-between  px-4 py-2 text-sm hover:bg-aside/30"
          >
            Đổi mật khẩu <BiLock fontSize="1rem" />
          </a>
        </li>
      </ul>
      <div className="py-1 border-t-[1px] border-main/60">
        <a
          href="#"
          className="flex justify-between  px-4 py-2 text-sm hover:bg-aside/30"
        >
          Đăng xuất <BiLogOutCircle fontSize="1rem" />
        </a>
      </div>
    </div>
  );
};

export default Profile;
