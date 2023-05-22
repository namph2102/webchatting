import './globals.css';

export const metadata = {
  title: 'Zolo',
  description: 'Zalo',
};
import { Toaster } from 'react-hot-toast';
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body suppressHydrationWarning={true} className="bg-bg text-white ">
        {children}
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
