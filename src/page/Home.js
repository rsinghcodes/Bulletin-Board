import * as Yup from 'yup';
import { useEffect, useContext } from 'react';
import {
  Input,
  Button,
  Flex,
  Box,
  FormControl,
  FormErrorMessage,
  Text,
} from '@chakra-ui/react';
import Draggable from 'react-draggable';
import randomColor from 'randomcolor';
import { useLazyQuery, useMutation } from '@apollo/client';
import { useFormik, Form, FormikProvider } from 'formik';

import { AuthContext } from '../context/auth';
import { CREATE_NOTE, GET_NOTES_BY_USER } from '../queries/note';
import DeleteButton from '../components/DeleteButton';

const Home = () => {
  const { user } = useContext(AuthContext);
  const [getNotesByUserId, { loading, data }] = useLazyQuery(GET_NOTES_BY_USER);

  const formik = useFormik({
    initialValues: {
      content: '',
      color: '',
      x: 0,
      y: 20,
    },
    validationSchema: Yup.object().shape({
      content: Yup.string().required('Content is required'),
    }),
    onSubmit: async () => {
      createNote({
        ...values,
        ...(values.color = randomColor({ luminosity: 'light' })),
      });
    },
  });

  const { errors, setErrors, touched, values, handleSubmit, getFieldProps } =
    formik;

  const [createNote] = useMutation(CREATE_NOTE, {
    update(client, { data }) {
      const { getNotesByUserId } = client.readQuery({
        query: GET_NOTES_BY_USER,
      });

      client.writeQuery({
        query: GET_NOTES_BY_USER,
        data: {
          getNotesByUserId: [...getNotesByUserId, data.createNote],
        },
      });
    },
    onError(err) {
      setErrors(err.graphQLErrors[0].extensions.errors);
    },
    variables: values,
  });

  useEffect(() => {
    getNotesByUserId();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  return (
    <>
      <Box mt={3}>
        <FormikProvider value={formik}>
          <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
            <Flex>
              <FormControl
                isInvalid={Boolean(touched.content && errors.content)}
              >
                <Input
                  name="content"
                  errorBorderColor="crimson"
                  {...getFieldProps('content')}
                  placeholder="Write something on board"
                  mr={3}
                />
                <FormErrorMessage>
                  {touched.content && errors.content}
                </FormErrorMessage>
              </FormControl>
              <Button colorScheme="teal" variant="solid" type="submit">
                Save
              </Button>
            </Flex>
          </Form>
        </FormikProvider>
      </Box>
      {loading && <Text>Loading boards...</Text>}
      {data?.getNotesByUserId.map((item) => {
        return (
          <Draggable
            key={item.id}
            defaultPosition={item.defaultPos}
            // onStop={(e, data) => {
            //   updatePos(data, index);
            // }}
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
                <DeleteButton contentId={item.id} />
              </Flex>
              <Flex justify="center">{`${item.content}`}</Flex>
            </Box>
          </Draggable>
        );
      })}
    </>
  );
};

export default Home;
