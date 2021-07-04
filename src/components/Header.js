import React from "react";
import { MoonIcon, SunIcon, LinkIcon } from "@chakra-ui/icons";
import {
  useColorMode,
  Flex,
  Spacer,
  Heading,
  Box,
  Link,
  IconButton,
} from "@chakra-ui/react";

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
            icon={colorMode === "light" ? <MoonIcon /> : <SunIcon />}
            onClick={toggleColorMode}
          />
          <Link href="https://github.com/rsinghcodes/" isExternal>
            <IconButton aria-label="Github link" icon={<LinkIcon />} ml={2} />
          </Link>
        </Box>
      </Flex>
    </header>
  );
}

export default Header;
