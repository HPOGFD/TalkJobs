import { Link } from 'react-router-dom';

interface Thought {
  _id: string;
  thoughtAuthor: string;
  createdAt: string;
  thoughtText: string;
}

interface ThoughtListProps {
  thoughts: Thought[];
  title: string;
}

const ThoughtList: React.FC<ThoughtListProps> = ({ thoughts, title }) => {
  if (!thoughts.length) {
    return <h3 className="text-dark">No Thoughts Yet</h3>;
  }

  return (
    <div className="w-100">
      <h3 className="mb-4 text-primary">{title}</h3>
      {thoughts.map((thought) => (
        <div key={thought._id} className="card card-rounded mb-4">
          <h4 className="card-header bg-primary text-white p-3">
            {thought.thoughtAuthor}
            <span className="block text-sm opacity-75 mt-1">
              {new Date(Number(thought.createdAt)).toLocaleString()}
            </span>
          </h4>
          <div className="card-body bg-light p-4">
            <p className="text-dark mb-0">{thought.thoughtText}</p>
          </div>
          <Link
            className="btn btn-primary btn-block btn-lg"
            to={`/thoughts/${thought._id}`}
          >
            Join the Discussion
          </Link>
        </div>
      ))}
    </div>
  );
};

export default ThoughtList;