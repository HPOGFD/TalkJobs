import { useLocation } from 'react-router-dom';
import AdzunaJobSearch from "../components/SearchForm";
import ThoughtForm from '../components/ThoughtForm';
import JobCard from '../components/JobCard'; // Import the new component

// Define the job type (you might want to move this to a types file)
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

const JobResultsPage = () => {
  const location = useLocation();
  const jobs = (location.state as { jobs: AdzunaJob[] })?.jobs || [];

  return (
    <div className="container py-4">
        <div className="mb-6">
          <ThoughtForm />
        </div>
      <h1 className="mb-4">Job Results</h1>
      
      {/* Keep the search form if you want users to search again */}
      <AdzunaJobSearch />
      
      {/* Display results */}
      {jobs.length > 0 ? (
        <div className="mt-4">
          <h3>Found {jobs.length} jobs</h3>
          <div className="row">
            {jobs.map((job) => (
              <div key={job.id} className="col-md-6 col-lg-4 mb-3">
                <JobCard job={job} />
              </div>

        //add here a button that will allow the user to save the job to the database
        
            ))}
          </div>
        </div>
      ) : (
        <div className="alert alert-info mt-4">
          No jobs found. Try a new search above.
        </div>
      )}
    </div>
  );
};

export default JobResultsPage;