'use client';

import { useEffect, useRef, useState } from 'react';
import { Flex, Box, Text } from '@radix-ui/themes';
import { useChatTabs } from '../context/ChatTabContext';
import SearchBar from './SearchBar';
import { SketchLogoIcon, PersonIcon } from '@radix-ui/react-icons';
import LoaderMsg from './LoaderMsg';


export default function ChatLayout() {
    const {
        selectedTab,
        setMessagesForTab,
    } = useChatTabs();

    const [query, setQuery] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const messages = selectedTab?.messages || [];

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    const handleSend = async () => {
        const currentQuery = query.trim();
        if (!currentQuery || !selectedTab) return;

        const newMessages = [...messages, { role: 'user', content: currentQuery }];
        setMessagesForTab(selectedTab.id, newMessages);
        setQuery('');
        setLoading(true); 

        try {
            const res = await fetch('/api/ollama', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ prompt: currentQuery }),
            });

            const data = await res.json();

            const updatedMessages = [
                ...newMessages,
                { role: 'ai', content: data.response || 'Something went wrong...' },
            ];

            setMessagesForTab(selectedTab.id, updatedMessages);
        } catch (err) {
            const errorMessage = [
                ...newMessages,
                { role: 'ai', content: '⚠️ Failed to connect to AI server.' },
            ];

            setMessagesForTab(selectedTab.id, errorMessage);
        } finally {
            setLoading(false);
        }
    };


    return (
        <Flex direction="column" className="relative">
            {/* Message Area */}
            <Box className="overflow-y-auto mt-2 h-[75vh] space-y-8 px-2 scrollbar-thin scrollbar-thumb-gray-400 dark:scrollbar-thumb-zinc-700">
                {messages.length === 0 ? (
                    <Flex justify="center" gap="3" direction="column" align="center" className="h-full">
                        <span>
                            <SketchLogoIcon className="h-10 w-10 text-blue-600" />
                        </span>
                        <Text size="5" className="text-muted-foreground font-medium">
                            HOW CAN I HELP YOU?
                        </Text>
                    </Flex>
                ) : (
                    messages.map((msg, index) => (
                        <Flex
                            key={index}
                            justify={msg.role === 'user' ? 'end' : 'start'}
                            align="start"
                            className="gap-2"
                        >
                            {msg.role === 'ai' && (
                                <SketchLogoIcon color="blue" className="mb-2 mt-1 text-muted-foreground" />
                            )}

                            <Box className="max-w-[75%] px-4 rounded-lg text-sm">
                                <Text>{msg.content}</Text>
                            </Box>

                            {msg.role === 'user' && (
                                <PersonIcon color="gray" className="mb-2 mt-1 text-muted-foreground" />
                            )}
                        </Flex>
                    ))
                )}

                {loading && messages.length > 0 && (
                    <LoaderMsg />
                )}

                <div ref={messagesEndRef} />
            </Box>

            {/* Input Area */}
            <Box className="px-3">
                <SearchBar query={query} setQuery={setQuery} onSend={handleSend} disabled={loading} />
            </Box>
        </Flex>
    );
}
