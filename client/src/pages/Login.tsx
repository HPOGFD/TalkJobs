import { useState, type FormEvent, type ChangeEvent } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { LOGIN_USER } from '../utils/mutations';
import Auth from '../utils/auth';
import AdzunaJobSearch from '../components/SearchForm';

const Login = () => {
  const [formState, setFormState] = useState({ email: '', password: '' });
  const [login, { error, data }] = useMutation(LOGIN_USER);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const handleFormSubmit = async (event: FormEvent) => {
    event.preventDefault();
    console.log(formState);
    try {
      const { data } = await login({
        variables: { ...formState },
      });
      Auth.login(data.login.token);
    } catch (e) {
      console.error(e);
    }
    setFormState({
      email: '',
      password: '',
    });
  };

  return (
    <main className="min-100-vh flex-row justify-center align-center bg-light">
      <div className="col-12 col-md-8 col-lg-6">
        <div className="card card-rounded">
          <h4 className="card-header bg-primary text-white p-3 text-center">
            Login to CareerLink
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
                    <input
                      className="form-input w-100 mb-3"
                      placeholder="Your email"
                      name="email"
                      type="email"
                      value={formState.email}
                      onChange={handleChange} />
                  </div>
                  <div className="form-group">
                    <input
                      className="form-input w-100 mb-3"
                      placeholder="Password"
                      name="password"
                      type="password"
                      value={formState.password}
                      onChange={handleChange} />
                  </div>
                  <button
                    className="btn btn-primary btn-block btn-lg"
                    type="submit"
                  >
                    Login
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

export default Login;