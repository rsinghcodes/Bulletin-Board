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
import { REGISTER_USER } from '../queries/user';

const Register = () => {
  const context = useContext(AuthContext);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const firstField = React.useRef();
  const [show, setShow] = useState(false);

  const RegisterSchema = Yup.object().shape({
    fullname: Yup.string()
      .min(2, 'Fullname is too Short!')
      .max(50, 'Fullname is too Long!')
      .required('Fullname is required'),
    email: Yup.string()
      .email('Email must be a valid email address')
      .required('Email is required'),
    password: Yup.string()
      .min(6, 'Password must be at least 6 characters')
      .max(30, 'Password is too Long!')
      .required('Password is required'),
    repeat_password: Yup.string()
      .min(6, 'Password must be at least 6 characters')
      .max(30, 'Password is too Long!')
      .required('Confirm password field is required'),
  });

  const formik = useFormik({
    initialValues: {
      fullname: '',
      email: '',
      password: '',
      repeat_password: '',
    },
    validationSchema: RegisterSchema,
    onSubmit: async () => {
      createUser(values);
    },
  });

  const { errors, setErrors, touched, values, handleSubmit, getFieldProps } =
    formik;

  const [createUser, { loading }] = useMutation(REGISTER_USER, {
    update(_, { data: { createUser } }) {
      context.login(createUser);
    },
    onCompleted() {
      onClose();
      toast.success('You have successfully registered.', {
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
        Register
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
          <DrawerHeader borderBottomWidth="1px">
            Create a new account
          </DrawerHeader>
          <DrawerBody>
            <FormikProvider value={formik}>
              <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
                <Stack spacing="24px">
                  <FormControl
                    isInvalid={Boolean(touched.fullname && errors.fullname)}
                  >
                    <FormLabel htmlFor="fullname">Name</FormLabel>
                    <Input
                      ref={firstField}
                      id="fullname"
                      name="fullname"
                      type="text"
                      placeholder="Please enter your name"
                      {...getFieldProps('fullname')}
                    />
                    <FormErrorMessage>
                      {touched.fullname && errors.fullname}
                    </FormErrorMessage>
                  </FormControl>
                  <FormControl
                    isInvalid={Boolean(touched.email && errors.email)}
                  >
                    <FormLabel htmlFor="email">Email</FormLabel>
                    <Input
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
                  <FormControl
                    isInvalid={Boolean(
                      touched.repeat_password && errors.repeat_password
                    )}
                  >
                    <FormLabel htmlFor="repeat_password">
                      Confirm Password
                    </FormLabel>
                    <InputGroup size="md">
                      <Input
                        id="repeat_password"
                        pr="4.5rem"
                        type={show ? 'text' : 'password'}
                        placeholder="Re-Enter password"
                        name="repeat_password"
                        {...getFieldProps('repeat_password')}
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
                      {touched.repeat_password && errors.repeat_password}
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
                      loadingText="Registering"
                    >
                      Register
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

export default Register;
