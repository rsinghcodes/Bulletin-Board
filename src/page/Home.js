import { useState, useEffect } from 'react';
import { Input, Button, Flex, Box, CloseButton, Text } from '@chakra-ui/react';
import { v4 as uuidv4 } from 'uuid';
import Draggable from 'react-draggable';
import randomColor from 'randomcolor';
// components
import Header from '../components/Header';

function Home() {
  const [content, setContent] = useState('');
  const [items, setItems] = useState(
    JSON.parse(localStorage.getItem('items')) || []
  );
  const [isInvalid, setIsInvalid] = useState(false);

  const newitem = () => {
    if (content.trim() !== '') {
      const newContent = {
        id: uuidv4(),
        content: content,
        color: randomColor({ luminosity: 'light' }),
        defaultPos: { x: 0, y: 20 },
      };
      setItems((items) => [...items, newContent]);
      setContent('');
    } else {
      setIsInvalid(true);
    }
  };

  useEffect(() => {
    localStorage.setItem('items', JSON.stringify(items));
  }, [items]);

  const updatePos = (data, index) => {
    let newArray = [...items];
    newArray[index].defaultPos = { x: data.x, y: data.y };
    setItems(newArray);
  };

  const keyPress = (e) => {
    var code = e.keyCode || e.which;
    if (code === 13) {
      newitem();
    }
  };

  const deleteNote = (id) => {
    setItems(items.filter((item) => item.id !== id));
  };

  return (
    <>
      <Header />
      <Box mt={3}>
        <Flex>
          <Input
            isInvalid={isInvalid}
            errorBorderColor="crimson"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Write something on board"
            mr={3}
            onKeyPress={(e) => keyPress(e)}
          />
          <Button colorScheme="teal" variant="solid" onClick={newitem}>
            Save
          </Button>
        </Flex>
      </Box>
      <Box w="100%" p="2" mt="2" borderWidth="1px" overflow="hidden">
        <Text textAlign="center">
          Adjust the position of the card by dragging.
        </Text>
      </Box>
      {items.map((item, index) => {
        return (
          <Draggable
            key={item.id}
            defaultPosition={item.defaultPos}
            onStop={(e, data) => {
              updatePos(data, index);
            }}
          >
            <Box
              maxW="xs"
              borderWidth="1px"
              borderRadius="sm"
              overflow="hidden"
              p="2"
              bg={item.color}
              color="gray.900"
              style={{ cursor: 'move' }}
            >
              <Flex justify="flex-end">
                <CloseButton size="sm" onClick={(e) => deleteNote(item.id)} />
              </Flex>
              <Flex justify="center">{item.content}</Flex>
            </Box>
          </Draggable>
        );
      })}
    </>
  );
}

export default Home;
