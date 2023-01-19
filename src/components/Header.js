import React from 'react';
import { MoonIcon, SunIcon, LinkIcon } from '@chakra-ui/icons';
import {
  useColorMode,
  Flex,
  Spacer,
  Heading,
  Box,
  IconButton,
} from '@chakra-ui/react';
import Login from './Login';
import Register from './Register';

function Header() {
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <header>
      <Flex mt={3}>
        <Box pt="2">
          <Heading size="lg">Bulletin Board</Heading>
        </Box>
        <Spacer />
        <Box>
          <IconButton
            aria-label="Toggle dark or light mode"
            icon={colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
            onClick={toggleColorMode}
          />
          <Login />
          <Register />
        </Box>
      </Flex>
    </header>
  );
}

export default Header;
