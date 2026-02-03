import React from 'react';
import { IconButton, useColorMode, Tooltip } from '@chakra-ui/react';
import { MdLightMode, MdDarkMode } from 'react-icons/md';
import { motion } from 'framer-motion';

const MotionIconButton = motion(IconButton);

const ColorModeToggle = () => {
    const { colorMode, toggleColorMode } = useColorMode();

    return (
        <Tooltip label={`Switch to ${colorMode === 'dark' ? 'light' : 'dark'} mode`}>
            <MotionIconButton
                aria-label="Toggle color mode"
                icon={colorMode === 'dark' ? <MdLightMode /> : <MdDarkMode />}
                onClick={toggleColorMode}
                size="md"
                variant="ghost"
                color={colorMode === 'dark' ? '#f5f5f7' : '#1d1d1f'}
                _hover={{
                    bg: colorMode === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.05)',
                }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.2 }}
            />
        </Tooltip>
    );
};

export default ColorModeToggle;
