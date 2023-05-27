'use client';
import { cn, deFaultIconSize } from '@/lib/utils';
import React, { useContext, useEffect, useState } from 'react';
import { BsMenuUp, BsRobot } from 'react-icons/bs';
import {
  BiUserCircle,
  BiChat,
  BiBookHeart,
  BiPhoneCall,
  BiBookmarks,
  BiCog,
  BiSun,
  BiMoon,
  BiLogOutCircle,
  BiLogInCircle,
  BiLock,
} from 'react-icons/bi';
import Image from 'next/image';

import { nanoid } from 'nanoid';
import { Tooltip } from '@mui/material';
import { componentsProps } from '@/styles';
import Profile from './Profile';
import { MenuItem } from './MenuItem';
import { AccountContext } from '@/app/page';

const listMenu = [
  {
    title: 'ChatBox',
    Icon: BsRobot,
    hiddenMoblie: true,
  },
  {
    title: 'Profile',
    Icon: BiUserCircle,
    hiddenMoblie: true,
  },
  {
    title: 'Chats',
    Icon: BiChat,
  },
  {
    title: 'Contacts',
    Icon: BiBookHeart,
  },
  {
    title: 'Calls',
    Icon: BiPhoneCall,
  },
  {
    title: 'Bookmarks',
    Icon: BiBookmarks,
  },
  {
    title: 'Settings',
    Icon: BiCog,
  },
  {
    title: 'Light Mode',
    Icon: BiSun,
  },
];
const Header = () => {
  const [currentMenu, setCurrentMenu] = useState<String>(listMenu[0].title);
  const [isOpenProfile, setIsOpenProfile] = useState<boolean>(false);
  const { account } = useContext(AccountContext);
  useEffect(() => {
    const handleHideDrowProfile = () => {
      setIsOpenProfile(false);
    };
    isOpenProfile && document.addEventListener('click', handleHideDrowProfile);
    return () => {
      document.removeEventListener('click', handleHideDrowProfile);
    };
  }, [isOpenProfile]);
  return (
    <header
      className={cn(
        'lg:w-[75px] w-full lg:h-screen bg-menu shadow lg:static fixed z-10 left-0 right-0 bottom-0 h-[75px]'
      )}
    >
      <nav>
        <ul className="flex lg:h-screen justify-around  lg:flex-col  h-[75px]  py-6">
          {listMenu.length > 0 &&
            listMenu.map((menu) => (
              <MenuItem
                key={nanoid()}
                title={menu.title}
                Icon={menu.Icon}
                active={currentMenu === menu.title}
                handleClick={setCurrentMenu}
                className={menu?.hiddenMoblie ? 'lg:block hidden' : ''}
              />
            ))}

          <li className="flex justify-center relative">
            <Tooltip
              title={isOpenProfile ? '' : 'Hồ sơ của bạn'}
              placement="top"
              componentsProps={componentsProps}
              arrow
            >
              <a className="cursor-pointer">
                <Image
                  onClick={() => {
                    setIsOpenProfile(!isOpenProfile);
                  }}
                  src={account.avatar}
                  width="30"
                  height="30"
                  alt="Avatar"
                  className="rounded-full object-cover"
                  id="avatarButton"
                  data-dropdown-toggle="userDropdown"
                  data-dropdown-placement="bottom-start"
                />
                {/* Dropdown menu */}
              </a>
            </Tooltip>
            {isOpenProfile && <Profile />}
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default React.memo(Header);
