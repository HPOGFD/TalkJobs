const typeDefs = `
  type User {
    _id: ID
    username: String
    email: String
    password: String
    thoughts: [Thought]!
    savedJobs: [Job]
  }

type Job {
  _id: ID
  title: String
  company: Company
  location: Location
  created: String
  redirect_url: String
}

type Company {
  display_name: String
}

type Location {
  display_name: String
}


  type Thought {
    _id: ID
    thoughtText: String
    thoughtAuthor: String
    createdAt: String
    comments: [Comment]!
  }

  type Comment {
    _id: ID
    commentText: String
    commentAuthor: String
    createdAt: String
    parentType: String # to distinguish between job and thought comments
    parentId: ID
  }

  input ThoughtInput {
    thoughtText: String!
    thoughtAuthor: String!
  }

  input UserInput {
    username: String!
    email: String!
    password: String!
  }

input JobInput {
  title: String!
  company: CompanyInput!
  location: LocationInput!
  created: String
  redirect_url: String!
}
  input CompanyInput {
  display_name: String!
}

input LocationInput {
  display_name: String!
}



  input CommentInput {
    commentText: String!
    commentAuthor: String!
    parentType: String!
    parentId: ID!
  }
  
  type Auth {
    token: ID!
    user: User
  }

  type Query {
    users: [User]
    user(username: String!): User
    thoughts: [Thought]!
    thought(thoughtId: ID!): Thought
    jobs: [Job]!
    job(jobId: ID!): Job
    me: User
  }

  type Mutation {
    addUser(input: UserInput!): Auth
    login(email: String!, password: String!): Auth
    addThought(input: ThoughtInput!): Thought
    addComment(input: CommentInput!): Comment
    removeThought(thoughtId: ID!): Thought
    removeComment(commentId: ID!): Thought
    saveJob(input: JobInput!): User
    removeJob(jobId: String!): User
  }
`;
export default typeDefs;
