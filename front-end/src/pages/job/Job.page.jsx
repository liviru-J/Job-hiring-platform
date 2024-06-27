import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Briefcase, MapPin } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useUser } from "@clerk/clerk-react";

const JobPage = () => {
  const { user, isLoaded, isSignedIn } = useUser();
  const navigate = useNavigate();
  const { id } = useParams();
  const [job, setJob] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [formData, setFormData] = useState({
    fullName: "",
    a1: "",
    a2: "",
    a3: "",
  });

  useEffect(() => {
    if (!isLoaded) {
      return;
    }
    if (!isSignedIn) {
      return navigate("/sign-in");
    }

    const fetchJob = async () => {
      const token = await window.Clerk.session.getToken();

      const res = await fetch(`http://localhost:5000/jobs/${id}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();
      return data;
    };
    fetchJob().then((data) => {
      setJob(data);
      setIsLoading(false);
    });
  }, [id, isSignedIn, isLoaded, navigate]);

  const handlesubmit = async (event) => {
    event.preventDefault();
    if (!user) return;
    if (!id) return;

    const token = await window.Clerk.session.getToken();

    await fetch("http://localhost:5000/jobApplications", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        userId: user?.id,
        fullName: formData?.fullName,
        job: id,
        answers: [formData?.a1, formData?.a2, formData?.a3],
      }),
    });

    setFormData({
      fullName: "",
      a1: "",
      a2: "",
      a3: "",
    });
  };

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  if (isLoading) {
    return (
      <div>
        <h3>Loading...</h3>
      </div>
    );
  }

  return (
    <div>
      <div>
        {job && (
          <>
            <h2>{job.title}</h2>
            <div className="flex items-center gap-x-4 mt-4">
              <div className="flex items-center gap-x-2">
                <Briefcase />
                <span>{job.type}</span>
              </div>
              <div className="flex items-center gap-x-2">
                <MapPin />
                <span>{job.location}</span>
              </div>
            </div>
          </>
        )}
      </div>
      <div className="mt-4 py-4">{job && <p>{job.description}</p>}</div>

      <hr
        style={{
          border: "none",
          height: "1px",
          backgroundColor: "rgba(128, 128, 128, 0.3)",
          margin: "1px 0",
        }}
      />

      <form className="py-8 flex flex-col gap-y-6" onSubmit={handlesubmit}>
        <div className="flex flex-col gap-y-4">
          <Label className="text-lg">Full Name</Label>
          <Input
            name={"fullName"}
            required
            value={formData.fullName}
            onChange={handleChange}
          />
        </div>

        {job.questions.map((question, i) => {
          return (
            <div key={i} className="mt-4">
              <h3>{question}</h3>
              <Textarea
                className="mt-2"
                name={`a${i + 1}`}
                required
                value={formData[`a${i + 1}`]}
                onChange={handleChange}
              />
            </div>
          );
        })}

        <div className="flex gap-x-4 items-center">
          <Button type="submit" className="w-fit">
            Submit
          </Button>
          <Button
            type="button"
            className="w-fit"
            onClick={() =>
              setFormData({
                fullName: "",
                a1: "",
                a2: "",
                a3: "",
              })
            }
            variant="outline"
          >
            Clear
          </Button>
        </div>
      </form>
    </div>
  );
};

export default JobPage;
