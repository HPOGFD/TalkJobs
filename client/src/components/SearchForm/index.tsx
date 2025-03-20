import { useState, type FormEvent, type ChangeEvent } from 'react';
import { useNavigate } from 'react-router-dom';

interface AdzunaJob {
  id: string;
  title: string;
  company: {
    display_name: string;
  };
  location: {
    display_name: string;
  };
  description: string;
  created: string;
  redirect_url: string;
}

interface AdzunaSearchProps {
  onResultsFound?: (jobs: AdzunaJob[]) => void;
}

const AdzunaJobSearch: React.FC<AdzunaSearchProps> = ({ onResultsFound }) => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const APP_ID = '56112127';
      const APP_KEY = 'bbf7e0333fc224241d011f5dc83a4616';
      let apiUrl = `https://api.adzuna.com/v1/api/jobs/us/search/1?app_id=${APP_ID}&app_key=${APP_KEY}&results_per_page=10`;

      if (searchTerm) {
        apiUrl += `&what=${encodeURIComponent(searchTerm)}`;
      }

      const response = await fetch(apiUrl);

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }

      const data = await response.json();

      if (onResultsFound) {
        onResultsFound(data.results);
      } else {
        navigate('/job-results', { state: { jobs: data.results } });
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unexpected error occurred');
      console.error('Job search error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="card card-rounded w-100 mb-4">
      <h2 className="card-header bg-primary text-white p-3 text-center">
        Find Tech Jobs
      </h2>
      <div className="card-body p-4 bg-light">
        <form onSubmit={handleSubmit} className="flex-column align-center">
          <div className="form-group w-100 mb-3">
            <label htmlFor="searchTerm" className="form-label">
              Job Title or Keywords
            </label>
            <input
              type="text"
              className="form-input w-100"
              id="searchTerm"
              placeholder="e.g. React Developer, Software Engineer"
              value={searchTerm}
              onChange={(e: ChangeEvent<HTMLInputElement>) => setSearchTerm(e.target.value)}
            />
          </div>
          <button
            type="submit"
            className="btn btn-primary btn-lg"
            disabled={isLoading || !searchTerm.trim()}
          >
            {isLoading ? 'Searching...' : 'Search Jobs'}
          </button>
        </form>

        {error && (
          <div className="my-3 p-3 bg-danger text-white text-center rounded">
            {error}
          </div>
        )}

        <p className="text-center text-dark small mt-3 mb-0">
          Powered by Adzuna API
        </p>
      </div>
    </div>
  );
};

export default AdzunaJobSearch;