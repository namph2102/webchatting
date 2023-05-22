'use client';
import ChattingContainer from '@/components/chatting';
import SideBar from '@/components/sidebar';
import Header from '@/components/header';
import ChatProvider from './chat/ChatProvider';

export default function Home() {
  return (
    <div className="container mx-auto">
      <ChatProvider>
        <main className="flex w-full min-h-screen">
          <Header />
          <div className="lg:min-w-[300px]  py-6 px-2 bg-aside">
            <SideBar />
          </div>
          <ChattingContainer />
        </main>
      </ChatProvider>
    </div>
  );
}
