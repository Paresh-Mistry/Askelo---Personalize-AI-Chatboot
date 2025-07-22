// src/app/layout.tsx
import '@radix-ui/themes/styles.css';
import './globals.css';
import { ThemeProvider } from 'next-themes';
import { Theme } from '@radix-ui/themes';
import { Inter } from 'next/font/google';
import { ChatTabsProvider } from './context/ChatTabContext';

const inter = Inter({ subsets: ['cyrillic'] });

export const metadata = {
  title: 'Askelo | Chat',
  description: 'Sidebar layout using Radix and Tailwind',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <Theme accentColor="blue" grayColor="slate" radius="medium">
            <ChatTabsProvider>
              {children}
            </ChatTabsProvider>
          </Theme>
        </ThemeProvider>
      </body>
    </html>
  );
}
