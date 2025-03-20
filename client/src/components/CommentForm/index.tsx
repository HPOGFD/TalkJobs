import { useState, type FormEvent, type ChangeEvent } from 'react';
import { useMutation } from '@apollo/client';
import { ADD_COMMENT } from '../../utils/mutations';

const CommentForm = ({ thoughtId }: { thoughtId: string }) => {
  const [commentText, setCommentText] = useState('');
  const [characterCount, setCharacterCount] = useState(0);
  const [addComment, { error }] = useMutation(ADD_COMMENT);

  const handleFormSubmit = async (event: FormEvent) => {
    event.preventDefault();
    try {
      await addComment({
        variables: { thoughtId, commentText },
      });
      setCommentText('');
      setCharacterCount(0);
    } catch (err) {
      console.error(err);
    }
  };

  const handleChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    if (name === 'commentText' && value.length <= 280) {
      setCommentText(value);
      setCharacterCount(value.length);
    }
  };

  return (
    <div className="card card-rounded w-100 mb-4">
      <h4 className="card-header bg-primary text-white p-3">
        What are your thoughts on this thought?
      </h4>
      <div className="card-body p-4 bg-light">
        <p
          className={`m-0 mb-2 ${
            characterCount === 280 || error ? 'text-danger' : 'text-dark'
          }`}
        >
          Character Count: {characterCount}/280
          {error && <span className="ml-2">Something went wrong...</span>}
        </p>
        <form
          className="flex-column justify-center align-center"
          onSubmit={handleFormSubmit}
        >
          <div className="form-group w-100">
            <textarea
              name="commentText"
              placeholder="Add your comment..."
              value={commentText}
              className="form-input w-100 mb-3"
              onChange={handleChange}
              style={{ minHeight: '100px', resize: 'vertical' }}
            ></textarea>
          </div>
          <button
            className="btn btn-primary btn-block btn-lg"
            type="submit"
            disabled={!commentText.trim()}
          >
            Add Comment
          </button>
          {error && (
            <div className="my-3 p-3 bg-danger text-white text-center rounded">
              {error.message}
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default CommentForm;