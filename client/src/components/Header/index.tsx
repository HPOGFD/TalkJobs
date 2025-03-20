import { Link } from 'react-router-dom'; 
import { useState, type MouseEvent } from 'react'; 
import Auth from '../../utils/auth';

const Header = () => {
  const [] = useState('');
  
  const logout = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    Auth.logout();
  };
  
  
  return (
    <header className="bg-primary text-light py-3">
      <div className="container flex-row justify-space-between-lg justify-center align-center">
        <div>
          <Link className="text-light" to="/">
            <h1 className="m-0">CareerLink</h1>
          </Link>
          <p className="m-0">Find tech jobs and share your thoughts about them.</p>
        </div>
        <Link className="btn btn-info m-2" to="/job-results">
                Search For Jobs
              </Link>
       
        
        <nav className="flex-row">
        
          
          {Auth.loggedIn() ? (
            <>
            <Link className="btn btn-info m-2" to="/saved-jobs">
                Saved Jobs
              </Link>
              <Link className="btn btn-info m-2" to="/me">
                {Auth.getProfile().data.username}'s profile
              </Link>
              
              <button className="btn btn-light m-2" onClick={logout}>
                Logout
              </button>
             
            </>
          ) : (
            <>
            
           
              <Link className="btn btn-info m-2" to="/login">
                Login
              </Link>
              <Link className="btn btn-light m-2" to="/signup">
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