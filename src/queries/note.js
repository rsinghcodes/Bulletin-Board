import { gql } from '@apollo/client';

const GET_NOTES_BY_USER = gql`
  query GetNotesByUserId {
    getNotesByUserId {
      id
      color
      content
      createdAt
      defaultPos {
        x
        y
      }
    }
  }
`;

const CREATE_NOTE = gql`
  mutation CreateNote($content: String!, $color: String!, $x: Int!, $y: Int!) {
    createNote(
      noteInput: {
        content: $content
        color: $color
        defaultPos: { x: $x, y: $y }
      }
    ) {
      id
      color
      content
      createdAt
      defaultPos {
        x
        y
      }
    }
  }
`;

const DELETE_NOTE = gql`
  mutation DeleteNote($contentId: ID!) {
    deleteNote(contentId: $contentId) {
      id
      color
      content
      createdAt
      defaultPos {
        x
        y
      }
    }
  }
`;

const UPDATE_BOARD_POSITION = gql`
  mutation UpdateBoardPosition($contentId: ID!, $x: Int!, $y: Int!) {
    updateBoardPosition(contentId: $contentId, defaultPos: { x: $x, y: $y }) {
      id
      color
      content
      createdAt
      defaultPos {
        x
        y
      }
    }
  }
`;

export { GET_NOTES_BY_USER, CREATE_NOTE, DELETE_NOTE, UPDATE_BOARD_POSITION };
