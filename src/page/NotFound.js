import React from 'react';
import { Box, Button, Text } from '@chakra-ui/react';
import { AiOutlineHome } from 'react-icons/ai';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      flexDirection="column"
      minH="100vh"
    >
      <Text fontSize="5xl">404</Text>
      <Text fontSize="2xl">
        The page you were looking for does not exist.
      </Text>{' '}
      <Button
        leftIcon={<AiOutlineHome size="1.3rem" />}
        variant="solid"
        mt={4}
        as={Link}
        to="/"
      >
        Back to Home
      </Button>
    </Box>
  );
};

export default NotFound;
