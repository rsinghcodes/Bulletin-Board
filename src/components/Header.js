import React, { useContext } from 'react';
import { MoonIcon, SunIcon } from '@chakra-ui/icons';
import { FiLogOut } from 'react-icons/fi';
import { BsPerson } from 'react-icons/bs';
import {
  useColorMode,
  Flex,
  Spacer,
  Heading,
  Box,
  IconButton,
  Menu,
  MenuList,
  MenuItem,
  MenuButton,
  MenuDivider,
} from '@chakra-ui/react';

import Login from './Login';
import Register from './Register';
import { AuthContext } from '../context/auth';

function Header() {
  const { colorMode, toggleColorMode } = useColorMode();
  const { user, logout } = useContext(AuthContext);

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
          {user ? (
            <Menu>
              <MenuButton
                as={IconButton}
                aria-label="Options"
                icon={<BsPerson />}
                variant="outline"
                ml={2}
              />
              <MenuList>
                <MenuItem>{user.fullname}</MenuItem>
                <MenuDivider />
                <MenuItem icon={<FiLogOut />} onClick={logout}>
                  Log Out
                </MenuItem>
              </MenuList>
            </Menu>
          ) : (
            <>
              <Login />
              <Register />
            </>
          )}
        </Box>
      </Flex>
    </header>
  );
}

export default Header;
