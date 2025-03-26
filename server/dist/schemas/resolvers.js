import { Thought, User, Job } from '../models/index.js'; // Added Job import
import { signToken, AuthenticationError } from '../utils/auth.js';
const resolvers = {
    Query: {
        users: async () => {
            return User.find().populate('thoughts');
        },
        user: async (_parent, { username }) => {
            return User.findOne({ username }).populate('thoughts');
        },
        thoughts: async () => {
            return await Thought.find().sort({ createdAt: -1 });
        },
        thought: async (_parent, { thoughtId }) => {
            return await Thought.findOne({ _id: thoughtId });
        },
        me: async (_, __, context) => {
            if (!context.user) {
                throw new AuthenticationError('You need to be logged in!');
            }
            // Retrieve the user and populate their saved jobs
            const user = await User.findById(context.user._id)
                .populate({
                path: 'savedJobs',
                select: 'title company location created redirect_url', // Only include necessary fields
            });
            return user;
        },
    },
    Mutation: {
        saveJob: async (_, { input }, context) => {
            if (!context.user) {
                throw new AuthenticationError('You need to be logged in to save jobs!');
            }
            // Create the job
            const job = await Job.create({
                title: input.title,
                company: input.company,
                location: input.location,
                created: input.created || new Date().toISOString(),
                redirect_url: input.redirect_url
            });
            // Update the user by adding the job to savedJobs
            const updatedUser = await User.findByIdAndUpdate(context.user._id, { $addToSet: { savedJobs: job._id } }, { new: true }).populate('savedJobs');
            return updatedUser; // Returns the entire user with populated savedJobs
        },
        addUser: async (_parent, { input }) => {
            const user = await User.create({ ...input });
            const token = signToken(user.username, user.email, user._id);
            return { token, user };
        },
        login: async (_parent, { email, password }) => {
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
        addThought: async (_parent, { input }, context) => {
            if (!context.user) {
                throw new AuthenticationError('You need to be logged in!');
            }
            const thought = await Thought.create({ ...input });
            await User.findOneAndUpdate({ _id: context.user._id }, { $addToSet: { thoughts: thought._id } }, { new: true });
            return thought;
        },
        addComment: async (_parent, { thoughtId, commentText }, context) => {
            if (!context.user) {
                throw new AuthenticationError('You need to be logged in!');
            }
            return Thought.findOneAndUpdate({ _id: thoughtId }, {
                $addToSet: {
                    comments: { commentText, commentAuthor: context.user.username },
                },
            }, {
                new: true,
                runValidators: true,
            });
        },
        removeThought: async (_parent, { thoughtId }, context) => {
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
            await User.findOneAndUpdate({ _id: context.user._id }, { $pull: { thoughts: thought._id } }, { new: true });
            return thought;
        },
        removeComment: async (_parent, { thoughtId, commentId }, context) => {
            if (!context.user) {
                throw new AuthenticationError('You need to be logged in!');
            }
            const thought = await Thought.findOneAndUpdate({ _id: thoughtId }, {
                $pull: {
                    comments: {
                        _id: commentId,
                        commentAuthor: context.user.username,
                    },
                },
            }, { new: true });
            if (!thought) {
                throw new Error('Thought not found or you are not authorized to remove this comment.');
            }
            return thought;
        },
    },
};
export default resolvers;
