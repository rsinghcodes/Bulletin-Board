import React, { useContext, useState } from 'react';
import {
  Box,
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  Stack,
  useDisclosure,
} from '@chakra-ui/react';
import * as Yup from 'yup';
import toast from 'react-hot-toast';
import { useFormik, Form, FormikProvider } from 'formik';
import { useMutation } from '@apollo/client';

import { AuthContext } from '../context/auth';
import { LOGIN_USER } from '../queries/user';

const Login = () => {
  const context = useContext(AuthContext);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const firstField = React.useRef();
  const [show, setShow] = useState(false);

  const LoginSchema = Yup.object().shape({
    email: Yup.string()
      .email('Email must be a valid email address')
      .required('Email is required'),
    password: Yup.string().required('Password is required'),
  });

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: LoginSchema,
    onSubmit: async () => {
      loginUser(values);
    },
  });

  const { errors, setErrors, touched, values, handleSubmit, getFieldProps } =
    formik;

  const [loginUser, { loading }] = useMutation(LOGIN_USER, {
    update(_, { data: { loginUser: userData } }) {
      context.login(userData);
    },
    onCompleted() {
      onClose();
      toast.success('You have successfully logged in.', {
        duration: 2500,
      });
    },
    onError(err) {
      setErrors(err.graphQLErrors[0].extensions.errors);
    },
    variables: values,
  });

  return (
    <>
      <Button colorScheme="teal" onClick={onOpen} ml={2}>
        Login
      </Button>
      <Drawer
        isOpen={isOpen}
        placement="right"
        initialFocusRef={firstField}
        onClose={onClose}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader borderBottomWidth="1px">Login account</DrawerHeader>
          <DrawerBody>
            <FormikProvider value={formik}>
              <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
                <Stack spacing="24px">
                  <FormControl
                    isInvalid={Boolean(touched.email && errors.email)}
                  >
                    <FormLabel htmlFor="email">Email</FormLabel>
                    <Input
                      ref={firstField}
                      id="email"
                      placeholder="Please enter your email"
                      name="email"
                      type="text"
                      {...getFieldProps('email')}
                    />
                    <FormErrorMessage>
                      {touched.email && errors.email}
                    </FormErrorMessage>
                  </FormControl>
                  <FormControl
                    isInvalid={Boolean(touched.password && errors.password)}
                  >
                    <FormLabel htmlFor="password">Password</FormLabel>
                    <InputGroup size="md">
                      <Input
                        pr="4.5rem"
                        type={show ? 'text' : 'password'}
                        placeholder="Enter password"
                        name="password"
                        {...getFieldProps('password')}
                      />
                      <InputRightElement width="4.5rem">
                        <Button
                          h="1.75rem"
                          size="sm"
                          onClick={() => setShow(!show)}
                        >
                          {show ? 'Hide' : 'Show'}
                        </Button>
                      </InputRightElement>
                    </InputGroup>
                    <FormErrorMessage>
                      {touched.password && errors.password}
                    </FormErrorMessage>
                  </FormControl>
                  <Box justifyContent="flex-end" display="flex">
                    <Button variant="outline" mr={3} onClick={onClose}>
                      Cancel
                    </Button>
                    <Button
                      colorScheme="blue"
                      type="submit"
                      isLoading={loading}
                      loadingText="Loging"
                    >
                      Login
                    </Button>
                  </Box>
                </Stack>
              </Form>
            </FormikProvider>
          </DrawerBody>

          <DrawerFooter borderTopWidth="1px"></DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default Login;
