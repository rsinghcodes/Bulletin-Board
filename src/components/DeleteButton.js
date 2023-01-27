import React from 'react';
import { useMutation } from '@apollo/client';
import { CloseButton } from '@chakra-ui/react';

import { DELETE_NOTE, GET_NOTES_BY_USER } from '../queries/note';

const DeleteButton = ({ contentId }) => {
  const [deleteNote] = useMutation(DELETE_NOTE, {
    update(client, { data }) {
      const { getNotesByUserId } = client.readQuery({
        query: GET_NOTES_BY_USER,
      });

      client.writeQuery({
        query: GET_NOTES_BY_USER,
        data: {
          getNotesByUserId: getNotesByUserId.filter(
            (content) => content.id !== data.deleteNote.id
          ),
        },
      });
    },
    variables: { contentId },
  });

  return <CloseButton size="sm" onClick={deleteNote} />;
};

export default DeleteButton;
