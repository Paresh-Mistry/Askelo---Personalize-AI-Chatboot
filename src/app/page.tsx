// src/app/page.tsx
'use client';
import { Box } from '@radix-ui/themes';
import SidebarLayout from './components/Sidebar';
import ChatLayout from './components/ChatLayout';

export default function Home() {
  return (
    <SidebarLayout>
      <Box className="md:w-[50%] fixed bottom-3">
        <ChatLayout />
      </Box>
    </SidebarLayout>
  );
}
