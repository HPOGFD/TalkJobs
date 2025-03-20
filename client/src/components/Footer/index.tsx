import { useLocation, useNavigate } from 'react-router-dom';

const Footer: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleGoBack = () => {
    if (window.history.length > 1) {
      navigate(-1);
    } else {
      navigate('/');
    }
  };

  return (
    <footer className="w-100 mt-auto bg-primary text-white p-4">
      <div className="container flex-column align-center text-center">
        {location.pathname !== '/' && (
          <button
            className="btn btn-light btn-sm mb-4"
            onClick={handleGoBack}
          >
            ← Go Back
          </button>
        )}
        <div>
          <p className="text-white mb-1">
            Final Project Authors: Harry, Ali, Dan
          </p>
          <p className="text-white small opacity-75 mb-0">
            © {new Date().getFullYear()} CareerLink. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;