'use client';

import { Button, Flex } from '@radix-ui/themes';
import { PaperPlaneIcon } from '@radix-ui/react-icons';
import { useState } from 'react';

interface SearchBarProps {
  query: string;
  setQuery: (val: string) => void;
  onSend: () => void;
  disabled: boolean
}

export default function SearchBar({ query, setQuery, onSend, disabled }: SearchBarProps) {

  return (
    <Flex
      align="center"
      gap="2"
      className="
        rounded-md
        px-4 py-2
        mx-auto
        bg-[var(--color-panel)]
        text-[var(--color-text)]
        transition-colors
        border 
        w-full
        focus-within:border-blue-500
        border-[var(--gray-a6)]
        pb-10 pt-3
        relative
      "
    >
      {/* <MagnifyingGlassIcon className="w-4 h-4 text-[var(--gray-10)]" /> */}
      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Send a message..."
        className="
          w-full
          text-sm
          bg-transparent
          text-[var(--color-text)]
          placeholder:text-[var(--gray-20)]
          focus:outline-none
        "
        disabled={disabled}
      />


      <Button variant='ghost' onClick={onSend} disabled={disabled}>
        <PaperPlaneIcon />
      </Button>
    </Flex>
  );
}
