'use client';

import { TrashIcon, Pencil1Icon } from '@radix-ui/react-icons';
import { useChatTabs } from '../context/ChatTabContext';
import { Button } from '@radix-ui/themes';

export default function TabHeader() {
  const { tabs, selectedTabId, renameTab, deleteTab, setSelectedTabId, addNewTab } = useChatTabs();

  return (
    <div className="flex flex-col gap-2 p-2 bg-muted h-full overflow-auto">
      <Button onClick={addNewTab} className="mb-2 w-full">
        + New Tab
      </Button>

      {tabs.map((tab) => (
        <div
          key={tab.id}
          className="flex border border-blue-400 rounded items-center px-4 justify-between w-full group"
        >
          <button
            onClick={() => setSelectedTabId(tab.id)}
            className={`flex-1 w-3/4 truncate justify-start text-left px-3 py-1 rounded `}
          >
            {tab.name}
          </button>

          <div className="flex w-1/4 justify-center gap-1 ml-2">
            <Button
              size="1"
              variant="soft"
              title="Rename chat"
              onClick={() => {
                const newName = prompt('Rename chat:', tab.name);
                if (newName?.trim()) renameTab(tab.id, newName.trim());
              }}
              className="opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <Pencil1Icon />
            </Button>

            <Button
              size="1"
              variant="soft"
              title="Delete chat"
              onClick={() => {
                const confirmed = confirm('Delete this chat?');
                if (confirmed) deleteTab(tab.id);
              }}
              className="opacity-0 group-hover:opacity-100 transition-opacity text-red-500"
            >
              <TrashIcon />
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
}
