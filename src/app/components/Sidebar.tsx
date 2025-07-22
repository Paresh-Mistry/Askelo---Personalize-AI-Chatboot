// src/app/components/Sidebar.tsx
'use client';

import { useState, useEffect, ReactNode } from 'react';
import { MoonIcon, SunIcon, HamburgerMenuIcon, Cross1Icon } from '@radix-ui/react-icons';
import { useTheme } from 'next-themes';
import { Box, Flex, Text, Button, Separator, TabNav } from '@radix-ui/themes';
import clsx from 'clsx';
import TabHeader from './TabHeader';
import { useChatTabs } from '../context/ChatTabContext';

interface Props {
  children: ReactNode;
}

export default function SidebarLayout({ children }: Props) {
  const [open, setOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

   const {
          tabs,
          selectedTab,
      } = useChatTabs();


  return (
    <Flex className="h-screen transition-colors">
      {/* Sidebar */}
      <Box
        className={clsx(
          'h-full transition-all duration-300 ease-in-out shadow-md bg-panel bg-[var(--color-panel)]',
          open ? 'w-64' : 'w-16'
        )}
      >
        <div className='justify-between items-center flex p-3'>
          <Button variant="surface" onClick={() => setOpen(!open)}>
            {open ? <Cross1Icon /> : <HamburgerMenuIcon />}
          </Button>
          {mounted && open && (
            <Button
              variant="ghost"
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            >
              {theme === 'dark' ? <SunIcon /> : <MoonIcon />}
            </Button>
          )}
        </div>

        <Separator size="4" />

        {/* Nav */}
        <Box
          className={clsx(
            'transition-all duration-300 overflow-hidden',
            open ? 'opacity-100 translate-x-0 p-4' : 'opacity-0 -translate-x-4 p-0'
          )}
        >
          <Flex direction="column" gap="3">

            <TabHeader />

          </Flex>
        </Box>
      </Box>

      <Box className="flex-1 py-4 md:py-6 md:px-3 w-full ">
        <TabNav.Root size={'1'} className='fixed w-full'>
          <span className='text-xl px-2'>{selectedTab?.name}</span>
          <TabNav.Link href="#">About</TabNav.Link>
          
        </TabNav.Root>
        <Box className='md:max-w-3xl mx-auto z-30 overflow-y-auto'>{children}</Box>
      </Box>
    </Flex>
  );
}
