'use client';
import ChattingContainer from '@/components/chatting';
import SideBar from '@/components/sidebar';
import Header from '@/components/header';
import ChatProvider from './chat/ChatProvider';

import Head from 'next/head';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Zecky - ứng dụng chatting',
  description: 'Hãy cùng khám phá ứng dụng Zecky tuyệt vời này !',
};
export const dynamic = 'static';
export default function Home() {
  return (
    <div className="container mx-auto">
      <Head>
        <meta property="og:type" content="website" />
        <meta property="og:locale" content="vi_VN" />
        <meta property="og:type" content="article" />
        <meta
          name="description"
          content="Hãy cùng khám phá ứng dụng Zecky tuyệt vời này !"
        />
        <meta http-equiv="Content-Type" content="text/html;charset=UTF-8" />
        <meta
          name="keywords"
          content="zecky chatting,zecky đăng nhập,zecky đăng ký, webchat zecky,zecky vietname, ứng dụng chat"
        />
      </Head>

      <ChatProvider>
        <main className="flex w-full min-h-screen">
          <Header />
          <div className="lg:min-w-[300px] min-w-full  py-6 px-2 bg-aside">
            <SideBar />
          </div>
          <ChattingContainer />
        </main>
      </ChatProvider>
    </div>
  );
}
