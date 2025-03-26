import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation Mutation($input: UserInput!) {
  addUser(input: $input) {
    user {
      username
      _id
    }
    token
  }
}
`;

export const ADD_THOUGHT = gql`
  mutation AddThought($input: ThoughtInput!) {
    addThought(input: $input) {
      _id
      thoughtText
      thoughtAuthor
      createdAt
      comments {
        _id
        commentText
      }
    }
  }
`;

export const ADD_COMMENT = gql`
  mutation addComment($thoughtId: ID!, $commentText: String!) {
    addComment(thoughtId: $thoughtId, commentText: $commentText) {
      _id
      thoughtText
      thoughtAuthor
      createdAt
      comments {
        _id
        commentText
        createdAt
      }
    }
  }
`;


export const SAVE_JOB = gql`
  mutation SaveJob($input: JobInput!) {
    saveJob(input: $input) {
      _id
      username
      savedJobs {
        _id  # Use _id, not id
        title
        company {
          display_name
        }
        location {
          display_name
        }
        created
        redirect_url
      }
    }
  }
`;

export const REMOVE_JOB = gql`
  mutation RemoveJob($jobId: ID!) {
    removeJob(jobId: $jobId) {
      _id
      username
      savedJobs {
        _id
        title
        company {
          display_name
        }
        location {
          display_name
        }
        created
        redirect_url
      }
    }
  }
`;