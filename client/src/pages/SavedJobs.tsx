import React from 'react';
import { useQuery } from '@apollo/client';
import JobCard from '../components/JobCard';
import { QUERY_ME } from '../utils/queries';

interface AdzunaJob {
  _id?: string;
  id?: string;
  title: string;
  company?: { display_name?: string };
  location?: { display_name?: string };
  description?: string;
  created: string;
  redirect_url: string;
}

const SavedJobs: React.FC = () => {
  const { loading, error, data } = useQuery(QUERY_ME);

  console.log('Raw data from QUERY_ME:', JSON.stringify(data, null, 2));
  console.log('Saved jobs from QUERY_ME:', JSON.stringify(data?.me?.savedJobs, null, 2));

  if (loading) return <div>Loading saved jobs...</div>;
  if (error) return <div>Error loading saved jobs: {error.message}</div>;

  const savedJobs: AdzunaJob[] = data?.me?.savedJobs || [];
  console.log('Processed saved jobs:', JSON.stringify(savedJobs, null, 2));

  return (
    <div className="container">
      <h2>Saved Jobs</h2>
      {savedJobs.length === 0 ? (
        <p>No saved jobs yet.</p>
      ) : (
        <div className="row">
          {savedJobs.map((job: AdzunaJob) => {
            const companyName = job.company?.display_name || 'Unknown Company';
            const locationName = job.location?.display_name || 'Unknown Location';
            const jobKey = job._id || job.id || 'unknown-job';

            console.log(`Processing job ${jobKey}:`, JSON.stringify({
              title: job.title,
              company: companyName,
              location: locationName,
              created: job.created,
              redirect_url: job.redirect_url,
            }, null, 2));

            return (
              <div key={jobKey} className="col-md-4 mb-3">
                <JobCard
                  job={{
                    ...job,
                    company: { display_name: companyName },
                    location: { display_name: locationName },
                  }}
                  buttonText="Delete" // Change to Delete for SavedJobs
                />
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default SavedJobs;