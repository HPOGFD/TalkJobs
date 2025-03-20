import React from 'react';

// Define the job type
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

interface JobCardProps {
  job: AdzunaJob;
}

const JobCard: React.FC<JobCardProps> = ({ job }) => {
  return (
    <div className="card h-100">
      <div className="card-body">
        <h5 className="card-title">{job.title}</h5>
        <p className="card-text">
          <strong>Company:</strong> {job.company.display_name}<br />
          <strong>Location:</strong> {job.location.display_name}<br />
          <small>Posted: {new Date(job.created).toLocaleDateString()}</small>
        </p>
        <p className="card-text">{job.description.substring(0, 150)}...</p>
        <a 
          href={job.redirect_url} 
          target="_blank" 
          rel="noopener noreferrer"
          className="btn btn-primary"
        >
          View Job
        </a>
      </div>
    </div>
  );
};

export default JobCard;