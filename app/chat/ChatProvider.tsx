import React, { ReactNode, FC } from 'react';
import { QueryClientProvider, QueryClient } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
interface ChatProviderProps {
  children: ReactNode;
}
const ChatProvider: FC<ChatProviderProps> = ({ children }) => {
  const ChatClient = new QueryClient();
  return (
    <QueryClientProvider client={ChatClient}>
      {children}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};

export default ChatProvider;
