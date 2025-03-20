import { Link } from 'react-router-dom';
import { useState, type MouseEvent } from 'react';
import Auth from '../../utils/auth';

const Header = () => {
  const [/* unused state */] = useState('');

  const logout = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    Auth.logout();
  };

  return (
    <header className="header bg-primary text-light">
      <div className="container flex-row justify-space-between-lg justify-center align-center py-3">
        {/* Logo Section */}
        <div className="logo-section">
          <Link className="text-light" to="/">
            <h1 className="m-0 text-white">CareerLink</h1>
          </Link>
          <p className="m-0 text-light subtitle">Find tech jobs and share your thoughts about them.</p>
        </div>

        {/* Navigation Section */}
        <nav className="nav flex-row align-center">
          <Link className="btn btn-info mx-2" to="/job-results">
            Search For Jobs
          </Link>

          {Auth.loggedIn() ? (
            <>
              <Link className="btn btn-info mx-2" to="/saved-jobs">
                Saved Jobs
              </Link>
              <Link className="btn btn-info mx-2" to="/me">
                {Auth.getProfile().data.username}'s Profile
              </Link>
              <button className="btn btn-danger mx-2" onClick={logout}>
                Logout
              </button>
            </>
          ) : (
            <>
              <Link className="btn btn-info mx-2" to="/login">
                Login
              </Link>
              <Link className="btn btn-light mx-2" to="/signup">
                Signup
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;