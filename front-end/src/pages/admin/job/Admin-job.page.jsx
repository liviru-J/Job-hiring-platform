import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import JobApplicationCard from "./components/JobApplicationCard";
import { Briefcase, MapPin } from "lucide-react";

const AdminJobPage = () => {
  const [job, setJob] = useState(null);
  const [applications, setApplications] = useState([]);
  const { id } = useParams();
  const [isJobLoading, setIsJobLoading] = useState(true);
  const [isApplicationLoading, setIsApplicationLoading] = useState(true);

  useEffect(() => {
    if (!id) {
      return;
    }

    const fetchJob = async () => {
      const token = await window.Clerk.session.getToken();

      const res = await fetch(`http://localhost:5000/jobs/${id}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const jobData = await res.json();
      return jobData;
    };
    fetchJob()
      .then((data) => {
        setJob(data);
        setIsJobLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setIsJobLoading(false);
      });

    const fetchApplication = async () => {
      const token = await window.Clerk.session.getToken();

      const res = await fetch(
        `http://localhost:5000/jobApplications?jobId=${id}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const applicationData = await res.json();
      return applicationData;
    };
    fetchApplication()
      .then((data) => {
        setApplications(data);
        setIsApplicationLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setIsApplicationLoading(false);
      });
  }, [id]);

  if (isJobLoading || isApplicationLoading) {
    return <div>Loading..</div>;
  }

  return (
    <div>
      <div>
        <h2>{job?.title}</h2>
        <div className="flex items-center gap-x-4 mt-4">
          <div className="flex items-center gap-x-2">
            <Briefcase />
            <span>{job?.type}</span>
          </div>
          <div className="flex items-center gap-x-2">
            <MapPin />
            <span>{job?.location}</span>
          </div>
        </div>
      </div>
      <div className="mt-4 py-4">
        <p>{job?.description}</p>
      </div>
      <hr
        style={{
          border: "none",
          height: "1px",
          backgroundColor: "rgba(128, 128, 128, 0.3)",
          margin: "1px 0",
        }}
      />
      <div className="py-4">
        <h2>Job Applications</h2>
        <div className="mt-4 flex flex-col gap-y-4">
          {applications.map((application) => (
          <JobApplicationCard
            key={application._id}
            fullName={application.fullName}
            _id={application._id}
            jobId={id}
          />
        ))}
        </div>
      </div>
    </div>
  );
};

export default AdminJobPage;
