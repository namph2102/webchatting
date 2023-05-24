import { cn, deFaultIconSize } from '@/lib/utils';
import React, { useEffect, useRef, useState } from 'react';
import {
  BiChevronLeft,
  BiDotsVerticalRounded,
  BiInfoCircle,
  BiMicrophoneOff,
  BiPhoneCall,
  BiSearch,
  BiTrash,
  BiUser,
  BiVideo,
} from 'react-icons/bi';
import { RiCloseFill } from 'react-icons/ri';
const HeaderNavRight = () => {
  const [isOpenMenuDrop, setIsOpenMenuDrop] = useState<boolean>(false);

  // Setting open or turn of menu
  const searchComentRef = useRef<HTMLInputElement>(null);
  const SearchcontentBox = useRef<HTMLDivElement>(null);
  const [isOpenSearch, setIsOpenMenuSearch] = useState<boolean>(true);

  useEffect(() => {
    const handleTurnOffDropMenuSetting = () => {
      isOpenMenuDrop && setIsOpenMenuDrop(false);
    };
    document.addEventListener('click', handleTurnOffDropMenuSetting);
    return () => {
      document.removeEventListener('click', handleTurnOffDropMenuSetting);
    };
  }, [isOpenMenuDrop]);
  const handleOpenDropSettingMenu = () => {
    setIsOpenMenuDrop(!isOpenMenuDrop);
  };
  const handleToggleSearchComment = () => {
    SearchcontentBox.current?.classList.toggle('hidden');
    setIsOpenMenuSearch(!isOpenSearch);
    if (searchComentRef.current?.value) {
      searchComentRef.current.value = '';
    }
  };
  return (
    <ul className="flex gap-4 sm:text-base text-lg cursor-pointer">
      <li className="relative sm:full ">
        {isOpenSearch ? (
          <BiSearch
            onClick={handleToggleSearchComment}
            fontSize={deFaultIconSize}
          />
        ) : (
          <RiCloseFill
            onClick={handleToggleSearchComment}
            fontSize={deFaultIconSize}
            className="z-10"
          />
        )}

        <div
          ref={SearchcontentBox}
          onClick={handleToggleSearchComment}
          className="fixed   inset-0 sm:z-20 z-[1] hidden  bg-main/20 over-lay"
        >
          <div className="mt-16 w-full   flex  justify-center lg:justify-end">
            <input
              ref={searchComentRef}
              type="text"
              onClick={(e) => e.stopPropagation()}
              className={cn(
                'w-[90%]  sm:w-[360px]  h-10  lg:mr-[200px] text-sm  outline-0 border-[1px] border-white/50  bg-menu py-3 px-2 rounded-lg'
              )}
              placeholder="Tìm kiếm nội dung chat ..."
            />
          </div>
        </div>
      </li>
      <li className="sm:block hidden" title="Call">
        <BiPhoneCall fontSize={deFaultIconSize} />
      </li>
      <li className="sm:block hidden" title="Video">
        <BiVideo fontSize={deFaultIconSize} />
      </li>
      <li className="sm:block hidden" title="Infomation">
        <BiInfoCircle fontSize={deFaultIconSize} />
      </li>
      <li onClick={handleOpenDropSettingMenu} className="relative">
        <BiDotsVerticalRounded fontSize={deFaultIconSize} />
        <ul
          id="dropdown"
          className={cn(
            'absolute top-[calc(100%+6px)] right-0  bg-menu sm:text-sm text-base  py-3 z-10  rounded-lg  w-44 shadow-sm  dark:bg-gray-700',
            isOpenMenuDrop ? '' : 'hidden'
          )}
        >
          <li className="flex gap-2 sm:hidden px-6 py-1  hover:bg-[#525151] font-medium cursor-pointer justify-between">
            <span>View Profile</span> <BiUser fontSize="1rem" />
          </li>
          <li className="flex gap-2 sm:hidden px-6 py-1  hover:bg-[#525151] font-medium cursor-pointer justify-between">
            <span>Audio</span> <BiPhoneCall fontSize="1rem" />
          </li>
          <li className="flex gap-2 sm:hidden px-6 py-1  hover:bg-[#525151] font-medium cursor-pointer justify-between">
            <span>Video</span> <BiVideo fontSize="1rem" />
          </li>

          <li className="flex gap-2 px-6 py-1  hover:bg-[#525151] font-medium cursor-pointer justify-between">
            <span>Muted</span> <BiMicrophoneOff fontSize="1rem" />
          </li>
          <li className="flex gap-2 px-6 py-1  hover:bg-[#525151] font-medium cursor-pointer justify-between">
            <span>Delete</span> <BiTrash fontSize="1rem" />
          </li>
        </ul>
      </li>
    </ul>
  );
};

export default HeaderNavRight;
