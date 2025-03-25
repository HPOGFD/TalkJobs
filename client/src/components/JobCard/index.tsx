import React from 'react';
import { useMutation } from '@apollo/client';
import { SAVE_JOB, QUERY_ME } from '../../utils/queries';

// More precise type definitions
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
  const [saveJob, { error }] = useMutation(SAVE_JOB, {
    update(cache, { data: { saveJob } }) {
      try {
        const existingMe = cache.readQuery<{ me: any }>({ query: QUERY_ME });
        
        if (existingMe?.me) {
          cache.writeQuery({
            query: QUERY_ME,
            data: {
              me: {
                ...existingMe.me,
                savedJobs: saveJob.savedJobs,
              },
            },
          });
        }
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
      console.log('Saving job:', job);
      
      // Ensure all required fields are present
      const saveJobInput = {
        title: job.title || 'Untitled Job',
        company: { 
          display_name: job.company?.display_name || 'Unknown Company' 
        },
        location: { 
          display_name: job.location?.display_name || 'Unknown Location' 
        },
        created: job.created || new Date().toISOString(),
        redirect_url: job.redirect_url || '#',
      };

      await saveJob({
        variables: {
          input: saveJobInput,
        },
      });
      
      alert('Job saved successfully!');
    } catch (err) {
      console.error('Error saving job:', err);
      alert('Failed to save job');
    }
  };

  // Derive safe values with fallbacks
  const companyName = job.company?.display_name || 'Unknown Company';
  const locationName = job.location?.display_name || 'Unknown Location';
  const postedDate = job.created 
    ? new Date(job.created).toLocaleDateString() 
    : 'Date Unknown';

  return (
    <div className="card h-100">
      <div className="card-body">
        <h5 className="card-title">{job.title || 'Untitled Job'}</h5>
        <p className="card-text">
          <strong>Company:</strong> {companyName}<br />
          <strong>Location:</strong> {locationName}<br />
          <small>Posted: {postedDate}</small>
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
          >
            Save Job
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