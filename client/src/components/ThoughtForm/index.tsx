import { useState, type FormEvent, type ChangeEvent } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { ADD_THOUGHT } from '../../utils/mutations';
import { QUERY_THOUGHTS, QUERY_ME } from '../../utils/queries';
import Auth from '../../utils/auth';

const ThoughtForm = () => {
  const [thoughtText, setThoughtText] = useState('');
  const [characterCount, setCharacterCount] = useState(0);
  const [addThought, { error }] = useMutation(ADD_THOUGHT, {
    refetchQueries: [QUERY_THOUGHTS, 'getThoughts', QUERY_ME, 'me'],
  });

  const handleFormSubmit = async (event: FormEvent) => {
    event.preventDefault();
    try {
      await addThought({
        variables: {
          input: {
            thoughtText,
            thoughtAuthor: Auth.getProfile().data.username,
          },
        },
      });
      setThoughtText('');
      setCharacterCount(0);
    } catch (err) {
      console.error(err);
    }
  };

  const handleChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    if (name === 'thoughtText' && value.length <= 280) {
      setThoughtText(value);
      setCharacterCount(value.length);
    }
  };

  return (
    <div className="card card-rounded w-100 mb-4">
      <h3 className="card-header bg-primary text-white p-3">
        What’s on your career mind?
      </h3>
      <div className="card-body p-4">
        {Auth.loggedIn() ? (
          <>
            <p
              className={`m-0 mb-2 ${
                characterCount === 280 || error ? 'text-danger' : 'text-dark'
              }`}
            >
              Character Count: {characterCount}/280
            </p>
            <form
              className="flex-column justify-center align-center"
              onSubmit={handleFormSubmit}
            >
              <div className="form-group w-100">
                <textarea
                  name="thoughtText"
                  placeholder="Share a new thought..."
                  value={thoughtText}
                  className="form-input w-100 mb-3"
                  onChange={handleChange}
                  style={{ minHeight: '100px', resize: 'vertical' }}
                ></textarea>
              </div>
              <button
                className="btn btn-primary btn-block btn-lg"
                type="submit"
                disabled={!thoughtText.trim()} // Disable if empty
              >
                Add Thought
              </button>
              {error && (
                <div className="my-3 p-3 bg-danger text-white text-center rounded">
                  {error.message}
                </div>
              )}
            </form>
          </>
        ) : (
          <p className="text-dark">
            You need to be logged in to share your thoughts or save jobs. Please{' '}
            <Link className="text-link" to="/login">
              login
            </Link>{' '}
            or{' '}
            <Link className="text-link" to="/signup">
              sign up
            </Link>.
          </p>
        )}
      </div>
    </div>
  );
};

export default ThoughtForm;