'use client';

import React, { createContext, useContext, useState } from 'react';

export interface Message {
    role: 'user' | 'ai';
    content: string;
}

export interface Tab {
    id: string;
    name: string;
    messages: Message[];
}

interface ChatTabsContextType {
    tabs: Tab[];
    selectedTabId: string;
    selectedTab?: Tab;
    setSelectedTabId: (id: string) => void;
    setSelectedTab: (tab: Tab) => void;
    addNewTab: () => void;
    setMessagesForTab: (id: string, messages: Message[]) => void;
    deleteTab: (id: string) => void;
    renameTab: (id: string, newName: string) => void;

}

const ChatTabsContext = createContext<ChatTabsContextType | undefined>(undefined);

export const ChatTabsProvider = ({ children }: { children: React.ReactNode }) => {
    const [tabs, setTabs] = useState<Tab[]>([
        { id: 'tab-1', name: 'Chat 1', messages: [] },
    ]);

    const [selectedTabId, setSelectedTabId] = useState('tab-1');

    const selectedTab = tabs.find((t) => t.id === selectedTabId);

    const addNewTab = () => {
        const newId = `tab-${Date.now()}`;
        const newTab: Tab = { id: newId, name: `Chat ${tabs.length + 1}`, messages: [] };
        setTabs([...tabs, newTab]);
        setSelectedTabId(newId);
    };

    const setSelectedTab = (tab: Tab) => {
        setSelectedTabId(tab.id);
    };

    const setMessagesForTab = (id: string, messages: Message[]) => {
        setTabs((prev) =>
            prev.map((tab) => (tab.id === id ? { ...tab, messages } : tab))
        );
    };


    const deleteTab = (id: string) => {
        setTabs((prevTabs) => {
            const newTabs = prevTabs.filter(tab => tab.id !== id);
            if (id === selectedTabId && newTabs.length > 0) {
                setSelectedTabId(newTabs[0].id);
            }
            return newTabs;
        });
    };

    const renameTab = (id: string, newName: string) => {
        setTabs((prevTabs) =>
            prevTabs.map((tab) =>
                tab.id === id ? { ...tab, name: newName } : tab
            )
        );
    };


    return (
        <ChatTabsContext.Provider
            value={{
                tabs,
                selectedTabId,
                selectedTab,
                setSelectedTabId,
                setSelectedTab,
                addNewTab,
                deleteTab,
                renameTab,
                setMessagesForTab,
            }}
        >
            {children}
        </ChatTabsContext.Provider>
    );
};

export const useChatTabs = () => {
    const context = useContext(ChatTabsContext);
    if (!context) throw new Error('useChatTabs must be used inside ChatTabsProvider');
    return context;
};
