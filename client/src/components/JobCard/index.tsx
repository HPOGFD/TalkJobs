import React from 'react';
import { useMutation } from '@apollo/client';
import { SAVE_JOB, QUERY_ME } from '../../utils/queries';

// Type definitions remain the same
interface Company {
  display_name: string;
}

interface Location {
  display_name: string;
}

interface AdzunaJob {
  _id?: string;
  id?: string;
  title: string;
  company: Company | null;
  location: Location | null;
  description?: string;
  created: string;
  redirect_url: string;
}

interface JobCardProps {
  job: AdzunaJob;
}

const JobCard: React.FC<JobCardProps> = ({ job }) => {
  const [saveJob, { error, loading }] = useMutation(SAVE_JOB, {
    update(cache, { data }) {
      try {
        // Update the cache with the new saved jobs
        cache.modify({
          fields: {
            me() {
              // Assumes saveJob returns the updated user
              return data?.saveJob;
            }
          }
        });
      } catch (cacheError) {
        console.error('Cache update error:', cacheError);
      }
    },
    onError: (err) => {
      console.error('Mutation error:', err);
    },
    refetchQueries: [{ query: QUERY_ME }],
  });

  const handleSave = async () => {
    try {
      if (!job.title) {
        alert('Job title is required');
        return;
      }
  
      const saveJobInput = {
        title: job.title,
        company: { display_name: typeof job.company === "string" ? job.company : job.company?.display_name || "Unknown Company" },
        location: { display_name: typeof job.location === "string" ? job.location : job.location?.display_name || "Unknown Location" },
        created: job.created || new Date().toISOString(),
        redirect_url: job.redirect_url || "#",
      };
  
      console.log("Sending saveJobInput:", saveJobInput);
  
      const { data } = await saveJob({
        variables: {
          input: saveJobInput, // Pass input, not jobId
        },
      });
  
      if (data?.saveJob) {
        alert('Job saved successfully!');
      }
    } catch (err) {
      console.error('Error saving job:', err);
      alert(`Failed to save job: ${err instanceof Error ? err.message : 'Unknown error'}`);
    }
  };
  

  return (
    <div className="card h-100">
      <div className="card-body">
        <h5 className="card-title">{job.title || 'Untitled Job'}</h5>
        <p className="card-text">
          <strong>Company:</strong> {job.company?.display_name || 'Unknown Company'}<br />
          <strong>Location:</strong> {job.location?.display_name || 'Unknown Location'}<br />
          <small>Posted: {new Date(job.created).toLocaleDateString()}</small>
        </p>
        {job.description && (
          <p className="card-text">
            {job.description.length > 150 
              ? `${job.description.substring(0, 150)}...` 
              : job.description}
          </p>
        )}
        <div>
          <a 
            href={job.redirect_url || '#'} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="btn btn-primary"
          >
            View Job
          </a>
          <button 
            onClick={handleSave} 
            className="btn btn-secondary ms-2"
            disabled={loading}
          >
            {loading ? 'Saving...' : 'Save Job'}
          </button>
          {error && (
            <p className="text-danger mt-2">
              Error: {error.message}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default JobCard;