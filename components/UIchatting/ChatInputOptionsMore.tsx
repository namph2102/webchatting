// import Swiper core and required modules
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper';

import { Swiper, SwiperSlide } from 'swiper/react';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

import { cn, deFaultIconSize } from '@/lib/utils';
import { componentsProps } from '@/styles';
import { Tooltip } from '@mui/material';
import React, { FC, useEffect, useState } from 'react';
import {
  BiCamera,
  BiCurrentLocation,
  BiDotsHorizontalRounded,
  BiHeadphone,
  BiImages,
  BiLinkAlt,
  BiUser,
} from 'react-icons/bi';
const listSwipper: { id: number; title: string; Icon: IconType }[] = [
  {
    id: 1,
    title: 'File đính kèm',
    Icon: BiLinkAlt,
  },
  {
    id: 2,
    title: 'Camara',
    Icon: BiCamera,
  },
  {
    id: 3,
    title: 'Ảnh',
    Icon: BiImages,
  },
  {
    id: 4,
    title: 'Ghi Âm',
    Icon: BiHeadphone,
  },
  {
    id: 5,
    title: 'Tọa Độ',
    Icon: BiCurrentLocation,
  },
  {
    id: 6,
    title: 'Tài khoản',
    Icon: BiUser,
  },
];
import ModalStatus from '../Ui/ModalStatus';
import { IconType } from 'react-icons/lib';

interface ChatInputOptionsMoreProps {}
const ChatInputOptionsMore: FC<ChatInputOptionsMoreProps> = () => {
  const [iseOpenMenu, setIsOpenMenu] = useState<boolean>(false);
  const [isPageInSwiper, setPageinTWipper] = useState<number>(6);
  useEffect(() => {
    if (typeof window !== 'undefined') {
      setPageinTWipper(window.innerWidth > 990 ? 6 : 3);
    }
  }, []);
  return (
    <>
      <div className="relative">
        <Tooltip
          title="More"
          componentsProps={componentsProps}
          arrow
          placement="top"
        >
          <button>
            <BiDotsHorizontalRounded
              onClick={() => {
                setIsOpenMenu(!iseOpenMenu);
              }}
              fontSize={deFaultIconSize}
            />
          </button>
        </Tooltip>
      </div>
      <section
        className={cn(
          'absolute bottom-24 left-0 right-0 w-full  bg-main/20 px-10 py-3',
          iseOpenMenu ? '' : 'hidden'
        )}
      >
        <Swiper
          // install Swiper modules
          modules={[Navigation, Pagination, Scrollbar, A11y]}
          spaceBetween={50}
          slidesPerView={isPageInSwiper}
          autoplay
          onSlideChange={() => console.log('slide change')}
        >
          {listSwipper.map((icon) => {
            const IconJSX = icon.Icon;
            return (
              <SwiperSlide key={icon.id}>
                <div className="flex flex-col justify-center items-center gap-y-2">
                  <button className="bg-main/10  rounded-full w-10 h-10 flex justify-center items-center">
                    <IconJSX className="text-main" fontSize={deFaultIconSize} />
                  </button>
                  <p>{icon.title}</p>
                </div>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </section>
    </>
  );
};

export default ChatInputOptionsMore;
