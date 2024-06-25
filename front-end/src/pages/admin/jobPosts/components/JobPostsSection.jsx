import JobCard from "@/components/shared/JobCard";
import React, { useEffect, useState } from "react";

const JobPostsSection = () => {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    const fetchJobs = async () => {
      const res = await fetch("http://localhost:5000/jobs", {
        method: "GET",
      });
      const data = await res.json();
      return data;
    };
    fetchJobs().then((data) => setJobs(data));
  }, []);

  return (
    <section className="py-8">
      <h2>Current Job Postings</h2>
      <div className="mt-4 flex flex-col gap-y-8">
        {jobs.map((job) => {
          return (
            <JobCard
              key={job._id}
              _id={job._id}
              title={job.title}
              type={job.type}
              location={job.location}
              isAdmin={true}
            />
          );
        })}
      </div>
    </section>
  );
};

export default JobPostsSection;
