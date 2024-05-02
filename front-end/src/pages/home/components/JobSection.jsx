import React from "react";
import JobCard from "@/components/shared/JobCard";

const JobSection = () => {
  const jobs = [
    {
      id: "xyz",
      title: "Software Engineering Intern",
      type: "Full-time",
      location: "Colombo, SriLanka",
    },
    {
      id: "abc",
      title: "Software Engineer",
      type: "Remote",
      location: "Hikkaduwa, SriLanka",
    },
    {
        id: "jdf",
        title: "Software Architect",
        type: "Hybrid",
        location: "Rajagiriya, SriLanka",
      },    
  ];
  return (
    <section className="py-8">
      <h2>Available Jobs</h2>
      <div className="mt-4 flex flex-col gap-y-8">
        {jobs.map((job) => {
          return (
            <JobCard
              key={job.id}
              _id={job.id}
              title={job.title}
              type={job.type}
              location={job.location}
            />
          );
        })}
      </div>
    </section>
  );
};

export default JobSection;
