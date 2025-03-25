import { Thought, User, Job } from '../models/index.js'; // Added Job import
import { signToken, AuthenticationError } from '../utils/auth.js';

// Define types for the arguments
interface AddUserArgs {
  input: {
    username: string;
    email: string;
    password: string;
  };
}

interface LoginUserArgs {
  email: string;
  password: string;
}

interface UserArgs {
  username: string;
}

interface ThoughtArgs {
  thoughtId: string;
}

interface AddThoughtArgs {
  input: {
    thoughtText: string;
    thoughtAuthor: string;
  };
}

interface AddCommentArgs {
  thoughtId: string;
  commentText: string;
}

interface RemoveCommentArgs {
  thoughtId: string;
  commentId: string;
}

const resolvers = {
  Query: {
    users: async () => {
      return User.find().populate('thoughts');
    },
    user: async (_parent: any, { username }: UserArgs) => {
      return User.findOne({ username }).populate('thoughts');
    },
    thoughts: async () => {
      return await Thought.find().sort({ createdAt: -1 });
    },
    thought: async (_parent: any, { thoughtId }: ThoughtArgs) => {
      return await Thought.findOne({ _id: thoughtId });
    },
    me: async (_parent: any, _args: any, context: { user?: any }) => {
      if (context.user) {
        return User.findOne({ _id: context.user._id }).populate('thoughts');
      }
      throw new AuthenticationError('Could not authenticate user.');
    },
  },
  Mutation: {
    saveJob: async (_: any, { input }: { input: any }, context: { user?: any }) => {
      if (!context.user) {
        throw new AuthenticationError('You need to be logged in to save jobs!');
      }
    
      try {
        // Check if the job exists by Adzuna ID, or create it
        let job = await Job.findOne({ id: input.id });
        if (!job) {
          job = await Job.create({
            id: input.id,
            title: input.title,
            company: input.company,
            location: input.location,
            description: input.description,
            created: input.created,
            redirect_url: input.redirect_url,
          });
        }
    
        const updatedUser = await User.findByIdAndUpdate(
          context.user._id,
          { $addToSet: { savedJobs: job._id } }, // Use MongoDB _id
          { new: true, runValidators: true }
        ).populate({
          path: 'savedJobs',
          select: 'id title company location created redirect_url description',
        });
    
        if (!updatedUser) {
          throw new Error('User not found');
        }
    
        return updatedUser;
      } catch (error) {
        console.error('Error saving job:', error);
        throw new Error(`Failed to save job: ${(error as Error).message}`);
      }
    },
    addUser: async (_parent: any, { input }: AddUserArgs) => {
      const user = await User.create({ ...input });
      const token = signToken(user.username, user.email, user._id);
      return { token, user };
    },
    login: async (_parent: any, { email, password }: LoginUserArgs) => {
      const user = await User.findOne({ email });
      if (!user) {
        throw new AuthenticationError('Invalid email or password.');
      }

      const correctPw = await user.isCorrectPassword(password);
      if (!correctPw) {
        throw new AuthenticationError('Invalid email or password.');
      }

      const token = signToken(user.username, user.email, user._id);
      return { token, user };
    },
    addThought: async (_parent: any, { input }: AddThoughtArgs, context: { user?: any }) => {
      if (!context.user) {
        throw new AuthenticationError('You need to be logged in!');
      }

      const thought = await Thought.create({ ...input });
      await User.findOneAndUpdate(
        { _id: context.user._id },
        { $addToSet: { thoughts: thought._id } },
        { new: true }
      );

      return thought;
    },
    addComment: async (
      _parent: any,
      { thoughtId, commentText }: AddCommentArgs,
      context: { user?: any }
    ) => {
      if (!context.user) {
        throw new AuthenticationError('You need to be logged in!');
      }

      return Thought.findOneAndUpdate(
        { _id: thoughtId },
        {
          $addToSet: {
            comments: { commentText, commentAuthor: context.user.username },
          },
        },
        {
          new: true,
          runValidators: true,
        }
      );
    },
    removeThought: async (
      _parent: any,
      { thoughtId }: ThoughtArgs,
      context: { user?: any }
    ) => {
      if (!context.user) {
        throw new AuthenticationError('You need to be logged in!');
      }

      const thought = await Thought.findOneAndDelete({
        _id: thoughtId,
        thoughtAuthor: context.user.username,
      });

      if (!thought) {
        throw new Error('Thought not found or you are not authorized to delete it.');
      }

      await User.findOneAndUpdate(
        { _id: context.user._id },
        { $pull: { thoughts: thought._id } },
        { new: true }
      );

      return thought;
    },
    removeComment: async (
      _parent: any,
      { thoughtId, commentId }: RemoveCommentArgs,
      context: { user?: any }
    ) => {
      if (!context.user) {
        throw new AuthenticationError('You need to be logged in!');
      }

      const thought = await Thought.findOneAndUpdate(
        { _id: thoughtId },
        {
          $pull: {
            comments: {
              _id: commentId,
              commentAuthor: context.user.username,
            },
          },
        },
        { new: true }
      );

      if (!thought) {
        throw new Error('Thought not found or you are not authorized to remove this comment.');
      }

      return thought;
    },
  },
};

export default resolvers;