"use client"

import { SketchLogoIcon } from '@radix-ui/react-icons';
import { Flex, Text } from '@radix-ui/themes';
import React from 'react';

const LoaderMsg: React.FC = () => {

    return (

        <Flex align="center" className="gap-2 text-muted-foreground px-4">
            <SketchLogoIcon className="animate-spin h-4 w-4" />
            <Text size="2">Typing...</Text>
        </Flex>
    )
}

export default LoaderMsg