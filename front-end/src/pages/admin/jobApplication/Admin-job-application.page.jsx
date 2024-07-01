import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

const AdminJobApplicationPage = () => {
  const [jobApplication, setJobApplication] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const { applicationId } = useParams();

  useEffect(() => {
    if (!applicationId) {
      return;
    }

    const fetchApplication = async () => {
      const token = await window.Clerk.session.getToken();

      const res = await fetch(
        `http://localhost:5000/jobApplications/${applicationId}`,
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
        setJobApplication(data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
      });
  }, [applicationId]);

  if (isLoading) {
    return <div>Loading..</div>;
  }

  return (
    <div className="flex flex-col gap-y-4">
      <Card className="bg-foreground">
        <CardHeader className="flex-row items-center gap-x-4">
          <CardTitle>{jobApplication?.fullName}</CardTitle>
          <Badge
            className={cn({
              "bg-red-500":
                jobApplication?.rating?.toLocaleLowerCase() === "bad",
              "bg-orange-400":
                jobApplication?.rating?.toLocaleLowerCase() === "moderate",
              "bg-teal-500":
                jobApplication?.rating?.toLocaleLowerCase() === "good",
            })}
          >
            {jobApplication?.rating}
          </Badge>
        </CardHeader>
      </Card>

      <Card className="p-4">
        {jobApplication?.answers.map((answer, index) => {
          return (
            <p key={index}>
              {index + 1}. {answer}
            </p>
          );
        })}
      </Card>
      <div>
        <Button variant="link" asChild>
        <Link to={"/admin/jobs"}>Back</Link>
        </Button>
      </div>
    </div>
  );
};

export default AdminJobApplicationPage;
