import { useState, useEffect } from "react";
import {
  Container,
  Input,
  Button,
  Flex,
  Box,
  CloseButton,
} from "@chakra-ui/react";
import Header from "./components/Header";
import { v4 as uuidv4 } from "uuid";
import Draggable from "react-draggable";
var randomColor = require("randomcolor");

function App() {
  const [item, setItem] = useState("");
  const [items, setItems] = useState(
    JSON.parse(localStorage.getItem("items")) || []
  );
  const [isInvalid, setIsInvalid] = useState(false);

  const newitem = () => {
    if (item.trim() !== "") {
      const newitem = {
        id: uuidv4(),
        item: item,
        color: randomColor({ luminosity: "light" }),
        defaultPos: { x: 0, y: 20 },
      };
      setItems((items) => [...items, newitem]);
      setItem("");
    } else {
      setIsInvalid(true);
    }
  };

  useEffect(() => {
    localStorage.setItem("items", JSON.stringify(items));
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
      <Container maxW="container.lg">
        <Header />

        <Box mt={3}>
          <Flex>
            <Input
              isInvalid={isInvalid}
              errorBorderColor="crimson"
              value={item}
              onChange={(e) => setItem(e.target.value)}
              placeholder="Write something on board"
              mr={3}
              onKeyPress={(e) => keyPress(e)}
            />
            <Button colorScheme="teal" variant="solid" onClick={newitem}>
              Save
            </Button>
          </Flex>
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
                style={{ cursor: "move" }}
              >
                <Flex justify="flex-end">
                  <CloseButton size="sm" onClick={(e) => deleteNote(item.id)} />
                </Flex>
                <Flex justify="center">{`${item.item}`}</Flex>
              </Box>
            </Draggable>
          );
        })}
      </Container>
    </>
  );
}

export default App;
