'use client';
import './globals.css';

import { Toaster } from 'react-hot-toast';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body suppressHydrationWarning={true} className="bg-bg text-white ">
        <div className="main"> {children}</div>

        <Toaster
          position="top-right"
          reverseOrder={false}
          gutter={8}
          containerClassName=""
          containerStyle={{}}
          toastOptions={{
            // Define default options
            className: '',
            duration: 2000,
            style: {
              background: '#363636',
              color: '#fff',
            },

            success: {
              duration: 3000,
            },
          }}
        />
      </body>
    </html>
  );
}
