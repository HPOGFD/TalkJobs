import { useState, type FormEvent, type ChangeEvent } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { ADD_USER } from '../utils/mutations';
import Auth from '../utils/auth';
import AdzunaJobSearch from '../components/SearchForm';

const Signup = () => {
  const [formState, setFormState] = useState({
    username: '',
    email: '',
    password: '',
  });
  const [addUser, { error, data }] = useMutation(ADD_USER);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const handleFormSubmit = async (event: FormEvent) => {
    event.preventDefault();
    try {
      const { data } = await addUser({
        variables: { input: { ...formState } },
      });
      Auth.login(data.addUser.token);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <main className="min-100-vh flex-row justify-center align-center bg-light">
      <div className="col-12 col-md-8 col-lg-6">
        
        <div className="card card-rounded">
          <h4 className="card-header bg-primary text-white p-3 text-center">
            Sign Up for CareerLink
          </h4>
          <div className="card-body p-4">
            {data ? (
              <p className="text-center text-dark">
                Success! You may now head{' '}
                <Link className="text-link" to="/">
                  back to the homepage
                </Link>.
              </p>
            ) : (
              <><form onSubmit={handleFormSubmit} className="flex-column">
                  <div className="form-group">
                    <label className="form-label" htmlFor="username">
                      Username
                    </label>
                    <input
                      className="form-input w-100 mb-3"
                      placeholder="Your username"
                      name="username"
                      type="text"
                      id="username"
                      value={formState.username}
                      onChange={handleChange} />
                  </div>
                  <div className="form-group">
                    <label className="form-label" htmlFor="email">
                      Email
                    </label>
                    <input
                      className="form-input w-100 mb-3"
                      placeholder="Your email"
                      name="email"
                      type="email"
                      id="email"
                      value={formState.email}
                      onChange={handleChange} />
                  </div>
                  <div className="form-group">
                    <label className="form-label" htmlFor="password">
                      Password
                    </label>
                    <input
                      className="form-input w-100 mb-3"
                      placeholder="******"
                      name="password"
                      type="password"
                      id="password"
                      value={formState.password}
                      onChange={handleChange} />
                  </div>
                  <button
                    className="btn btn-primary btn-block btn-lg"
                    type="submit"
                  >
                    Sign Up
                  </button>
                </form><AdzunaJobSearch /></>
            )}

            {error && (
              <div className="my-3 p-3 bg-danger text-white text-center rounded">
                {error.message}
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
};

export default Signup;