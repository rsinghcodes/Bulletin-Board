import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
  fonts: {
    body: "DM Sans",
    heading: "DM Sans",
  },
  config: {
    useSystemColorMode: true,
  },
  colors: {
    gray: {
      900: "#001833",
    },
  },
});

export default theme;
