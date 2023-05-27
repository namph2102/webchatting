'use client';
import ChattingContainer from '@/components/chatting';
import SideBar from '@/components/sidebar';
import Header from '@/components/header';
import { ChatProvider } from '../components/provider';
import { z } from 'zod';

import Head from 'next/head';
import { createContext, useEffect, useState, Suspense } from 'react';
import axios from 'axios';
import { ToastMessage } from '@/lib/utils';
import { SimpleBackdrop } from '@/components/Ui';
import { IAccount, TFeactData } from '@/components/provider/provider.type';
export const runtime = 'edge';

const account: IAccount = {
  _id: '',
  fullname: '',
  username: '',
  avatar: '/images/avata.jpg',
  accessToken: '',
  refreshToken: '',
  follows: '',
  friends: [],
  rooms: [],
  blocked: false,
  permission: '',
  address: '',
  phone: '',
  email: '',
};
const theme = {
  themColor: '#4EAC6D',
  thmeBg: '/theme/theme1.png',
  darkmode: true,
};
export const AccountContext = createContext({ account, theme });
export default function Home() {
  const [profile, setProfile] = useState<IAccount>(account);

  useEffect(() => {
    fetch('/api/user')
      .then((res) => res.json())
      .then(({ message, status, account }: TFeactData) => {
        if (status == 401) {
          ToastMessage(message).error();
        } else {
          ToastMessage(message).success();
          setProfile(account);
        }
      });
  }, []);

  return (
    <div className="container mx-auto">
      <Head>
        <meta property="og:type" content="website" />
        <meta property="og:locale" content="vi_VN" />
        <meta property="og:type" content="article" />
      </Head>

      <ChatProvider>
        <AccountContext.Provider value={{ account: profile, theme }}>
          <Suspense fallback={<SimpleBackdrop className="bg-black/90" />}>
            <main className="flex w-full min-h-screen">
              <Header />
              <div className="lg:min-w-[300px] min-w-full  py-6 px-2 bg-aside">
                <SideBar />
              </div>
              <ChattingContainer />
            </main>
          </Suspense>
        </AccountContext.Provider>
      </ChatProvider>
    </div>
  );
}
