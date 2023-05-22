import { componentsProps } from '@/styles';
import { Tooltip } from '@mui/material';
import Image from 'next/image';
import React, { FC } from 'react';
import { BiCog, BiLock, BiLogOutCircle, BiUserCircle } from 'react-icons/bi';
interface ProfileProps {}
const Profile: FC<ProfileProps> = ({}) => {
  return (
    <div
      id="userDropdown"
      className="z-10 absolute   -top-[250px] lg:left-0  -left-[150px] bg-menu text-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 dark:divide-gray-600"
    >
      <div className="px-4 py-3 text-sm text-gray-900 dark:text-white">
        <div>Bonnie Green</div>
        <div className="font-medium truncate">name@flowbite.com</div>
      </div>
      <ul
        className="py-2 text-sm text-gray-700 dark:text-gray-200"
        aria-labelledby="avatarButton"
      >
        <li>
          <a
            href="#"
            className="flex justify-between px-4 py-2 text-sm hover:bg-aside/900"
          >
            Thông tin <BiUserCircle fontSize="1rem" />
          </a>
        </li>
        <li>
          <a
            href="#"
            className="flex justify-between px-4 py-2 text-sm hover:bg-aside/900"
          >
            Cài đặt <BiCog fontSize="1rem" />
          </a>
        </li>
        <li>
          <a
            href="#"
            className="flex justify-between px-4 py-2 text-sm hover:bg-aside/900"
          >
            Đổi mật khẩu <BiLock fontSize="1rem" />
          </a>
        </li>
      </ul>
      <div className="py-1">
        <a
          href="#"
          className="flex justify-between px-4 py-2 text-sm hover:bg-aside/900"
        >
          Đăng xuất <BiLogOutCircle fontSize="1rem" />
        </a>
      </div>
    </div>
  );
};

export default Profile;
